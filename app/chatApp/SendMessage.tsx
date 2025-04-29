'use client'

import { Flex, TextField, Button } from "@radix-ui/themes";
import { IoMdSend } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { useForm } from "react-hook-form";
import getSocket from "@/lib/socket";
import { Session } from "next-auth";

interface Props {
  isConnected: boolean;
  roomName: string;
  session:Session | null
}

const SendMessage = ({ isConnected,roomName, session }: Props) => {
  const { register, handleSubmit } = useForm();

  const submit = handleSubmit(({ messageText }) => {
    const socket = getSocket(isConnected);

    socket?.emit("message", {roomName,messageText,session});
  });

  return (
    <form onSubmit={submit}>
      <Flex align="center" gap="2" width="100%">
        <TextField.Root
          style={{ flexGrow: 1 }}
          placeholder="Enter your message"
        >
          <TextField.Slot {...register("messageText", { required: true })}>
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

export default SendMessage;
