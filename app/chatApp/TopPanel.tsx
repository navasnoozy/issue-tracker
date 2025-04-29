import { Button, Flex } from "@radix-ui/themes";
import { CgCloseR } from "react-icons/cg";

interface Props {
  setCreateRoom: (value: boolean) => void;
  createRoom: boolean
}

const TopPanel = ({setCreateRoom,createRoom}:Props) => {
  return (
    <Flex justify={"between"}>
      <Button
        size="1"
        variant="ghost"
        onClick={() => setCreateRoom(!createRoom)}
      >
        {createRoom ? "Room List" : "Create New Room"}
      </Button>
      <CgCloseR className="text-purple-900" />
    </Flex>
  );
};

export default TopPanel;
