import { Server, Socket } from "socket.io";
import { Session } from "next-auth";
import getFormatedTime from "@/app/utils/getFormatTime";
import { Server as HttpServer } from "http";

export interface MessageType {
  id: string;
  time: string;
  type: "broadcast" | "notifi" | "self";
  content: string | number;
  user?: {
    name?: string | null;
    avatar?: string;
  };
}

interface SocketData {
  roomname: string;
  messageText?: string | number;
  session?: Session;
}

// Track active user sessions and their rooms
const userSessions = new Map<string, { roomname: string, session: Session }>();

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

export function setUpSocketServer(httpServer: HttpServer) {
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
    socket.on("createRoom", handleRoomCreation(socket, io));

    /**
     * Message Events
     */
    socket.on("message", handleMessageSending(socket));

    /**
     * User leave room
     */
    socket.on("user-left", handleUserLeaveRoom(socket, io));

    /**
     * Connection Events - Handle disconnection
     */
    socket.on("disconnect", (reason) => {
      console.log(`User ${socket.id} disconnected: ${reason}`);
      
      // Check if this user was in a room
      const userData = userSessions.get(socket.id);
      if (userData) {
        const { roomname, session } = userData;
        
        // Remove user from tracking
        userSessions.delete(socket.id);
        
        // Send notification to room
        const username = session.user?.name || "User";
        const leftNotification = MessageFactory.create(
          session,
          "notifi",
          `${username} has left`
        );
        socket.to(roomname).emit("roomMessage", leftNotification);
        
        // Update room membership
        const userEmail = session?.user?.email;
        if (roomname && userEmail) {
          const room = chatRooms.get(roomname);
          if (room && room.has(userEmail)) {
            room.delete(userEmail);
          }
          
          // If room is empty, consider removing it
          if (room && room.size === 0) {
            chatRooms.delete(roomname);
          }
          
          // Update room list for all clients
          io.emit("getRoomsList", [...chatRooms.keys()]);
        }
      }
    });
  });
}

// Handle room creation events
function handleRoomCreation(socket: Socket, io: Server) {
  return ({ roomname, session }: SocketData, callback: Function) => {
    if (!roomname || !session) {
      console.error(
        "Invalid room creation attempt: missing roomname or session"
      );
      callback({ success: false, statusText: "Could not create" });
      return;
    }

    // Join the specified room
    socket.join(roomname);
    const username = session.user?.name || "User";

    // Store user session data for disconnect handling
    userSessions.set(socket.id, { roomname, session });

    handleChatRooms(roomname, session.user?.email || "anonymous", io);

    callback({ success: true, statusText: "Room Successfully created" });

    // SEND WELCOME MESSAGE TO THE USER WHO JOINED
    const welcomeMessage = MessageFactory.create(
      session,
      "notifi",
      `${username}! Welcome to ${roomname}`
    );
    socket.emit("roomMessage", welcomeMessage);

    // NOTIFY OTHER USERS IN THE ROOM
    const joinNotification = MessageFactory.create(
      session,
      "notifi",
      `${username} has joined`
    );
    socket.to(roomname).emit("roomMessage", joinNotification);
  };
}

// HANDLE MESSAGE SENDING EVENTS
function handleMessageSending(socket: Socket) {
  return ({ roomname, messageText, session }: SocketData) => {
    console.log(
      `roomname- ${roomname}, mess: ${messageText},   sess ${session}`
    );

    if (!roomname || !messageText || !session) {
      console.error("Invalid message attempt: missing required data");
      return;
    }

    // CREATE AND SEND MESSAGE TO SENDER (APPEARS AS "SELF")
    const selfMessage = MessageFactory.create(session, "self", messageText);
    socket.emit("roomMessage", selfMessage);

    // CREATE AND BROADCAST MESSAGE TO OTHER USERS IN THE ROOM
    const broadcastMessage = MessageFactory.create(
      session,
      "broadcast",
      messageText
    );
    socket.to(roomname).emit("roomMessage", broadcastMessage);
  };
}

// HANDLE USER LEAVING ROOM (EXPLICIT LEAVE)
function handleUserLeaveRoom(socket: Socket, io: Server) {
  return ({ roomname, session }: SocketData) => {
    if (!roomname || !session) return;
    console.log('reached 11111 ///////////////////////');
    
    const userEmail = session?.user?.email;
    const username = session?.user?.name || "User";

    // Remove user from socket room
    socket.leave(roomname);
    console.log('reached 22222 ///////////////////////');
    // Remove from tracking
    userSessions.delete(socket.id);

    // Update room membership
    if (userEmail) {
      const room = chatRooms.get(roomname);
      if (room && room.has(userEmail)) {
        room.delete(userEmail);
      }
      console.log('reached 33333 ///////////////////////'); 
      // If room is empty, consider removing it
      if (room && room.size === 0) {
        chatRooms.delete(roomname);
      }
      console.log('reached 4444 ///////////////////////');
      // Update room list for all clients
      io.emit("getRoomsList", [...chatRooms.keys()]);
    }
    console.log('reached 555555 ///////////////////////');
    // NOTIFY OTHERS THAT USER LEFT
    const leftNotification = MessageFactory.create(
      session,
      "notifi",
      `${username} has left`
    );
    socket.to(roomname).emit("roomMessage", leftNotification);
  };
}

// HANDLE CHAT ROOMS
const chatRooms = new Map();

function handleChatRooms(roomname: string, userEmail: string, io: Server) {
  if (!chatRooms.has(roomname)) {
    chatRooms.set(roomname, new Set());
  }

  if (userEmail) {
    chatRooms.get(roomname).add(userEmail);
  }

  io.emit("getRoomsList", [...chatRooms.keys()]);
}