import { Socket } from "socket.io";
import { MessageFactory } from "../services/MessageFactory";
import { SocketData } from "@/types/socket.types";

// HANDLE MESSAGE SENDING EVENTS
export function handleMessageSending(socket: Socket) {
  return ({ roomname, messageText, session }: SocketData) => {
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