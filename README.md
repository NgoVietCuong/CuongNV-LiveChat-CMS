# CuongNV LiveChat App - CMS

CuongNV LiveChat App - CMS is a Content Management System (CMS) tailored for integrating live chat functionality into Shopify stores. This app enables store owners to engage with customers in real-time, enhancing their shopping experience and providing immediate support. The system is built with modern web technologies and is designed to seamlessly integrate into Shopify-based e-commerce websites.

## Features

- Shopify Integration: Seamlessly integrate the live chat system into your Shopify store.
- Real-time Chat: Engage with customers in real-time through a user-friendly chat interface directly on your Shopify store.
- Conversation Categorization: Organize chats to streamline customer support processes.
- Chat History: Access chat history for analyzing customer interactions and improving service quality.
- Online Visitor Detection: Identify and monitor online visitors, enabling proactive engagement for better customer service.
- Notification: Receive notifications for new messages and chat requests to ensure prompt responses.
- Analytics: View essential statistics related to chat usage and customer engagement to optimize your support strategy.

## Demo

https://github.com/NgoVietCuong/CuongNV-LiveChat-CMS/assets/96627324/9da456b8-72d3-4824-96b8-0118a674d374

## How to install

To get started with the CuongNV LiveChat App - CMS, follow these steps:

1. Set up the server:
  
To begin, you will need a server with an nginx configuration in order to successfully install and run the application. Configure the domain and port of the application you will run in the nginx file

```
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;

    root /var/www/your_application;  # Path to your application's root directory

    location / {
        proxy_pass http://localhost:3000;  # Forward requests to your application's backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```


2. Clone the repository:

```bash
git clone https://github.com/NgoVietCuong/CuongNV-LiveChat-CMS.git
```


3. Install the required dependencies:

```bash
npm install
```


4. Configure the environment variables:

Rename `.env.example` to `.env` and fill in the necessary environment variables down below.
```bash
# Shopify
SHOPIFY_API_KEY='<your_shopify_app_client_id>'
SHOPIFY_API_SECRET_KEY='<your_shopify_app_client_secret>'
SHOPIFY_SCOPES='<your_shopify_app_scopes>'
API_VERSION='<your_shopify_api_version>'
# App
APP_DOMAIN='<your_app_cms_domain>'
APP_PORT='<your_app_running_port>'
# Server
SERVER_URL='<your_app_api_domain>'
# JWT
JWT_SECRET_KEY='<your_key>'
JWT_EXPIRES_IN='<jwt_expires_in>'
JWT_ALGORITHM='<jwt_algorithm>'
# Public
NEXT_PUBLIC_SERVER_URL='<your_app_cms_domain>'
NEXT_PUBLIC_APP_URL='<your_app_api_domain>'
# Cloudinary
NEXT_PUBLIC_CLOUD_NAME='<your_cloudinary_cloud_name>'
NEXT_PUBLIC_UPLOAD_PRESET='<your_cloudinary_upload_preset>'
```


5. Run the application:

Intall PM2 in your server, build and run the application with PM2:
```
npm install pm2
npm run build
pm2 start npm --name '<your_process_name>' -- run start 
```


6. Access the application:

If the app is already installed, open the app in your Shopify store. If not, install it