import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10);

const hostname = "localhost";

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`User ${socket.id} connection established`);
  });

  httpServer.once("error", (err) => {
    console.error(err);
    process.exit(1);
  }).listen(port,()=>{
    console.log(`> Ready on http://${hostname}:${port}`);
    
  })
});
