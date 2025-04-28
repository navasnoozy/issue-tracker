//socket.js
"use client";
import { io } from "socket.io-client";

let socket= null
const getSocket = (isConnected = false) => {
  if (!isConnected) {
    socket = io();
  }

  return socket;
};

export default getSocket;
