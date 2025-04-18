import generateTemplate from "@/app/auth/components/verifyEmailTemplate";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const user = await req.json();

  const token = await crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(token, 10);
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.verificationToken.create({
    data: {
      identifier: user.id,
      token: hashedToken,
      expires,
    },
  });

  const url = new URL("http://localhost:3000/auth/verify-Email");
  url.searchParams.append("token", token);
  url.searchParams.append("userId", user.id);
  const hmtlContent: string = generateTemplate(user.name, url);

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
    to: user.email,
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

  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: userId,
        token: record.token,
      },
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
