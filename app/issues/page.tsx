import prisma from '@/lib/prisma'
import { Issue, Status } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import NextLink from "next/link";
import Pagination from "../components/Pagination";
import IssueStatusFilter from "./_components/IssueStatusFilter";
import IssueTable from "./IssueTable";
import { Metadata } from "next";


interface Props {
  searchParams: Promise<{
    status: Status;
    sort: keyof Issue;
    direction: "asc" | "desc";
    page: string;
  }>;
}



//Issue Table List Page
const IssuesPage = async ({ searchParams }: Props) => {
  const { status, page } = await searchParams;
  const itemsPerPage = 10;
  const pageNumber = parseInt(page) || 1;

  //Filter by Status
  const filterByStatusValue = Object.values(Status).includes(status)
    ? status
    : undefined;

  const issueCount = await prisma.issue.count({
    where: {
      status: filterByStatusValue,
    },
  });

  return (
    <div className="space-y-5 max-w-7xl w-[100%] ">
      <Flex justify={"between"}>
        <IssueStatusFilter />
        <Button>
          <NextLink href={"/issues/addnewissue"}>Create Issue</NextLink>
        </Button>
      </Flex>

      <IssueTable
        searchParams={searchParams}
        filterByStatusValue={filterByStatusValue}
      />

      <Pagination
        currentPage={pageNumber}
        itemsPerPage={itemsPerPage}
        itemCount={issueCount}
      />
    </div>
  );
};

export const metadata : Metadata = {
  title: 'Issue Tracker - List of Issues',
  description: 'Table List of created Issues'
}

export default IssuesPage;

export const dynamic = "force-dynamic";
