//app/chatroomapp/interface/chatbody.tsx
"use client";
import { Flex, ScrollArea } from "@radix-ui/themes";
import { useChatContext } from "../components/chatContext/ChatContextProvider";
import ChatRooms from "../components/ChatRooms";
import CreateRoomForm from "../components/CreateRoomForm";
import Messages from "../components/Messages";

const Chatbody = () => {
  const { showCreateRoom, activeRoom } = useChatContext();

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
          {activeRoom ? (
            <Messages />
          ) : showCreateRoom ? (
            <CreateRoomForm />
          ) : (
            <ChatRooms />
          )}
        </Flex>
      </ScrollArea>
    </Flex>
  );
};

export default Chatbody;
