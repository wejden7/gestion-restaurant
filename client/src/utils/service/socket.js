import socketio from "socket.io-client";
export const socket = socketio.connect(process.env.REACT_APP_BASE_URL);
