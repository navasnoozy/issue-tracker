//app/chatApp/ChatWidget.tsx file
"use client";
import { Box, Button, Flex, Popover, ScrollArea } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import CreateRoomForm from "./CreateRoomForm";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import getSocket from "@/lib/socket";
import { CgCloseR } from "react-icons/cg";
import { useSession } from "next-auth/react";


const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);
  const [roomname, setRoomName] = useState("");
  const isConnected = useRef(false);
  const { data: session, status } = useSession();

  const handleTongle = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    if (isOpen) {
      let socket = getSocket(isConnected.current);
      socket?.on("connect", () => {
        console.log(`User ${socket.id} is connected`);
        isConnected.current = true;
      });

      return () => {
        socket?.disconnect();
        isConnected.current = false;
      };
    }
  }, [isOpen]);

  //If user not loged in
  if (status === "unauthenticated") {
    return (
      <Box position="fixed" bottom="4" right="4">
        <Popover.Root>
          <Popover.Trigger>
            <Button className="!rounded-full" size={{ initial: "3", md: "4" }}>
              Chat Rooms
            </Button>
          </Popover.Trigger>

          <Popover.Content
            width="360px"
            minHeight="50vh"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Login first to access chat Rooms
          </Popover.Content>
        </Popover.Root>
      </Box>
    );
  }

  // if user loged in
  return (
    <Box
      position="fixed"
      bottom="4" // 1rem = 16px (Tailwind scale: 4 = 16px)
      right="4"
    >
      <Popover.Root open={isOpen} onOpenChange={(open) => handleTongle(open)}>
        <Popover.Trigger>
          <Button className="!rounded-full" size={{ initial: "3", md: "4" }}>
            Chat Rooms
          </Button>
        </Popover.Trigger>

        <Popover.Content
          width="360px"
          minHeight="50vh"
          style={{ display: "flex" }}
        >
          <Flex direction="column" flexGrow="1" gap="2">
            <Flex justify={"between"}>
              <Button
                size="1"
                variant="ghost"
                onClick={() => setCreateRoom(!createRoom)}
              >
                {createRoom ? "Room List" : "Create New Room"}
              </Button>
              <CgCloseR className="text-purple-900" />
            </Flex>
            <ScrollArea type="auto"  scrollbars="vertical" style={{ height: '60vh' }} >
            <Flex
              style={{ background: "#FCFCFC" }}
              className="border border-purple-100 rounded-md"
              flexGrow="1"
              p="3"
              gap="2"
              direction="column"
              height={'100%'}
            >
              {createRoom && (
                <CreateRoomForm
                  setRoomName={setRoomName}
                  setCreateRoom={setCreateRoom}
                  isConnected={isConnected.current}
                  session={session}
                />
              )}
              {roomname && <Messages isConnected={isConnected.current} />}
            </Flex>
            </ScrollArea>
            {roomname && (
              <SendMessage
                roomname={roomname}
                isConnected={isConnected.current}
                session={session}
              />
            )}
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
};

export default ChatWidget;
