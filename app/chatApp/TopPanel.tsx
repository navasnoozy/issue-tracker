import { Button, Flex } from "@radix-ui/themes";
import { CgCloseR } from "react-icons/cg";

interface Props {
  showCreateRoomForm: ShowCreateRoomProps;
}

interface ShowCreateRoomProps {
  showCreateRoom: boolean;
  setShowCreateRoom: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopPanel = ({ showCreateRoomForm }: Props) => {
  const { showCreateRoom, setShowCreateRoom } = showCreateRoomForm;

  return (
    <Flex justify={"between"}>
      <Button
        size="1"
        variant="ghost"
        onClick={() => setShowCreateRoom(!showCreateRoom)}
      >
        {showCreateRoom ? "Room List" : "Create New Room"}
      </Button>
      <CgCloseR className="text-purple-900" />
    </Flex>
  );
};

export default TopPanel;
