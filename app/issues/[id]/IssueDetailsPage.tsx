import StatusBadge from "@/app/components/issueStatusBadge";
import { prisma } from "@/prisma/client";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

const IssueDetailsPage = ({ issue }: { issue: Issue }) => {
  return (
    <Card className=" w-[100%] lg:max-w-3xl  space-y-4">
      <Flex justify={"between"} className="flex-col md:flex-row">
        <Flex className="flex-col h-full gap-2 ">
          <Heading>{issue?.title}</Heading>
          <StatusBadge status={issue!.status} />
        </Flex>

        <Flex className="flex-col h-full ">
          <Text>
            <span className="text-gray-500">Created At :</span>{" "}
            {issue?.createdAt.toDateString()}
          </Text>
          <Text className="hidden md:block">
            <span className="text-gray-500">Upated At :</span>{" "}
            {issue?.updatedAt.toDateString()}
          </Text>
        </Flex>
      </Flex>

      <Card className="w-full mt-6 prose prose-sm md:prose-lg lg:prose-2xl  ">
        <Markdown skipHtml={false}>{issue?.description}</Markdown>
      </Card>
    </Card>
  );
};

export default IssueDetailsPage;
