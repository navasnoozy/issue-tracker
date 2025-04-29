'use client'

import { Flex, TextField, Button } from "@radix-ui/themes";
import { IoMdSend } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { useForm } from "react-hook-form";
import getSocket from "@/lib/socket";
import { Session } from "next-auth";
import { useState } from "react";

interface Props {
  isConnected: boolean;
  roomname: string;
  session:Session | null
}

const SendMessage = ({ isConnected,roomname, session }: Props) => {
  const { register, handleSubmit,reset } = useForm();


  const submit = handleSubmit(({ messageText }) => {
    const socket = getSocket(isConnected);
    console.log(messageText,roomname,session);
    

    socket?.emit("message", {roomname,messageText,session});
    reset();
  });

  return (
    <form onSubmit={submit}>
      <Flex align="center" gap="2" width="100%">
        <TextField.Root
          style={{ flexGrow: 1 }}
          placeholder="Enter your message"
          {...register('messageText',{ required: true })}
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

export default SendMessage;
