"use client";
import getSocket from "@/lib/socket";
import { Button, Card, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Session } from "next-auth";

interface Props {
  isConnected: boolean;
  roomname: string;
  session: Session | null
  setRoomName: (value: string) => void;
}

const ChatRooms = ({ isConnected, setRoomName, roomname, session }: Props) => {
  const [roomsList, setRoomsList] = useState(["Public room"]);

  const socket = getSocket(isConnected);


  const handleClick = (room: string) => {
    setRoomName(room);
    socket?.emit("createRoom", { roomname, session });
  };

  useEffect(() => {

    socket?.on("getRoomsList", (newRooms: []) => {
      setRoomsList(newRooms);
      console.log("roomlist2", roomsList);
    });
  }, [isConnected]);

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
