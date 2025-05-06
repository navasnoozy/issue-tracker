import { SocketData } from "@/server/types/socket.types";
import { Server, Socket } from "socket.io";
import { MessageFactory } from "./MessageFactory";

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
  { roomname, session }: SocketData,
  io?: Server,
  socket?: Socket
) {
  const userEmail = session?.user?.email;
  const username = session?.user?.name;

  socket?.leave(roomname);

  if (userEmail) {
    const room = chatRooms.get(roomname);
    if (room && room.has(userEmail)) {
      // Remove user from room
      room.delete(userEmail);

      // Update room user count
      const currentCount = roomUsersCount.get(roomname);
      roomUsersCount.set(roomname, Math.max((currentCount || 1) - 1, 0));

      // Check if room should be deleted (empty and not the public room)
      if (room.size === 0 && roomname !== PUBLIC_ROOM) {
        chatRooms.delete(roomname);
        roomUsersCount.delete(roomname);
      } else {
        // Only notify others if the room still exists and has members
        const leftNotification = MessageFactory.create(
          session,
          "notifi",
          `${username} has left`
        );
        socket?.to(roomname).emit("roomMessage", leftNotification);
      }
    }

    // Update room list for all clients
    io?.emit("getRoomsList", [...roomUsersCount]);
  }
}
