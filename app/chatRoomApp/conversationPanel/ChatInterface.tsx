import Messages from "./Messages";
import SendMessage from "./SendMessage";


interface Props {
  roomname: string;
}

const ChatInterface = ({roomname}:Props) => {
  return (
    <>
      <Messages />
      <SendMessage roomname={roomname} />
    </>
  );
};

export default ChatInterface;
