import { Flex, TextField, Button } from '@radix-ui/themes'
import { IoMdSend } from 'react-icons/io'
import { MdMessage } from 'react-icons/md'
import { useForm } from 'react-hook-form'

const SendMessage = () => {
  const {register} = useForm();

  

  

  return (
    <form >
    <Flex align="center" gap="2" width="100%">
    <TextField.Root
      style={{ flexGrow: 1 }}
      placeholder="Enter your message"
    >
      <TextField.Slot {...register('message')}>
        <MdMessage />
      </TextField.Slot>
    </TextField.Root>
    <Button type="submit">
      <IoMdSend />
    </Button>
  </Flex>
  </form>
  )
}

export default SendMessage