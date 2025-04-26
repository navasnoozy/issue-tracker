"use client";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Popover,
  TextArea,
  Text,
  TextField,
  Card,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { MdMessage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import SendMessage from "./SendMessage";
import Messages from "./Messages";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

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
