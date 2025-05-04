//app/chatroomapp/components/chatContext/chatcontextProvider.tsx
"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

import { MessageType } from "@/types/Message";

//Context type
interface ChatContextType {
  showCreateRoom: boolean;
  setShowCreateRoom: (show: boolean) => void;
  activeRoom: string | null;
  setActiveRoom: (roomId: string | null) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
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
  const [messages, setMessages] = useState<MessageType[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

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
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
