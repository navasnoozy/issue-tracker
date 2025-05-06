import { Socket, Server } from "socket.io";
import { MessageFactory } from "../services/MessageFactory";
import {
  chatRooms,
  addToChatRoomTracker,
  PUBLIC_ROOM,
  roomUsersCount,
  removeFromChatRoomTracker,
} from "../services/RoomService";
import { SocketData } from "@/server/types/socket.types";

// HANDLE ROOM CREATION or JOINING ROOM EVENTS
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

    //saving user data from unexpected disconnection
    socket.data.session = session;
    socket.data.roomname = roomname;

    addToChatRoomTracker(roomname, session.user?.email || "anonymous", io);

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
  return ({ roomname, session }: SocketData) => {
    if (!roomname || !session) return;

    const username = session?.user?.name || "User";

    removeFromChatRoomTracker({ roomname, session }, io, socket);
  };
}
