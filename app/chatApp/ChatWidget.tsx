//app/chatApp/ChatWidget.tsx file
"use client";
import getSocket from "@/lib/socket";
import { Box, Button, Flex, Popover, ScrollArea } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Messages from "./chatWindow/Messages";
import SendMessage from "./chatWindow/SendMessage";
import ChatRooms from "./chatRoom/ChatRooms";
import CreateRoomForm from "./chatRoom/CreateRoomForm";
import TopPanel from "./TopPanel";
import NoAccess from "./elements/NoAccess";

interface Props {
  isConnected: boolean
}

const ChatWidget = ({isConnected}:Props) => {
  const [createRoom, setCreateRoom] = useState(false);
  const [roomname, setRoomName] = useState("");

  const { data: session} = useSession();

 

  // if user loged in
  return (
    <Flex direction="column" flexGrow="1" gap="2">
      <TopPanel createRoom={createRoom} setCreateRoom={setCreateRoom} />
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
          {createRoom ? (
            <CreateRoomForm
              setRoomName={setRoomName}
              setCreateRoom={setCreateRoom}
              isConnected={isConnected}
              session={session}
            />
          ) : (
            <ChatRooms
              session={session}
              roomname={roomname}
              setRoomName={setRoomName}
              isConnected={isConnected}
            />
          )}
          {roomname && <Messages isConnected={isConnected} />}
        </Flex>
      </ScrollArea>
      {roomname && (
        <SendMessage
          roomname={roomname}
          isConnected={isConnected}
          session={session}
        />
      )}
    </Flex>
  );
};

export default ChatWidget;
