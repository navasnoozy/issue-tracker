//app/chatroomapp/interface/chatbody.tsx
"use client";
import { Flex, ScrollArea } from "@radix-ui/themes";
import { useEffect } from "react";
import { useChatContext } from "../components/chatContext/ChatContextProvider";
import ChatRooms from "../components/ChatRooms";
import CreateRoomForm from "../components/CreateRoomForm";
import Messages from "../components/Messages";

const Chatbody = () => {
  const { messages, showCreateRoom, activeRoom, scrollRef, portalRef } = useChatContext();

  useEffect(() => {
    const scrollElement = scrollRef?.current;
    if (scrollElement) {
      scrollElement.scrollTop = scrollElement?.scrollHeight;
    }
  }, [messages, scrollRef]);

  return (
    <Flex direction="column" flexGrow="1" gap="2">
      <ScrollArea
        ref={scrollRef}
        type="auto"
        scrollbars="vertical"
        style={{ height: "60vh" }}
      >
        <Flex
          style={{ background: "#FCFCFC" }}
          className="border border-purple-100 rounded-md"
          flexGrow="1"
          p="3"
          gap="2"
          direction="column"
          height={"100%"}
          ref={portalRef}
        >
          {activeRoom.roomname ? (
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
