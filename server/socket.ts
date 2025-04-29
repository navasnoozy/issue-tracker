//server/socket.ts
import { Server } from "socket.io";
import { Session } from "next-auth";
import getFormatedTime from "@/app/utils/getFormatTime";

export interface MessageType {
  id: string;
  time: string;
  type: "broadcast" | "notifi" | "self";
  content: string | number;
  user: {
    name: string;
    avatar?: string;
  };
};

interface Data{
  roomname:string,
  messageText?:string | number;
  name?: string
  session?: Session
}

const createMessage = (
  name: string,
  type: "broadcast" | "notifi" | "self",
  content: string
) => {
     const time = Date.now()
    const formattedTime = getFormatedTime(time)
  const message: MessageType = {
    id: crypto.randomUUID(),
    time: formattedTime,
    type: type,
    content: content,
    user: {
      name: name,
    },
  };
  return message;
};

export function setUpSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connect", (socket) => {
    console.log(`User ${socket.id} connection established`);

    //ROOM CREATION
    socket.on(
      "createRoom",
      ({ roomname, name ='UnknownUser' }: Data) => {
        socket.join(roomname);

        //Welcome message to the sender
        const welcomeMessage = createMessage(
          name,
          "notifi",
          `${name}! Welcome to ${roomname}`
        );
        socket.emit("roomMessage", welcomeMessage);

        //notification to other user
        const notifi = createMessage(name, "notifi", `${name} has joined`);
        socket.to(roomname).emit("roomMessage", notifi);
      }
    );

    //SENDING MESSAGES
      socket.on('message', ({roomname,messageText,session}:Data)=>{
         const message = createMessage (session?.user?.name)
      })

    socket.on("disconnect", (reason) => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
}
