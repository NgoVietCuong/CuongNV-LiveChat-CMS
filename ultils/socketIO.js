import io from 'socket.io-client';

let socket = io('https://dev-cuongnv-live-chat-api.dev-bsscommerce.com/frontend', { autoConnect: false });

export default socket;
