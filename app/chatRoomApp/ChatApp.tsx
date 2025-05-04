//app/chatRoomApp/chatApp.tsx
"use client";

import ChatContextProvider from "./components/chatContext/ChatContextProvider";
import PopoverProvider from "./components/PopoverProvider";
import ChatFooter from "./Interface/ChatFooter";
import Chatbody from "./Interface/ChatBody";
import ChatNavbar from "./Interface/ChatNavbar";

const ChatApp = () => {
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

export default ChatApp;
