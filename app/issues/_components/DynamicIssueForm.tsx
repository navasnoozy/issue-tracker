//app/issue/_components/ DynamicIssueForm.tsx file
"use client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./IssueFormSkeleton";
import { Issue } from "@/prisma/client";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const DynamicIssueForm = ({issue}:{issue?: Issue}) => {
  return <IssueForm issue={issue} />
};

export default DynamicIssueForm;