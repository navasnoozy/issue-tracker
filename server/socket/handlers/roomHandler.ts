import { Socket, Server } from "socket.io";
import { MessageFactory } from "../services/MessageFactory";
import { chatRooms, handleChatRooms, PUBLIC_ROOM, roomTable } from "../services/RoomService";
import { userSessions } from "./connectionHandler";
import { SocketData } from "@/types/socket.types";



// Handle room creation events
export function handleRoomCreation(socket: Socket, io: Server) {
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

// HANDLE USER LEAVING ROOM (EXPLICIT LEAVE)
export function handleUserLeaveRoom(socket: Socket, io: Server) {
  return (
    { roomname, session }: SocketData,
    isDisconnecting: boolean = false
  ) => {
    if (!roomname || !session) return;

    const userEmail = session?.user?.email;
    const username = session?.user?.name || "User";

    // Only call socket.leave if not already disconnecting
    if (!isDisconnecting) {
      socket.leave(roomname);
    }

    // Remove from tracking
    userSessions.delete(socket.id);

    // Update room membership
    if (userEmail) {
      const room = chatRooms.get(roomname);
      if (room && room.has(userEmail)) {
        room.delete(userEmail);
      }

      // If room is empty, consider removing it
      if (room && room.size === 0 && roomname !== PUBLIC_ROOM) {
        chatRooms.delete(roomname);
      }

      // Update room list for all clients
      io.emit("getRoomsList", [...roomTable]);
    }

    // NOTIFY OTHERS THAT USER LEFT
    const leftNotification = MessageFactory.create(
      session,
      "notifi",
      `${username} has left`
    );
    socket.to(roomname).emit("roomMessage", leftNotification);
  };
}