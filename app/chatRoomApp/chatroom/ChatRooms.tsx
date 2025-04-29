"use client";
import getSocket from "@/lib/socket";
import { Button, Card, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Session } from "next-auth";


const ChatRooms = () => {
  const [roomsList, setRoomsList] = useState(["Public room"]);

  const socket = getSocket();


  const handleClick = (room: string) => {
    setRoomName(room);
    socket?.emit("createRoom", { roomname, session });
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
