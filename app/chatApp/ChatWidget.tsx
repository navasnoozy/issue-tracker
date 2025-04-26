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
            <Flex
              style={{ background: "#FCFCFC" }}
              className="border border-purple-900 rounded-md"
              flexGrow="1"
            >
              message area
            </Flex>
            <Flex align="center" gap="2" width="100%">
              <TextField.Root
                style={{ flexGrow: 1 }}
                placeholder="Enter your message"
              >
                <TextField.Slot>
                  <MdMessage />
                </TextField.Slot>
              </TextField.Root>
              <Button type="submit">
                <IoMdSend />
              </Button>
            </Flex>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
};

export default ChatWidget;
