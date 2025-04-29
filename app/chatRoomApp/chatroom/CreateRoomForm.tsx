//app/chatApp/CreateRoomForm.tsx file
"use client";
import getSocket from "@/lib/socket";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

interface Props {
    setCurrentRoom: React.Dispatch<React.SetStateAction<string>>;
    setShowCreateRoom:React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateRoomForm = ({ setCurrentRoom, setShowCreateRoom }: Props) => {
  const { register, handleSubmit } = useForm();
  const {data:session} = useSession()

  let socket = getSocket();

  const submit = handleSubmit(({ roomname }) => {
    socket?.emit("createRoom", { roomname, session });
    setCurrentRoom(roomname);
    setShowCreateRoom(false);
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
