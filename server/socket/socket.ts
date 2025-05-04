import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { handleConnection } from "./handlers/connectionHandler";

export function setUpSocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // Handle client connections
  io.on("connect", (socket) => {
    handleConnection(socket, io);
  });
}