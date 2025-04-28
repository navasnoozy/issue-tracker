"use client";
import { Box, Button, Flex, Popover } from "@radix-ui/themes";
import { useState } from "react";
import CreateRoomForm from "./CreateRoomForm";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [createRoom, setCreateRoom] = useState(false);

  const handleTongle = (open: boolean) => {
    setIsOpen(open);
  };

  //   useEffect (()=>{
  //     const socketInstance:Socket = io();

  //     socketInstance.on('connection',()=>{
  //       console.log('Connected to socket server');
  //     })

  // },[isOpen])

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
              {createRoom ? <CreateRoomForm /> : <Messages />}
            </Flex>
            <SendMessage />
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
};

export default ChatWidget;
