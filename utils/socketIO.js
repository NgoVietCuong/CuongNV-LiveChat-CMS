import io from 'socket.io-client';

let socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}/frontend`, { autoConnect: false });

export default socket;