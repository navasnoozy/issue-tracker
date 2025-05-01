//app/chatRoomApp/chatApp.tsx

"use client";

import ChatContextProvider from "./components/chatContext/ChatContextProvider";
import PopoverProvider from "./components/PopoverProvider";
import BottomPanel from "./Interface/BottomPanel";
import MidPanel from "./Interface/MidPanel";
import TopPanel from "./Interface/TopPanel";

const ChatApp = () => {
  return (
    <ChatContextProvider>
      <PopoverProvider>
        <TopPanel />
        <MidPanel />
        <BottomPanel />
      </PopoverProvider>
    </ChatContextProvider>
  );
};

export default ChatApp;
