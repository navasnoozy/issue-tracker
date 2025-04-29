'use client'
import getSocket from "@/lib/socket";
import { Card,Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

interface Props {
  isConnected: boolean;
}

interface RoomsList {
    room: string
}

const ChatRooms = ({ isConnected }: Props) => {
  const [roomsList, setRoomsList] = useState<RoomsList[]>([]);

  useEffect(() => {
    const socket = getSocket(isConnected);

    socket?.on("getRoomsList", (roomsList:RoomsList[]) => {
      setRoomsList(roomsList);
    });
  }, [isConnected]);

  return (
    <>
     {roomsList.map((room,index)=>(
        <Card key={index}><Text>{room.room}</Text></Card>
     ))}
    </>
  );
};

export default ChatRooms;
