import { Server } from "socket.io";

// Initialize public room
// Chat rooms management
export const chatRooms = new Map();
export const roomUsersCount = new Map();
export const PUBLIC_ROOM = "Public room";
chatRooms.set(PUBLIC_ROOM, new Set());

export function addToChatRoomTracker(
  roomname: string,
  userEmail: string,
  io: Server
) {
  let room = chatRooms.get(roomname);

  if (!room) {
    chatRooms.set(roomname, new Set());
  }

  if (userEmail) {
    chatRooms.get(roomname).add(userEmail);
  }

  roomUsersCount.set(roomname, chatRooms.get(roomname).size);

  io.emit("getRoomsList", [...roomUsersCount]);
}

// Delete and update Chatroom list and table
export function removeFromChatRoomTracker(
  roomname?: string,
  userEmail?: string | null,
  io?: Server
) {
  if (userEmail) {
    const room = chatRooms.get(roomname);
    if (room && room.has(userEmail)) {
      room.delete(userEmail);

      const currentCount = roomUsersCount.get(roomname);
      roomUsersCount.set(roomname, Math.max((currentCount || 1) - 1, 0));
    }
    
    
      if (room && room.size === 0 && roomname !== PUBLIC_ROOM) {
        // If room is empty, consider removing it
        chatRooms.delete(roomname);
        roomUsersCount.delete(roomname);
      }

    // Update room list for all clients
    io?.emit("getRoomsList", [...roomUsersCount]);
  }
}
