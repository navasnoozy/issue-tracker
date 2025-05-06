"use client";
import ChatContextProvider from "./components/chatContext/ChatContextProvider";
import PopoverProvider from "./components/PopoverProvider";
import ChatFooter from "./Interface/ChatFooter";
import Chatbody from "./Interface/ChatBody";
import ChatNavbar from "./Interface/ChatNavbar";
import { Metadata } from "next";

const ChatContainer = () => {
  return (
    <ChatContextProvider>
      <PopoverProvider>
        <ChatNavbar />
        <Chatbody />
        <ChatFooter />
      </PopoverProvider>
    </ChatContextProvider>
  );
};


export const metadata: Metadata = {
  title: "Issue Tracker - ChatRooms",
  description: "charooms",
};

export default ChatContainer;
