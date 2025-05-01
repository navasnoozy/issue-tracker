"use client";
import { createContext, ReactNode, useContext, useState } from "react";

//Context type
interface ChatContextType {
  showCreateRoom: boolean;
  setShowCreateRoom: (show: boolean) => void;
  activeRoom:string | null;
  setActiveRoom: (roomId: string | null) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

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
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const value: ChatContextType = {
    showCreateRoom,
    setShowCreateRoom,
    activeRoom,
    setActiveRoom,
    isOpen,
    setIsOpen,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
