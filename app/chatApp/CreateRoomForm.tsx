//app/chatApp/CreateRoomForm.tsx file
"use client";
import getSocket from "@/lib/socket";
import { Button, Card, Flex, TextField } from "@radix-ui/themes";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

interface Props {
  isConnected: boolean;
  setRoomName: (value:string) => void;
  setCreateRoom:(value:boolean)=> void
  session?:Session | null
}

const CreateRoomForm = ({ isConnected, setRoomName,setCreateRoom,session }: Props) => {
  const { register, handleSubmit } = useForm();
 

  

  let socket = getSocket(isConnected);
  

  const submit = handleSubmit(({ roomname }) => {
    socket?.emit("createRoom", { roomname, session });
    setRoomName (roomname);
    setCreateRoom (false)

    
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
