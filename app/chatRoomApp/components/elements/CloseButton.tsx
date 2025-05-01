import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React, { ReactNode } from "react";
import { CgCloseR } from "react-icons/cg";
import { useChatContext } from "../chatContext/ChatContextProvider";
import { MdDeleteForever } from "react-icons/md";
import getSocket from "@/lib/socket";

const CloseButton = ({children}:{children: ReactNode}) => {
  const { isOpen, currentRoom } = useChatContext();

  const handleClick = () => {
         if (currentRoom){
            const socket = getSocket ();
            socket?.emit('user-left',{})
         }
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button size='2' variant="outline" color="red">{children}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="250px" className="!fixed bottom-[40vh] right-18 ">
      <AlertDialog.Title>Leave room?</AlertDialog.Title>
      

        <Flex gap="3" mt="4" justify="between">
          <AlertDialog.Cancel>
            <Button size='2' variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button size='2' variant="solid" color="red">
              Leave
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default CloseButton;
