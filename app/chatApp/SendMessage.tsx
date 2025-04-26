import { Flex, TextField, Button } from '@radix-ui/themes'
import { IoMdSend } from 'react-icons/io'
import { MdMessage } from 'react-icons/md'

const SendMessage = () => {
  return (
    <Flex align="center" gap="2" width="100%">
    <TextField.Root
      style={{ flexGrow: 1 }}
      placeholder="Enter your message"
    >
      <TextField.Slot>
        <MdMessage />
      </TextField.Slot>
    </TextField.Root>
    <Button type="submit">
      <IoMdSend />
    </Button>
  </Flex>
  )
}

export default SendMessage