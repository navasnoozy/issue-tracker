import { Status } from "@/prisma/client";
import { Card, Flex, Grid, Text } from "@radix-ui/themes";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  statusCount: {
    open: number;
    inProgress: number;
    closed: number;
  };
}

const IssueSummary = async ({
  statusCount: { open, inProgress, closed },
}: Props) => {
  const summaryCards: {
    label: string;
    count: number;
    status: Status;
    className: string;
    icon: ReactNode
  }[] = [
    {
      label: "Open",
      count: open,
      status: "OPEN",
      className: "bg-red-200",
      icon: <AlertCircle className="text-red-500" size={18} />,
    },
    {
      label: "In Progress",
      count: inProgress,
      status: "IN_PROGRESS",
      className: "bg-yellow-200",
      icon: <Clock className="text-yellow-600" size={18} />
    },
    {
      label: "Closed",
      count: closed,
      status: "CLOSED",
      className: "bg-green-200",
      icon: <CheckCircle className="text-green-600" size={18} />
    },
  ];

  return (
    <Grid columns={{sm:'3'}} gap="2" justify={"between"}>
      {summaryCards.map((card) => (
        <Link key={card.status} href={`/issues?status=${card.status}`}>
          <Card className={card.className} >
            <Flex gap="2" align={"center"} wrap='nowrap'>
                <Text> {card.icon}</Text>
              <Text as="div" size="2" weight="bold" wrap='nowrap' >
               {card.label}
              </Text>
              <Text className="w-8 h-8 border bg-white border-gray-200 rounded-full flex items-center justify-center">
                {card.count}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Grid>
  );
};

export default IssueSummary;
