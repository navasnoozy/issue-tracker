import { Socket } from "socket.io";
import { MessageFactory } from "./messageFactory";
import { SocketData, UserRoomMap } from "./interfaces";

/**
 * Handle room creation events
 * 
 * CHANGES:
 * - Added error handling with try/catch
 * - Added specific error messages sent to client
 * - Store user room info in the userRooms map
 * - Improved logging
 */
export function handleRoomCreation(socket: Socket, userRooms: UserRoomMap) {
  return ({ roomname, session }: SocketData) => {
    try {
      if (!roomname || !session) {
        console.error("Invalid room creation attempt: missing roomname or session");
        socket.emit("error", "Room creation failed: Missing room name or session data");
        return;
      }

      const username = session.user?.name || "Anonymous User";
      
      // Join the specified room
      socket.join(roomname);
      
      // Store user room information for disconnect handling
      userRooms[socket.id] = {
        roomname,
        username,
        session
      };

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
    } catch (error) {
      console.error("Error in room creation:", error);
      socket.emit("error", "Room creation failed");
    }
  };
}

/**
 * ADDED: Handle room joining events
 * This is a new function to separate room joining from creation
 * 
 * REASON: 
 * Original code didn't have a way to join existing rooms
 * This provides that functionality with proper error handling
 */
export function handleRoomJoining(socket: Socket, userRooms: UserRoomMap) {
  return ({ roomname, session }: SocketData) => {
    try {
      if (!roomname || !session) {
        console.error("Invalid room join attempt: missing roomname or session");
        socket.emit("error", "Room join failed: Missing room name or session data");
        return;
      }

      const username = session.user?.name || "Anonymous User";
      
      // Join the specified room
      socket.join(roomname);
      
      // Store user room information for disconnect handling
      userRooms[socket.id] = {
        roomname,
        username,
        session
      };

      // Send welcome message to the user who joined
      const welcomeMessage = MessageFactory.create(
        session,
        "notifi",
        `${username}! You joined ${roomname}`
      );
      socket.emit("roomMessage", welcomeMessage);

      // Notify other users in the room
      const joinNotification = MessageFactory.create(
        session,
        "notifi",
        `${username} has joined`
      );
      socket.to(roomname).emit("roomMessage", joinNotification);
    } catch (error) {
      console.error("Error in room joining:", error);
      socket.emit("error", "Room join failed");
    }
  };
}

/**
 * Handle message sending events
 * 
 * CHANGES:
 * - Added error handling with try/catch
 * - Improved check for messageText to explicitly handle undefined
 * - Added more detailed error logging
 * - Added error feedback to client
 */
export function handleMessageSending(socket: Socket) {
  return ({ roomname, messageText, session }: SocketData) => {
    try {
      if (!roomname || messageText === undefined || !session) {
        console.error("Invalid message attempt: missing required data", { 
          hasRoomname: !!roomname, 
          hasMessageText: messageText !== undefined, 
          hasSession: !!session 
        });
        socket.emit("error", "Message sending failed: Missing required data");
        return;
      }

      // Create and send message to sender (appears as "self")
      const selfMessage = MessageFactory.create(session, "self", messageText);
      socket.emit("roomMessage", selfMessage);

      // Create and broadcast message to other users in the room
      const broadcastMessage = MessageFactory.create(
        session,
        "broadcast",
        messageText
      );
      socket.to(roomname).emit("roomMessage", broadcastMessage);
    } catch (error) {
      console.error("Error in message sending:", error);
      socket.emit("error", "Message sending failed");
    }
  };
}






import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { UserRoomMap } from "./interfaces";
import { MessageFactory } from "./messageFactory";
import { handleRoomCreation, handleRoomJoining, handleMessageSending } from "./handlers";

/**
 * Sets up the Socket.IO server
 * 
 * CHANGES:
 * - Added HttpServer type for the httpServer parameter
 * - Created userRooms map to track socket-to-room associations
 * - Added proper disconnect handling outside of room creation
 * - Added joinRoom event handler
 * - Return the io instance for potential reuse elsewhere
 */
export function setUpSocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Consider restricting this in production
    },
  });

  // Store user room information for proper disconnect handling
  const userRooms: UserRoomMap = {};

  // Handle client connections
  io.on("connect", (socket: Socket) => {
    console.log(`User ${socket.id} connection established`);

    /**
     * Room Events
     */
    socket.on("createRoom", handleRoomCreation(socket, userRooms));
    socket.on("joinRoom", handleRoomJoining(socket, userRooms));

    /**
     * Message Events
     */
    socket.on("message", handleMessageSending(socket));

    /**
     * Connection Events
     * 
     * CHANGE: Moved disconnect handling here from createRoom handler
     * REASON: The original code only handled disconnects for users who created rooms
     *         Now we handle disconnects for all users who joined any room
     */
    socket.on("disconnect", (reason) => {
      const userInfo = userRooms[socket.id];
      
      if (userInfo) {
        // Notify room that user has left
        const leftNotification = MessageFactory.create(
          userInfo.session,
          "notifi",
          `${userInfo.username} has left`
        );
        
        socket.to(userInfo.roomname).emit("roomMessage", leftNotification);
        
        // Clean up user room mapping
        delete userRooms[socket.id];
      }
      
      console.log(`User ${socket.id} disconnected: ${reason}`);
    });
  });

  return io; // Return io instance for potential usage elsewhere
}