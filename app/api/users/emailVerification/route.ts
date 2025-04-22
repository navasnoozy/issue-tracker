import generateTemplate from "@/app/auth/components/verifyEmailTemplate";
import prisma from '@/lib/prisma'
import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { id, email } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  
  if (existingUser?.emailVerified) {
    return NextResponse.json(
      { message: "Email id already verified" }
    );
  }

  const token = await crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(token, 10);
  const expires = new Date(Date.now() + 60 * 60 * 1000);

//Delete old token if any
  await prisma.verificationToken.deleteMany({
    where: {
      identifier:id
    },
  });

  await prisma.verificationToken.create({
    data: {
      identifier: id,
      token: hashedToken,
      expires,
    },
  });

  

  const url = new URL("http://localhost:3000/auth/verify-Email");
  url.searchParams.append("token", token);
  url.searchParams.append("userId", id);
  const hmtlContent: string = generateTemplate(existingUser?.name, url);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const res = await transporter.sendMail({
    from: "issuetracker@gmail.com",
    to: email,
    subject: "Issue Tracker - verify your email id ✔",
    html: hmtlContent,
  });

  return NextResponse.json(res);
}

export async function PATCH(req: NextRequest) {
  const { userId, token } = await req.json();

  const record = await prisma.verificationToken.findFirst({
    where: {
      identifier: userId,
    },
  });

  if (!record)
    return NextResponse.json({ message: "No token found" }, { status: 404 });

  const isValidToken = await bcrypt.compare(token, record.token);

  if (!isValidToken)
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });

  if (new Date() > record.expires) {
    return NextResponse.json({ message: "Token expired" }, { status: 410 });
  }

  await prisma.verificationToken.deleteMany({
    where: {
      identifier:userId
    },
  });

  const verifiedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  if (!verifiedUser)
    return NextResponse.json(
      { message: "Verification failed, User not found" },
      { status: 404 }
    );

  return NextResponse.json(
    { message: "Verification Completed" },
    { status: 200 }
  );
}
