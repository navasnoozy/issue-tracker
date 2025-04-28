"use client";
import { io } from "socket.io-client";


let socket = null;

const getSocket = (isConnected = false) => {
  // Only create a new socket if one doesn't already exist
  if (!isConnected) {
    console.log("Creating new socket connection");
    socket = io();
  }

  return socket;
};

export default getSocket;