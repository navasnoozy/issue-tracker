"use client";
import {
  Box,
  Button,
  Flex,
  Popover
} from "@radix-ui/themes";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

const ChatWidget = () => {


  return (
    <Box
      position="fixed"
      bottom="4" // 1rem = 16px (Tailwind scale: 4 = 16px)
      right="4"
    >
      <Popover.Root open>
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
            <Messages />
            <SendMessage />
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
};

export default ChatWidget;
