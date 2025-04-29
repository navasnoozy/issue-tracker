"use client";
import getSocket from "@/lib/socket";
import { Button, Card, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

interface Props {
  isConnected: boolean;
  setRoomName : (value:string)=> void
}

const ChatRooms = ({ isConnected,setRoomName }: Props) => {
  const [roomsList, setRoomsList] = useState(["Public room"]);
  console.log("roomlist", roomsList);

  const handleClick = (value: string) => {
    console.log(value);
  };

  useEffect(() => {
    const socket = getSocket(isConnected);
    console.log("chatrooms use effect");

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
