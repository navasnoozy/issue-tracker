//app/chatRoomApp/components/PopoverProviderchatApp.tsx

"use client";

import getSocket from "@/lib/socket";
import { Box, Button, Popover } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useRef } from "react";
import { useChatContext } from "./chatContext/ChatContextProvider";
import NoAccess from "./elements/NoAccess";

const PopoverProvider = ({ children }: { children: ReactNode }) => {
  const initialize = useRef(true);
  const { status } = useSession();
  const { isOpen, setIsOpen ,activeRoom } = useChatContext();

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
          <Button disabled={!!activeRoom} className="!rounded-full" size={{ initial: "3", md: "4" }}>
            Chat Rooms
          </Button>
        </Popover.Trigger>

        <Popover.Content
          width="360px"
          minHeight="60vh"
          style={{ display: "flex", flexDirection:'column', gap:'8px' }}
        >
          {children}
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
};

export default PopoverProvider;
