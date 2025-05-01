"use client";
import getSocket from "@/lib/socket";
import { Button, Card, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useChatContext } from "../components/chatContext/ChatContextProvider";


interface Props {
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>;
}

const ChatRooms = () => {
  const {data: session} = useSession();
  const {setCurrentRoom}= useChatContext();
  const [roomsList, setRoomsList] = useState(["Public room"]);


  const socket = getSocket();

  const handleClick = (room: string) => {
    socket?.emit("createRoom", { room, session });
  };

  useEffect(() => {
    socket?.on("getRoomsList", (newRooms: []) => {
      setRoomsList(newRooms);
    });
  }, []);

  return (
    <>
      {roomsList.map((room, index) => (
        <Card
          key={index}
          className="!flex !justify-between !items-center !gap-2"
        >
          {room}{" "}
          <Button size="2" variant="soft" onClick={() => handleClick(room)}>
            Join
          </Button>
        </Card>
      ))}
    </>
  );
};

export default ChatRooms;
