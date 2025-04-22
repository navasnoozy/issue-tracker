import { User } from "@/prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUsers =  () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () =>  axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 1 min,
    retry : 3
  });

  export default useUsers;
