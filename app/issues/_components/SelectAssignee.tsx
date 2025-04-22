//app/issues/_components/selectAssignee.tsx
"use client";
import useUsers from "@/app/hooks/useUsers";
import { Issue } from "@/prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error } = useUsers();
  const {status} = useSession ()



  const toastOptions = {
    style: {
      border: "1px solid rgba(255, 0, 0, 1)",
      padding: "16px",
    },
  };

  if (error || status === 'unauthenticated') return null;

  const handleChange = async (userId: string) => {
    const assignToUserId = userId === "unassigned" ? null : userId;
    await axios
      .patch("/api/issue", { id: issue.id, assignToUserId }).then(()=>toast('Saved'))
      .catch(() => toast("Change could not be saved"));
  };

  return (
    <>
      <Toaster toastOptions={toastOptions} />
      <Select.Root
        size="3"
        defaultValue={issue.assignToUserId ?? undefined}
        onValueChange={handleChange}
      >
        <Select.Trigger  placeholder="Assign" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggetions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeSelect;
