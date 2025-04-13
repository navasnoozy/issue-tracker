// app/page.tsx

import { Flex } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { prisma } from "@/prisma/client";
import IssueChart from "./IssueChart";

async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  const statusCount = {
    open: open,
    inProgress: inProgress,
    closed: closed,
  };

  return (
    <Flex width="100%" direction="column" gap="3" align={"center"}>
      <IssueSummary statusCount={statusCount} />
      <LatestIssues />
      <IssueChart statusCount={statusCount} />
    </Flex>
  );
}

export default Home;
