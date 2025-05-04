
import { Server } from "socket.io";


// Initialize public room
// Chat rooms management
export const chatRooms = new Map();
export const roomTable = new Map();
export const PUBLIC_ROOM = "Public room";
chatRooms.set(PUBLIC_ROOM, new Set());

export function handleChatRooms(roomname: string, userEmail: string, io: Server) {
  let room = chatRooms.get(roomname);

  if (!room) {
    chatRooms.set(roomname, new Set());
  }

  if (userEmail) {
    chatRooms.get(roomname).add(userEmail);
  }

  roomTable.set(roomname, chatRooms.get(roomname).size);
  
  io.emit("getRoomsList", [...roomTable]);
}