"use client";

import { Status } from "@/prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const handleChange = (status: string) => {
    const params = new URLSearchParams();

    if (status) {
      params.append("status", status);
    }
    if (searchParams.has("sort")) {
      params.append("sort", searchParams.get("sort")!);
      params.append("direction", searchParams.get("direction")!);
    }

    const query = params.size? '?'+ params.toString():'';
    router.push("/issues" + query);
  };

  return (
    <Select.Root defaultValue={searchParams.get('status')||'ALL'} onValueChange={handleChange}>
      <Select.Trigger placeholder="Filter by Status" />
      <Select.Content>
        {status.map((status) => (
          <Select.Item key={status.label} value={status.value || "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
