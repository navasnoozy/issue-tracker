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
        <Popover.Content width="360px" >
          <Flex gap="3">
            <Box flexGrow="1">
              <Flex gap="3" mt="3" justify="between">
                <Flex align="center" gap="2" width='100%'>
                  <TextField.Root style={{flexGrow:'1'}}  placeholder="Enter you message">
                    <TextField.Slot>
                      <MdMessage />
                    </TextField.Slot>
                  </TextField.Root>
                  <Button type="submit">
                    <IoMdSend />
                  </Button>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
};

export default ChatWidget;
