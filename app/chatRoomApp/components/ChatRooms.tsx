"use client";
import getSocket from "@/lib/socket";
import { Button, Card, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useChatContext } from "./chatContext/ChatContextProvider";
import { Response } from "./CreateRoomForm";
import toast from "react-hot-toast";

interface Props {
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>;
}

const ChatRooms = () => {
  const { data: session } = useSession();
  const { setActiveRoom, setShowCreateRoom } = useChatContext();
  const [roomsList, setRoomsList] = useState<string[]>([]);

  const socket = getSocket();

  const handleClick = (roomname: string) => {
    socket?.emit("createRoom", { roomname, session }, (res: Response) => {
      if (res.success) {
        toast.success(res.statusText);
        setActiveRoom(roomname);
        setShowCreateRoom(false);
      } else {
        toast.error(res.statusText);
      }
    });
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
