import prisma from "@/lib/prisma";
import { Card } from "@radix-ui/themes";

interface Props {
  searchParams : Promise <{password:string}>
}

const DeleteData = async ({searchParams}:Props) => {

  const {password} = await searchParams
  
  if (parseInt(password) !== 1234){
      return <Card className="bg-green-400"> No access , enter password </Card>;
  }
  


  try {
    await prisma.issue.deleteMany();
    await prisma.user.deleteMany();
    return <Card className="bg-green-400"> All data deleted </Card>;
  } catch (error) {
    console.log("Error while deleting data", error);
    return <Card className="bg-red-400"> Error while deleting data </Card>;
  }
};

export default DeleteData;
