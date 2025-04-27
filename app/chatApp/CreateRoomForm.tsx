import { TextField,Button } from "@radix-ui/themes"



const CreateRoomForm = () => {
  return (
   
    <>
     <TextField.Root placeholder="Enter room name" />
     <Button>Join</Button>
    </>
  )
}

export default CreateRoomForm