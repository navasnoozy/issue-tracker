import { Status } from "@/prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "orange" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "orange" },
  CLOSED: { label: "Closed", color: "green" },
};

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge className="w-fit mb-2" color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default StatusBadge;
