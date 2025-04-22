//app/issues/[id]/page.tsx
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import prisma from '@/lib/prisma'
import AssigneeSelect from "../_components/SelectAssignee";
import DeleteButton from "./DeleteButton";
import IssueDetailsPage from "./IssueDetailsPage";
import EditButton from "./editButton";
import { cache } from "react";

export interface Props {
  params: Promise<{ id: string }>;
}

// fetching and caching issue, return promise not resolved
const fetchIssue = cache((issueId: string) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const session = await getServerSession();
  const authenticated = !!session;

  //resolving promise
  const issue = await fetchIssue(id);

  if (!issue) notFound();

  return (
    <Grid
    className="mx-auto w-full max-w-7xl place-items-center px-4 gap-6"
    columns={{ md: "4fr 1fr" }}
  >
      <Box className=" w-[100%] lg:max-w-3xl  space-y-4">
        <IssueDetailsPage issue={issue} />
      </Box>
      <Flex direction="column" gap="4" className="w-full max-w-xs">
  <AssigneeSelect issue={issue} />
  <EditButton id={issue.id} session={authenticated} />
  <DeleteButton issueId={issue.id} session={authenticated} />
</Flex>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchIssue(id);

  return {
    title: issue?.title,
    description: "Details of " + issue?.title,
  };
}

export default Page;
