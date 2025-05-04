import getSocket from "@/lib/socket";
import { Button, Card, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { useChatContext } from "./chatContext/ChatContextProvider";
import { Response } from "./CreateRoomForm";

const ChatRooms = () => {
  const { data: session } = useSession();
  const { setActiveRoom, setShowCreateRoom, roomsList, setRoomsList } =
    useChatContext();

  const socket = getSocket();

  const handleClick = (roomname: string, userCount: number) => {
    socket?.emit("createRoom", { roomname, session }, (res: Response) => {
      if (res.success) {
        toast.success(res.statusText);
        setActiveRoom({ roomname, userCount });
        setShowCreateRoom(false);
      } else {
        toast.error(res.statusText);
      }
    });
  };

  useEffect(() => {
    socket?.on("getRoomsList", (roomlistWithUsers: []) => {
      setRoomsList(roomlistWithUsers);
    });
  }, []);

  return (
    <>
      Chat rooms
      {roomsList.map((room: [string, number]) => {
        const [name, count] = room;
        return (
          <Card
            key={name}
            className="!flex !justify-between !items-center !text-gray-500 !gap-2"
          >
            <Flex
              width={"130px"}
              wrap={"nowrap"}
              className="!items-center !gap-2"
            >
              <AiOutlineHome />
              {name}
            </Flex>
            <Flex className="!justify-between !items-center !gap-2">
              <HiOutlineUsers />
              {count}
            </Flex>

            <Button
              size="2"
              variant="soft"
              onClick={() => handleClick(name, count)}
            >
              Join
            </Button>
          </Card>
        );
      })}
    </>
  );
};

export default ChatRooms;
