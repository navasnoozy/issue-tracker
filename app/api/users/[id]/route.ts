//api/users/[id]/route.ts file

import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Props) {
  const { id } = await params;

  if (!id)
    return NextResponse.json({ message: "Id not provided" }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}
