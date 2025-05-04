import getSocket from "@/lib/socket";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { ReactNode, useRef } from "react";
import { useChatContext } from "../chatContext/ChatContextProvider";
import { VisuallyHidden } from "radix-ui";

type CloseButtonProps = {
  children: ReactNode;
};

const CloseButton = ({ children }: CloseButtonProps) => {
  const { activeRoom, setActiveRoom, setShowCreateRoom, setIsOpen, portalRef } =
    useChatContext();
  const { data: session } = useSession();


  // Determine the type of action and related text based on current state
  const isInRoom = Boolean(activeRoom.roomname);
  const dialogTitle = isInRoom ? "Leave Room" : "Close Chat";
  const dialogDescription = isInRoom
    ? "Are you sure you want to leave this room?"
    : "Are you sure you want to close the chat?";

  const handleConfirm = () => {
    if (isInRoom) {
      // Handle leaving a room
      const socket = getSocket();
      socket?.emit("user-left", {
        roomname: activeRoom.roomname,
        session,
      });
      setActiveRoom({ roomname: null, userCount: null });
      setShowCreateRoom(false);
    } else {
      // Handle closing the chat window
      setIsOpen(false);
    }
  };

  return (
  
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button size="2" variant="outline" color="red">
            {children}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content
          align="center"
          maxWidth="300px"
          container={portalRef.current}
        >
          <AlertDialog.Title size="3">{dialogTitle}</AlertDialog.Title>
          <AlertDialog.Description size="2">
            {dialogDescription}
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="between">
            <AlertDialog.Cancel>
              <Button size="2" variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                size="2"
                variant="solid"
                color="red"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

  );
};

export default CloseButton;
