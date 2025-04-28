//ChatWidget.tsx file
"use client";
import { Box, Button, Flex, Popover } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import CreateRoomForm from "./CreateRoomForm";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import getSocket from "@/lib/socket";
import { CgCloseR } from "react-icons/cg";
import { Socket } from "socket.io-client";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);

  const isConnectedRef = useRef(false);

  let socket;
  const handleTongle = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    console.log("use effect running");

    if (isOpen) {
      socket = getSocket(isConnectedRef.current);
      socket.on("connect", () => {
        console.log(`User ${socket.id} is connected`);
        isConnectedRef.current = true;
      });

      return () => {
        socket.disconnect();
        isConnectedRef.current = false;
      };
    }
  }, [isOpen]);

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
            <Flex
              style={{ background: "#FCFCFC" }}
              className="border border-purple-100 rounded-md"
              flexGrow="1"
              p="3"
              gap="2"
              direction="column"
            >
              {createRoom && <CreateRoomForm socket={socket} />}
            </Flex>
            <SendMessage />
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
};

export default ChatWidget;
