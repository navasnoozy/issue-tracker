//app/hooks/userUser.ts file

import { User } from "@/prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUser =  (id:string | null) =>
  useQuery({
    queryKey: ["user"],
    queryFn: () =>  axios.get<User>(`/api/users/${id}`).then((res) => res.data),
    staleTime: 60 * 1000, // 1 min,
    retry : 3,
    enabled:!!id
  });

  export default useUser;