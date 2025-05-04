//app/chatRoomApp/Interface/ChatNavbar.tsx

import { Button, Card, Flex } from "@radix-ui/themes";
import { AiOutlineHome } from "react-icons/ai";
import { useChatContext } from "../components/chatContext/ChatContextProvider";
import CloseButton from "../components/elements/CloseButton";

const ChatNavbar = () => {
  const { showCreateRoom, setShowCreateRoom, activeRoom } = useChatContext();

  if (activeRoom)
    return (
      <Card>
        <Flex justify={"between"}>
          <Flex align={"center"} className="text-green-500 gap-1">
            {" "}
            <AiOutlineHome />
            {activeRoom.toUpperCase()}
          </Flex>
          <Flex align={"center"} className="text-green-500">
            <CloseButton>Leave</CloseButton>
          </Flex>
        </Flex>
      </Card>
    );

  return (
    <Card>
      <Flex width={"100%"} height={"100%"} align={"center"} justify={"between"}>
        <Button
          size="2"
          variant="outline"
          onClick={() => setShowCreateRoom(!showCreateRoom)}
        >
          {showCreateRoom ? "Room List" : "New Room"}
        </Button>
        <CloseButton>Close</CloseButton>
      </Flex>
    </Card>
  );
};

export default ChatNavbar;
