import { Server } from "socket.io";



export function setUpSocketServer (httpServer){
      const io = new Server(httpServer);

      io.on("connection", (socket) => {
        console.log(`User ${socket.id} connection established`);
      });
}