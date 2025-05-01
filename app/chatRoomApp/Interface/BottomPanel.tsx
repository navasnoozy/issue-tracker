"use client";

import getSocket from "@/lib/socket";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { useChatContext } from "../components/chatContext/ChatContextProvider";


//SEND MESSAGE FORM
const BottomPanel = () => {
  const { register, handleSubmit, reset } = useForm();
  const { data: session } = useSession();
  const { currentRoom } = useChatContext();

  const submit = handleSubmit(({ messageText }) => {
    const socket = getSocket();

    socket?.emit("message", { currentRoom, messageText, session });
    reset();
  });

  if (!currentRoom) return null

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

export default BottomPanel;
