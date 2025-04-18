// app/page.tsx

import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./dashboard/IssueSummary";
import LatestIssues from "./dashboard/LatestIssues";
import { prisma } from "@/prisma/client";
import IssueChart from "./dashboard/IssueChart";
import { Metadata } from "next";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="3" width={"100%"}>
      <Flex direction="column" gap="3" height="100%">
        <IssueSummary statusCount={statusCount} />
        <IssueChart statusCount={statusCount} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Summary of created Issues",
};

export default Home;
