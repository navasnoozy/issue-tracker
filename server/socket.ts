import { Server } from "socket.io";

export interface MessageType {
  id: string;
  time: string;
  type:'broadcast' | 'notifi' | 'self'
  content: string | number;
  user: {
    name: string;
    avatar?: string;
  };
}

const createMessage = (name: string,type:'broadcast' | 'notifi' | 'self', content: string) => {
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedTime = date.toLocaleTimeString("en-US", options);

  const message: MessageType = {
    id: crypto.randomUUID(),
    time: formattedTime,
    type:type,
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

    socket.on(
      "createRoom",
      ({ roomname, name }: { roomname: string; name: string }) => {
        socket.join(roomname);
        const message = createMessage(name,'self', `${name} Welcome to ${roomname}`);
        socket.emit("roomJoined", { roomname, message });
      }
    );

    socket.on('disconnect',(reason)=>{
          console.log(`User ${socket.id} disconnected`);
          
          
    })
    
  });
}
