// app/page.tsx

import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./dashboard/IssueSummary";
import LatestIssues from "./dashboard/LatestIssues";
import { prisma } from "@/prisma/client";
import IssueChart from "./dashboard/IssueChart";
import { Metadata } from "next";

async function Home() {
  let open = 0;
  let inProgress = 0;
  let closed = 0;

  try {
    [open, inProgress, closed] = await Promise.all([
      prisma.issue.count({ where: { status: "OPEN" } }),
      prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
      prisma.issue.count({ where: { status: "CLOSED" } }),
    ]);
  } catch (error) {
    console.error("Failed to fetch issue counts:", error);
    // The default 0s will be used
  }
  // Fallback to default values if the counts are not available

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
