//server/server.ts file

import next from "next";
import { createServer } from "node:http";
import { setUpSocketServer } from "./socket";

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10);

const hostname = "localhost";

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {

  //creating custom http server
  const httpServer = createServer(handler);

  //Create socketIO server
  setUpSocketServer(httpServer);

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
