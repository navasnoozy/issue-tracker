"use client";
import getSocket from "@/lib/socket";
import { Button, Card, Flex, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Socket } from "socket.io-client";

const CreateRoomForm = ({socket}:{socket:Socket}) => {
  const { register, handleSubmit } = useForm();
  const { data, status } = useSession();

  if (status === "unauthenticated") {
    <Card>no access</Card>;
  }

  
  const name = data?.user?.name || socket.id?.substring(0, 5);

  const submit = handleSubmit(({ roomname }) => {
 
    socket.emit("createRoom", { roomname, name });
  });

  return (
    <form className="!flex !flex-col !justify-center !h-full" onSubmit={submit}>
      <Flex justify="center" direction={"column"} gap="2" height={"100%"}>
        <TextField.Root
          {...register("roomname")}
          placeholder="Enter room name"
        />
        <Button type="submit">Create and Join</Button>
      </Flex>
    </form>
  );
};

export default CreateRoomForm;
