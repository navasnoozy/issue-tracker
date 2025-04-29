"use client";

import { Button, Box, Popover } from "@radix-ui/themes";
import ChatWidget from "./ChatWidget";
import { useEffect, useRef, useState } from "react";
import getSocket from "@/lib/socket";
import NoAccess from "./elements/NoAccess";
import { useSession } from "next-auth/react";

const ChatLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const initialize = useRef(true);
  const { status } = useSession();

  const handleTongle = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    if (isOpen) {
      let socket = getSocket(initialize.current);
      socket?.on("connect", () => {
        console.log(`User ${socket.id} is connected`);
        initialize.current = false;
      });

      return () => {
        socket?.disconnect();
        initialize.current = true;
      };
    }
  }, [isOpen]);

  //If user not loged in
  if (status === "unauthenticated") {
    return <NoAccess />;
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
          <ChatWidget  />
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
};

export default ChatLauncher;
