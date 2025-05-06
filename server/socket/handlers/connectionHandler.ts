import { Server, Socket } from "socket.io";
import {
  chatRooms,
  PUBLIC_ROOM,
  removeFromChatRoomTracker,
  roomUsersCount,
} from "../services/RoomService";
import { handleMessageSending } from "./messageHandler";
import { handleRoomCreation, handleUserLeaveRoom } from "./roomHandler";

// Track active user sessions and their rooms

export function handleConnection(socket: Socket, io: Server) {
  console.log(`User ${socket.id} connection established`);

  /**
   * Update Room list - specifically for public room
   */
  roomUsersCount.set(PUBLIC_ROOM, chatRooms.get(PUBLIC_ROOM).size);
  io.emit("getRoomsList", [...roomUsersCount]);

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

  /**z
   * Connection Events - Handle disconnection
   */
  socket.on("disconnect", (reason) => {
    console.log(`User ${socket.id} disconnected: ${reason}`);
     const session = socket.data.session
     const roomname = socket.data.roomname

     //only call if user joined any room
    if (roomname) removeFromChatRoomTracker({roomname, session},io, socket);
    
  });
}
