//ChatWidget.tsx file
"use client";
import { Box, Button, Flex, Popover } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import CreateRoomForm from "./CreateRoomForm";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import getSocket from "@/lib/socket";
import { Socket } from "socket.io-client";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);

  let isConnected = false;
  let socket;
  const handleTongle = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    if (isOpen) {
      socket = getSocket(isConnected);
      socket.on("connect", () => {
        console.log(`User ${socket.id} is connected`);
        isConnected = true;
      });

      return () => {
        socket.disconnect();
        isConnected = false;
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
            <Flex justify={"end"}>
              <Button
                size="1"
                variant="ghost"
                onClick={() => setCreateRoom(!createRoom)}
              >
                {createRoom ? "Room List" : "Create New Room"}
              </Button>
            </Flex>
            <Flex
              style={{ background: "#FCFCFC" }}
              className="border border-purple-100 rounded-md"
              flexGrow="1"
              p="3"
              gap="2"
              direction="column"
            >
              {createRoom && <CreateRoomForm />}
            </Flex>
            <SendMessage />
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
};

export default ChatWidget;
