//app/chatApp/ChatWidget.tsx file
"use client";
import { Flex, ScrollArea } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ChatRooms from "./chatroom/ChatRooms";
import CreateRoomForm from "./chatroom/CreateRoomForm";
import Messages from "./chatingpanel/Messages";
import SendMessage from "./chatingpanel/SendMessage";
import TopPanel from "./TopPanel";

const ChatWidget = () => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [currentRoom, setCurrentRoom] = useState("");

  const { data: session } = useSession();

  return (
    <Flex direction="column" flexGrow="1" gap="2">
      <TopPanel showCreateRoomForm={{ showCreateRoom, setShowCreateRoom }} />
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
          {showCreateRoom && <CreateRoomForm setCurrentRoom={setCurrentRoom} 
          setShowCreateRoom={setShowCreateRoom}
          />}
        </Flex>
      </ScrollArea>
      {currentRoom && <SendMessage roomname={currentRoom} />}
    </Flex>
  );
};

export default ChatWidget;
