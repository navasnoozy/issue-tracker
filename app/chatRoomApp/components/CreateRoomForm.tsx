//app/chatApp/CreateRoomForm.tsx file
"use client";
import getSocket from "@/lib/socket";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useChatContext } from "./chatContext/ChatContextProvider";

export type Response = {
  success: boolean;
  statusText: string;
};
 
const CreateRoomForm = () => {
  const { register, handleSubmit } = useForm();
  const { data: session } = useSession();
  const { setActiveRoom, setShowCreateRoom } = useChatContext();

const socket = getSocket();

  const submit = handleSubmit(({ roomname }) => {
    socket?.emit("createRoom", { roomname, session }, (res: Response) => {
      if (res.success) {
        toast.success(res.statusText);
        setActiveRoom(roomname);
        setShowCreateRoom(false);
      } else {
        toast.error(res.statusText);
      }
    });
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
