// app/validation.ts file
import { Status } from "@/prisma/client";
import { z } from "zod";

export const baseIssueSchema = z.object({
  id: z.string().max(255).optional(),
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(2000),
  status: z.enum(Object.values(Status) as [Status]),
});

export const patchIssueSchema = z.object({
  id: z.string().max(255),
  title: z.string().min(1, "Title is required2").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required2")
    .max(2000)
    .optional(),
  status: z.enum(Object.values(Status) as [Status]).optional(),
  assignToUserId: z
    .string()
    .min(1, "A Valid user id is required to assign")
    .max(255)
    .optional()
    .nullable(),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, "Enter a valid name").max(20).optional(),
    email: z.string().email("Enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        "Password must contain at least one letter and one number"
      ),
    confirmPassword: z.string().min(6, ""),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export const signinSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

export type signUpSchemaType = z.infer<typeof signupSchema>;
export type signInSchemaType = z.infer<typeof signinSchema>;
export type IssueFormType = z.infer<typeof baseIssueSchema>;
