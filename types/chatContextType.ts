import { Dispatch, RefObject, SetStateAction } from "react";
import { MessageType } from "./messageType";

export type Activeroom = {
  roomname: string | null;
  userCount: number | null;
};

// roomsList type
export type RoomType = [string, number];

//Context type
export interface ChatContextType {
  showCreateRoom: boolean;
  setShowCreateRoom: (show: boolean) => void;
  activeRoom: Activeroom;
  setActiveRoom: Dispatch<SetStateAction<Activeroom>>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
  portalRef: RefObject<HTMLDivElement | null>
  roomsList: Map<string,number>
  setRoomsList: Dispatch<SetStateAction<Map<string,number>>>
}
