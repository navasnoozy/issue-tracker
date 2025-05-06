//app/chatroomapp/components/CreateRoomForm.tsx file
"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import getSocket from "@/lib/socket";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useChatContext } from "./chatContext/ChatContextProvider";

export type Response = {
  success: boolean;
  statusText: string;
};
 
const CreateRoomForm = () => {
  const { register, handleSubmit,setFocus } = useForm();
  const { data: session } = useSession();
  const { setActiveRoom, setShowCreateRoom, roomsList } = useChatContext();
  const [error, setError] = useState('')

const socket = getSocket();

  const submit = handleSubmit(({ roomname }) => {

    if(roomsList.has(roomname)){
      setError("Room name already exists.");
      return
    }

    socket?.emit("createRoom", { roomname, session }, (res: Response) => {
      if (res.success) {
        toast.success(res.statusText);
        setActiveRoom({roomname,userCount:0});
        setShowCreateRoom(false);
      } else {
        toast.error(res.statusText);
      }
    });
  });
  
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect (()=>{
    setFocus('roomname')
  },[])

  return (
    <form className="!flex !flex-col !justify-center !h-full" onSubmit={submit}>
      <Flex justify="center" direction={"column"} gap="2" height={"100%"}>
        <TextField.Root
          {...register("roomname")}
          placeholder="Enter room name"
        />
        <Button type="submit">Create and Join</Button>
        <Flex justify={'center'} align={'center'}><ErrorMessage>{error}</ErrorMessage></Flex>
      </Flex>
     
    </form>
  );
};

export default CreateRoomForm;
