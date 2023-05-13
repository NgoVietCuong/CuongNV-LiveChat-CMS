const fetch = require('isomorphic-fetch');
const dotenv = require('dotenv');
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
    SERVER_URL
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
                console.log(shop)
                console.log(shop, accessToken);
                ctx.cookies.set('shopOrigin', shop, {
                    httpOnly: false,
                    secure: true, 
                    sameSite: 'none' 
                });
                ctx.cookies.set('accessToken', accessToken, {
                    httpOnly: false, 
                    secure: true, 
                    sameSite: 'none' 
                });

                if (shop) {
                    try {
                        const testRes = await fetch(`${SERVER_URL}/update`, {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({domain: shop, accessToken: accessToken })
                        })
                        const testJson = await testRes.json();
                        console.log(testJson);
                    } catch (e) {
                        console.log('error frontend', e);
                    }

                    ctx.redirect("/chats");
                } else {
                    console.log("Could not authenticate app");
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