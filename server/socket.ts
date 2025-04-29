import { Server } from "socket.io";
import { Session } from "next-auth";
import getFormatedTime from "@/app/utils/getFormatTime";

export interface MessageType {
  id: string;
  time: string;
  type: "broadcast" | "notifi" | "self";
  content: string | number;
  user?: {
    name?: string | null
    avatar?: string 
  };
}

interface SocketData {
  roomname: string;
  messageText?: string | number;
  session?: Session;
}

class MessageFactory {

  static create(
    session: Session,
    type: "broadcast" | "notifi" | "self",
    content: string | number
  ): MessageType {
    // Generate common message properties
    const time = Date.now();
    const formattedTime = getFormatedTime(time);
    
    // Base message structure
    const message: MessageType = {
      id: crypto.randomUUID(),
      time: formattedTime,
      type: type,
      content: content,
    };

    // Add user information based on message type
    switch (type) {
      case "broadcast":
      case "self":
        // Full user info for user messages
        message.user = {
          name: session.user?.name,
          avatar: session.user?.image || undefined,
        };
        break;
      
      case "notifi":
        // Only name for notifications (no avatar)
        message.user = {
          name: session.user?.name,
        };
        break;
    }

    return message;
  }
}


export function setUpSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // Handle client connections
  io.on("connect", (socket) => {
    console.log(`User ${socket.id} connection established`);
    
    /**
     * Room Events
     */
    socket.on("createRoom", handleRoomCreation(socket));
    
    /**
     * Message Events
     */
    socket.on("message", handleMessageSending(socket));
    
    /**
     * Connection Events
     */
    socket.on("disconnect", (reason) => {
      console.log(`User ${socket.id} disconnected: ${reason}`);
    
    });
  });
}


 // Handle room creation events

function handleRoomCreation(socket) {
  return ({ roomname, session }: SocketData) => {
    if (!roomname || !session) {
      console.error("Invalid room creation attempt: missing roomname or session");
      return;
    }

    // Join the specified room
    socket.join(roomname);
    const username = session.user?.name || "User";

    // Send welcome message to the user who joined
    const welcomeMessage = MessageFactory.create(
      session,
      "notifi",
      `${username}! Welcome to ${roomname}`
    );
    socket.emit("roomMessage", welcomeMessage);

    // Notify other users in the room
    const joinNotification = MessageFactory.create(
      session,
      "notifi",
      `${username} has joined`
    );
    socket.to(roomname).emit("roomMessage", joinNotification);
  };
}


// Handle message sending events

function handleMessageSending(socket) {
  return ({ roomname, messageText, session }: SocketData) => {
    console.log(`roomname- ${roomname}, mess: ${messageText},   sess ${session}`);
    
    if (!roomname || !messageText || !session) {
      console.error("Invalid message attempt: missing required dataaaa");
      return;
    }
    
    // Create and send message to sender (appears as "self")
    const selfMessage = MessageFactory.create(
      session,
      "self",
      messageText
    );

    socket.emit("roomMessage", selfMessage);
    
    // Create and broadcast message to other users in the room
    const broadcastMessage = MessageFactory.create(
      session,
      "broadcast",
      messageText
    );
    socket.to(roomname).emit("roomMessage", broadcastMessage);
  };
}