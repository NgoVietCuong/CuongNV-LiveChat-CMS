const axios = require('axios');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Koa = require('koa');
const next = require('next');
const koaBody = require("koa-body");
const koaSession = require('koa-session');
const koaRouter = require('koa-router');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const { default: graphQLProxy } = require("@shopify/koa-shopify-graphql-proxy");
const { default: Shopify } = require("@shopify/shopify-api");

dotenv.config();
const {
    SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET_KEY,
    SHOPIFY_SCOPES,
    API_VERSION,
    APP_PORT,
    APP_DOMAIN,
    SERVER_URL,
    JWT_SECRET_KEY,
    JWT_EXPIRES_IN,
    JWT_ALGORITHM
} = process.env;

Shopify.Context.initialize({
    API_KEY: SHOPIFY_API_KEY,
    API_SECRET_KEY: SHOPIFY_API_SECRET_KEY,
    SCOPES: SHOPIFY_SCOPES.split(","),
    HOST_NAME: APP_DOMAIN.replace(/^https:\/\//, ""),
    API_VERSION: API_VERSION,
    IS_EMBEDDED_APP: false,
    SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

const port = parseInt(APP_PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = new Koa();
    const router = new koaRouter();
    server.use(koaSession({ sameSite: "none", secure: true }, server));
    server.keys = [SHOPIFY_API_SECRET_KEY];
    server.proxy = true;

    server.use(
        createShopifyAuth({
            accessMode: 'offline',
            async afterAuth(ctx) {
                const { shop, accessToken } = ctx.state.shopify;
                const jwtSecretKey = JWT_SECRET_KEY;
                const jwtPayload = {
                    domain: shop,
                    accessToken: accessToken,
                }
                const jwtOptions = {
                    algorithm: JWT_ALGORITHM,
                    expiresIn: JWT_EXPIRES_IN
                }

                const token = jwt.sign(jwtPayload, jwtSecretKey, jwtOptions);

                ctx.cookies.set('shop', shop, { httpOnly: false, secure: true, sameSite: 'none' });
                ctx.cookies.set('accessToken', accessToken, { httpOnly: false, secure: true, sameSite: 'none' });
                ctx.cookies.set('nvcJWT', token, { httpOnly: false, secure: true, sameSite: 'none' });
                
                let shopAuthentication = false;

                try {
                    const shopRes = await axios({
                        url: `${SERVER_URL}/shops`,
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const shopData = shopRes.data;
                    
                    if (shopData && shopData.statusCode === 200) {
                        const updateRes = await axios({
                            url: `${SERVER_URL}/shops`,
                            method: 'put', 
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`
                            }
                        });
                        const updateData = updateRes.data;

                        if (updateData && updateData.statusCode === 200) {
                            shopAuthentication = true;
                            await axios({
                                url: `${SERVER_URL}/script-tags`,
                                method: 'put',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                }
                            });
                        }
                    } else {
                        const createRes = await axios({
                            url: `${SERVER_URL}/shops`, 
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`
                            }
                        });
                        const createData = createRes.data;
                        
                        if (createData && createData.statusCode === 201) {
                            shopAuthentication = true;
                            await axios({
                                url: `${SERVER_URL}/script-tags`,
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                }
                            });
                        }
                    }
                } catch (e) {
                    console.error("ERROR", "[server.js] shopifyAuth", e);
                }

                if (shopAuthentication) {
                    console.log('Shop authenticated successfully');
                    ctx.redirect('/');
                }
            }
        })
    );

    server.use(graphQLProxy({ version: API_VERSION }));

    const handleRequest = async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
    };

    router.get("(/_next/static/.*)", handleRequest);
    router.get("/_next/webpack-hmr", handleRequest);
    router.get(
        "(.*)",
        verifyRequest({ accessMode: "offline", fallbackRoute: '/login.html' }),
        handleRequest,
    );

    server.use(router.allowedMethods());
    server.use(router.routes());

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    });
});