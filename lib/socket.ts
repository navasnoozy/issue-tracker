//lib/socket.ts file 
"use client";

import { io,  Socket  } from "socket.io-client";


let socket: Socket | null = null;

const getSocket = (initialize = false) => {
  // Only create a new socket if one doesn't already exist
  if (initialize) {
    console.log("Creating new socket connection");
    socket = io();
  }

  return socket;
};

export default getSocket;