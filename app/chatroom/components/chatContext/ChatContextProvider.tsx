//app/chatroomapp/components/chatContext/chatcontextProvider.tsx
"use client";
import { createContext, ReactNode, useContext, useRef, useState } from "react";

import { Activeroom, ChatContextType } from "@/server/types/chatContextType";
import { MessageType } from "@/server/types/messageType";

//create context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

//creating custom hook
export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }

  return context;
};

//wraping component with context provider
const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [activeRoom, setActiveRoom] = useState<Activeroom>({
    roomname: null,
    userCount: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef(null);
  const [roomsList, setRoomsList] = useState<Map<string, number>>(new Map());

  const value: ChatContextType = {
    showCreateRoom,
    setShowCreateRoom,
    activeRoom,
    setActiveRoom,
    isOpen,
    setIsOpen,
    scrollRef,
    messages,
    setMessages,
    portalRef,
    roomsList,
    setRoomsList,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
