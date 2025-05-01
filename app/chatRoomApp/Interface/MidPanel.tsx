//app/chatApp/ChatWidget.tsx file
"use client";
import { Flex, ScrollArea } from "@radix-ui/themes";
import { useChatContext } from "../components/chatContext/ChatContextProvider";
import TopPanel from "./TopPanel";
import CreateRoomForm from "../components/CreateRoomForm";
import ChatRooms from "../components/ChatRooms";
import Messages from "../components/Messages";

const MidPanel = () => {
  const { showCreateRoom,  activeRoom } = useChatContext();

  return (
    <Flex direction="column" flexGrow="1" gap="2">
      <ScrollArea type="auto" scrollbars="vertical" style={{ height: "60vh" }}>
        <Flex
          style={{ background: "#FCFCFC" }}
          className="border border-purple-100 rounded-md"
          flexGrow="1"
          p="3"
          gap="2"
          direction="column"
          height={"100%"}
        >
        {activeRoom ? <Messages /> : showCreateRoom ? <CreateRoomForm /> : <ChatRooms />}
        </Flex>
      </ScrollArea>
    </Flex>
  );
};

export default MidPanel;
