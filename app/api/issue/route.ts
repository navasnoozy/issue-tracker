import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { baseIssueSchema, patchIssueSchema } from "../../validation";
import { Issue } from "@prisma/client";
import { getServerSession } from "next-auth";

type CustomError = {
  name?: string;
  error?: {
    code?: string;
  };
};

// CREATE ISSUE ////////
export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  try {
    const body = await req.json();


    const validate = baseIssueSchema.safeParse(body);


    if (!validate.success) {
      return NextResponse.json(validate.error.errors, { status: 400 });
    }

    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
      },
    });
    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(error.message);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
//////////////////////////////////////////////////////

//UPDATE ISSUE /////////
export async function PATCH(req: NextRequest) {
  // const session = await getServerSession();
  // if (!session) return NextResponse.json({}, { status: 401 });

  const body: Issue = await req.json();

  const validate = patchIssueSchema.safeParse(body);
  const { id, title, description, status, assignToUserId } = body;
  

  if (assignToUserId) {
    const user = await prisma.user.findUnique({
      where: { id:assignToUserId },
    });

    if (!user) return NextResponse.json({ error: "Invalid User Id" });
  }

  if (!validate.success)
    return NextResponse.json(validate.error.errors, { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: {
      id
    },
  });

  if (!issue) return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id:issue.id
    },
    data: {
      title,
      description,
      status,
      assignToUserId 
    },
  });

  return NextResponse.json(updatedIssue, {
    status: 200,
    statusText: "succsess",
  });
}
/////////////////////////////////////////////////////

//DELETE ISSUE //////
export async function DELETE(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      const error = new Error("No id Provided");
      error.name = "NO_ID";
      throw error;
    }

    const deletedIssue = await prisma.issue.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      message: "Issue Deleted Successfully",
      deletedIssue,
    });
  } catch (error) {
    const err = error as CustomError;

    if (err.name === "NO_ID")
      return NextResponse.json({ error: "No id Provided" }, { status: 404 });

    if (err?.error?.code === "P2025") {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
