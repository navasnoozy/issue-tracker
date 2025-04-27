import { Avatar, Box, Flex } from "@radix-ui/themes";
import { useState } from "react";

interface messageType {
  id: string;
  username?: string;
  type: "notifi" | "my" | "others";
  content: string;
}

const Messages = () => {
  const [messages] = useState<messageType[]>([
    {
      id: crypto.randomUUID(),
      username: "John",
      type: "my",
      content: "Hi",
    },
    {
      id: crypto.randomUUID(),
      username: "",
      type: "notifi",
      content: "john left",
    },
    {
      id: crypto.randomUUID(),
      username: "John",
      type: "others",
      content: "hello",
    },
  ]);

  const style = {
    my: {
      justify: "!justify-end",
      className: [" bg-green-500 text-white rounded-lg py-1 px-4"],
    },
    others: {
      justify: "!jusitfy-start",
      className: ["bg-blue-500 text-white rounded-lg py-1 px-4"],
    },
    notifi: {
      justify: "!justify-center",
      className: ["text-sm text-gray-500"],
    },
  };

  return (
    <>
      {messages.map((msg) => (
        <Flex
          key={msg.id}
          gap="2"
          className={`${style[msg.type]?.justify} items-center`}
        >
          {msg.type === "others" && (
            <Avatar size="2" radius="full" fallback="A" />
          )}
          <Box className={`${style[msg.type]?.className}`}>{msg.content}</Box>
        </Flex>
      ))}
    </>
  );
};

export default Messages;
