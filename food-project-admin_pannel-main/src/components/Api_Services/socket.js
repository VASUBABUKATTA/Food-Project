import { io } from "socket.io-client";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const socket = io( API_BASE_URL, {
    transports: ["websocket"]
});

socket.on("connect", () => {
    console.log("Connected to Socket.IO Server:", socket.id);
});

socket.on("disconnect", () => {
    console.log("Disconnected from Socket.IO Server");
});

export default socket;