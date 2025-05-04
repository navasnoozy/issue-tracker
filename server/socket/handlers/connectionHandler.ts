import { Socket, Server } from "socket.io";
import { handleUserLeaveRoom } from "./roomHandler";
import { handleMessageSending } from "./messageHandler";
import { handleRoomCreation } from "./roomHandler";
import { chatRooms, PUBLIC_ROOM, roomTable } from "../services/RoomService";
import { Session } from "next-auth";



// Track active user sessions and their rooms
export const userSessions = new Map<string, { roomname: string; session: Session }>();

export function handleConnection(socket: Socket, io: Server) {
  console.log(`User ${socket.id} connection established`);

  /**
   * Update Room list - specifically for public room
   */
  roomTable.set(PUBLIC_ROOM, chatRooms.get(PUBLIC_ROOM).size);
  io.emit("getRoomsList", [ ...roomTable]);

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
      // Use the existing handleUserLeaveRoom function
      const handleLeave = handleUserLeaveRoom(socket, io);
      handleLeave(userData);

      // Remove user from tracking if not already done in handleUserLeaveRoom
      if (userSessions.has(socket.id)) {
        userSessions.delete(socket.id);
      }
    }
  });
}