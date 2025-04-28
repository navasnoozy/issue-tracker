"use client";
import getSocket from "@/lib/socket";
import { Avatar, Box, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

interface Props {
  isConnected: boolean;
}

export interface MessageType {
  id: string;
  time: string;
  type: "broadcast" | "notifi" | "self";
  content: string | number;
  user?: {
    name?: string;
    avatar?: string;
  };
}

const Messages = ({ isConnected }: Props) => {
  const [messages, setMessages] = useState<MessageType[]>(dummyMessages);

  let socket = getSocket(isConnected);

  socket?.on("roomMessage", (message: MessageType) => {
    console.log(message);
  });

  return (
    <>
      {messages.map((msg) => (
        <Flex
          key={msg.id}
          gap="2"
          className={`${style[msg.type]?.justify} items-center`}
        >
          {msg.type === "broadcast" && (
            <Avatar size="2" radius="full" fallback="A" />
          )}
          <Box className={`${style[msg.type]?.className}`}>{msg.content}</Box>
        </Flex>
      ))}
    </>
  );
};

export default Messages;

const style = {
  self: {
    justify: "!justify-end",
    className: [" bg-green-500 text-white rounded-lg py-1 px-4"],
  },
  broadcast: {
    justify: "!jusitfy-start",
    className: ["bg-blue-500 text-white rounded-lg py-1 px-4"],
  },
  notifi: {
    justify: "!justify-center",
    className: ["text-sm text-gray-500"],
  },
};

const dummyMessages: MessageType[] = [
  {
    id: crypto.randomUUID(),
    time: "12:00 pm",
    type: "broadcast",
    content: "hi",
    user: {
      name: "navas",
    },
  },
  {
    id: crypto.randomUUID(),
    time: "12:00 pm",
    type: "self",
    content: "poda",
    user: {
      name: "ghadhar",
    },
  },
  {
    id: crypto.randomUUID(),
    time: "12:00 pm",
    type: "notifi",
    content: "john joined"
  },
]