//app/chatRoomApp/chatApp.tsx

"use client";
import MidPanel from "./Interface/MidPanel";
import ChatContextProvider, {
  useChatContext,
} from "./components/chatContext/ChatContextProvider";
import PopoverProvider from "./components/PopoverProvider";
import TopPanel from "./Interface/TopPanel";
import BottomPanel from "./Interface/BottomPanel";

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
