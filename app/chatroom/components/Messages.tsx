//app/chatApp/Message.tsx file
"use client";
import getSocket from "@/lib/socket";
import { MessageType } from "@/server/types/messageType";
import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { useEffect } from "react";
import { useChatContext } from "./chatContext/ChatContextProvider";

const Messages = () => {
  const { messages, setMessages } = useChatContext();

  const handleRoomMessage = (message: MessageType) => {
    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    const socket = getSocket();
    socket?.on("roomMessage", handleRoomMessage);

    return () => {
      socket?.off("roomMessage", handleRoomMessage);
    };
  }, []);

  return (
    <>
      {messages.map((msg) => (
        <Flex
          key={msg.id}
          gap="2"
          className={`${style[msg.type]?.justify} items-center`}
        >
          {msg.type === "broadcast" && (
            <Avatar
              size="2"
              src={msg.user?.avatar}
              radius="full"
              fallback="A"
            />
          )}
          <Box className={`${style[msg.type]?.className}`}>
            {msg.type === "notifi" ? (
              <Text>{`${msg.content} ${msg.time}`}</Text>
            ) : (
              <>
                <Flex gap="1" align="center">
                  <Text size="2" color="red">
                    {msg.user?.name}
                  </Text>
                  <Text size="1" color="jade">
                    {msg.time}
                  </Text>
                </Flex>
                <Text>{msg.content}</Text>
              </>
            )}
          </Box>
        </Flex>
      ))}
    </>
  );
};

export default Messages;

const style = {
  self: {
    justify: "!justify-end",
    className: "bg-green-300 rounded-lg py-1 px-4",
  },
  broadcast: {
    justify: "!justfy-start",
    className: "bg-blue-300 rounded-lg py-1 px-4",
  },
  notifi: {
    justify: "!justify-center",
    className: "text-sm text-gray-500",
  },
};
