// app/chatroomapp/interface/Chatfooer.tsx
"use client";

import getSocket from "@/lib/socket";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { useChatContext } from "../components/chatContext/ChatContextProvider";
import { useEffect } from "react";

//SEND MESSAGE FORM
const ChatFooter = () => {
  const { register, handleSubmit, setFocus, reset } = useForm();
  const { data: session } = useSession();
  const { activeRoom } = useChatContext();

  const submit = handleSubmit(({ messageText }) => {
    const socket = getSocket();

    socket?.emit("message", { roomname: activeRoom.roomname, messageText, session });
    reset();
  });

  useEffect(() => {
    if (activeRoom.roomname) {
      setFocus("messageText");
    }
  }, [activeRoom.roomname, setFocus]);

  if (!activeRoom.roomname) return null;

  return (
    <form onSubmit={submit}>
      <Flex align="center" gap="2" width="100%">
        <TextField.Root
          style={{ flexGrow: 1 }}
          placeholder="Enter your message"
          {...register("messageText", { required: true })}
        >
          <TextField.Slot>
            <MdMessage />
          </TextField.Slot>
        </TextField.Root>
        <Button type="submit">
          <IoMdSend />
        </Button>
      </Flex>
    </form>
  );
};

export default ChatFooter;
