import { Table, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import CustomLink from "../components/CustomLink";
import StatusBadge from "../components/issueStatusBadge";
import { Issue, Status } from "@prisma/client";
import prisma from '@/lib/prisma'
import { notFound } from "next/navigation";

interface Props {
  searchParams: Promise<{
    status: Status;
    sort: keyof Issue;
    direction: "asc" | "desc";
    page: string;
  }>;
  filterByStatusValue: Status | undefined
}

const IssueTable = async ({ searchParams, filterByStatusValue }: Props) => {
  const { status, sort, direction = "asc", page } = await searchParams;
  const itemsPerPage = 10;
  const pageNumber = parseInt(page) || 1;


    //Sorting
    const validDirections = ["asc", "desc"];
    const order = validDirections.includes(direction) ? direction : undefined;
    const orderBy = sort ? { [sort]: order } : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: filterByStatusValue,
    },
    orderBy,
    skip: itemsPerPage * (pageNumber - 1),
    take: 10,
  });

  const tableColTitles: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status" },
    {
      label: "Description",
      value: "description",
      className: "hidden md:table-cell",
    },
    { label: "Created", value: "createdAt" },
  ];
  
  

  if (!issues) notFound();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {tableColTitles.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  pathname: "issues",
                  query: {
                    status: status,
                    sort: column.value,
                    direction:
                      column.value && direction === "asc" ? "desc" : "asc",
                  },
                }}
                className="inline"
              >
                {column.label}
                {column.value !== sort && <FaSort className="inline" />}
                {column.value === sort &&
                  (order === "asc" ? (
                    <FaSortUp className="inline" />
                  ) : (
                    <FaSortDown className="inline" />
                  ))}
              </NextLink>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.length === 0 && (
          <Table.Row>
            <Table.Cell justify={"center"} colSpan={4}>
              {" "}
              <Text color="gray" weight="medium" align="center">
                {filterByStatusValue
                  ? `No issues found with status "${filterByStatusValue}"`
                  : "Issue list is empty"}
              </Text>
            </Table.Cell>
          </Table.Row>
        )}

        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.RowHeaderCell>
              <CustomLink href={`/issues/${issue.id}`}>
                {issue.title}
              </CustomLink>
            </Table.RowHeaderCell>

            <Table.Cell>
              <StatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.description.substring(0, 30)}....
            </Table.Cell>
            <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};


export default IssueTable;
