import getSocket from "@/lib/socket";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { useChatContext } from "../chatContext/ChatContextProvider";

const CloseButton = ({ children }: { children: ReactNode }) => {
  const { isOpen, activeRoom,setActiveRoom,setShowCreateRoom } = useChatContext();
  const { data: session } = useSession();
  const useremail = session?.user?.email;

  const alertDialog = activeRoom ? "Leave room" : "Are you want to Close";

  const handleClick = () => {
    const socket = getSocket();
    setActiveRoom(null);
    setShowCreateRoom(false)
    if (activeRoom) {
      socket?.emit("user-left", { activeRoom, useremail });
    }
    socket?.disconnect();
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button size="2" variant="outline" color="red">
          {children}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content
        maxWidth="250px"
        className="!fixed bottom-[40vh] right-18 "
      >
        <AlertDialog.Title size="3">{alertDialog}</AlertDialog.Title>

        <Flex gap="3" mt="4" justify="between">
          <AlertDialog.Cancel>
            <Button size="2" variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button size="2" variant="solid" color="red" onClick={handleClick}>
              Confirm
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default CloseButton;
