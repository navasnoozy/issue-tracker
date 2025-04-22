// app/ issues/ [id]/edit/page. tsx file
import prisma from '@/lib/prisma'
import { notFound } from "next/navigation";
import DynamicIssueForm from "../../_components/DynamicIssueForm";
import { Props } from "../page";
import { Metadata } from "next";

// EDIT ISSUE
const IssueEditPage = async ({ params }: Props) => {
  const { id } = await params;

  if (!id) return "Invalid Id";

  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  if (!issue) {
    notFound();
  }

  return <DynamicIssueForm issue={issue} />;
};

export const metadata : Metadata = {
  title : 'Issue Tracker - Edit Issue'
}

export default IssueEditPage;
