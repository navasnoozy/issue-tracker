import { Session } from "next-auth";

export interface SocketData {
  roomname: string;
  messageText?: string | number;
  session?: Session;
}



