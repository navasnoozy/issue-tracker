import { createContext, ReactNode, useContext, useState } from "react";

//Context type
interface ChatContextType {
  showCreateRoom: boolean;
  setShowCreateRoom: (show: boolean) => void;
  currentRoom: string;
  setCurrentRoom: (roomId: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

//create context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

//creating custom hook
export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("chatContext is not provided");
  }

  return context;
};

//wraping component with context provider
const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [currentRoom, setCurrentRoom] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const value: ChatContextType = {
    showCreateRoom,
    setShowCreateRoom,
    currentRoom,
    setCurrentRoom,
    isOpen,
    setIsOpen,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
