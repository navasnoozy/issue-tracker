// Prisma seed data (e.g., in prisma/seed.ts)
import prisma from "@/lib/prisma";
import { Card } from "@radix-ui/themes";

interface Props {
  searchParams : Promise <{password:string}>
}

async function Main({searchParams}:Props) {

  const {password} = await searchParams
  
  if (parseInt(password) !== 1234){
      return <Card className="bg-green-400"> No access , enter password </Card>;
  }

  try {
   await prisma.issue.createMany({
      data: [
        {
          title: "Login page fails on invalid credentials",
          description:
            "Users are not shown an error message when incorrect credentials are submitted.",
          status: "OPEN",
          createdAt: new Date("2024-11-01T10:30:00Z"),
        },
        {
          title: "Dashboard loading time is too slow",
          description:
            "The main dashboard takes over 5 seconds to load, affecting user experience.",
          status: "IN_PROGRESS",
          createdAt: new Date("2024-11-02T09:45:00Z"),
        },
        {
          title: "Email notifications not being sent",
          description:
            "Transactional emails are not reaching users after signup.",
          status: "OPEN",
          createdAt: new Date("2024-11-03T15:00:00Z"),
        },
        {
          title: "Fix typo in signup confirmation page",
          description: "The word 'successful' is misspelled as 'succesful'.",
          status: "CLOSED",
          createdAt: new Date("2024-11-04T12:00:00Z"),
        },
        {
          title: "Add password reset functionality",
          description:
            "Users should be able to reset forgotten passwords via email.",
          status: "IN_PROGRESS",
          createdAt: new Date("2024-11-05T11:15:00Z"),
        },
        {
          title: "Search feature not returning accurate results",
          description: "Product search sometimes returns unrelated items.",
          status: "OPEN",
          createdAt: new Date("2024-11-06T13:45:00Z"),
        },
        {
          title: "Broken image links on product page",
          description:
            "Several product images fail to load due to incorrect paths.",
          status: "CLOSED",
          createdAt: new Date("2024-11-07T14:20:00Z"),
        },
        {
          title: "Implement dark mode toggle",
          description: "Add a button to switch between light and dark themes.",
          status: "OPEN",
          createdAt: new Date("2024-11-08T16:00:00Z"),
        },
        {
          title: "Fix 404 error on user profile page",
          description: "Navigating to /profile sometimes returns a 404 error.",
          status: "IN_PROGRESS",
          createdAt: new Date("2024-11-09T17:30:00Z"),
        },
        {
          title: "Audit trail logs not saving",
          description:
            "Changes made by admins aren't reflected in the audit log.",
          status: "OPEN",
          createdAt: new Date("2024-11-10T08:50:00Z"),
        },
        {
          title: "Support exporting reports to Excel",
          description: "Allow users to download sales reports in .xlsx format.",
          status: "CLOSED",
          createdAt: new Date("2024-11-11T10:10:00Z"),
        },
        {
          title: "User avatar upload not working",
          description: "Image uploads return a 500 internal server error.",
          status: "OPEN",
          createdAt: new Date("2024-11-12T14:40:00Z"),
        },
        {
          title: "Fix validation on phone number input",
          description: "Phone number field accepts invalid characters.",
          status: "IN_PROGRESS",
          createdAt: new Date("2024-11-13T12:20:00Z"),
        },
        {
          title: "Add loading indicator to form submission",
          description: "Users are unsure if their form was submitted.",
          status: "CLOSED",
          createdAt: new Date("2024-11-14T11:30:00Z"),
        },
        {
          title: "Optimize image sizes for faster loading",
          description: "Large images affect mobile load speed.",
          status: "IN_PROGRESS",
          createdAt: new Date("2024-11-15T09:00:00Z"),
        },
        {
          title: "Allow users to delete their accounts",
          description: "Implement GDPR-compliant account deletion.",
          status: "OPEN",
          createdAt: new Date("2024-11-16T08:30:00Z"),
        },
        {
          title: "Fix date formatting on invoices",
          description: "Dates show in US format even for EU users.",
          status: "CLOSED",
          createdAt: new Date("2024-11-17T10:20:00Z"),
        },
        {
          title: "Add two-factor authentication support",
          description:
            "Improve account security by supporting 2FA via SMS or authenticator apps.",
          status: "IN_PROGRESS",
          createdAt: new Date("2024-11-18T14:10:00Z"),
        },
        {
          title: "Broken pagination in admin panel",
          description: "Navigating to next pages doesn't update results.",
          status: "OPEN",
          createdAt: new Date("2024-11-19T13:55:00Z"),
        },
        {
          title: "Create monthly performance report",
          description:
            "Generate downloadable analytics for users’ monthly activity.",
          status: "CLOSED",
          createdAt: new Date("2024-11-20T12:05:00Z"),
        },
        {
          title: "Fix logout not clearing session",
          description:
            "After logout, users can still access restricted routes.",
          status: "OPEN",
          createdAt: new Date("2024-11-21T16:35:00Z"),
        },
        {
          title: "Add multi-language support",
          description: "Start with English and Spanish translations.",
          status: "IN_PROGRESS",
          createdAt: new Date("2024-11-22T08:40:00Z"),
        },
        {
          title: "Fix incorrect tax calculation",
          description: "Tax is applied twice in certain edge cases.",
          status: "CLOSED",
          createdAt: new Date("2024-11-23T10:00:00Z"),
        },
        {
          title: "Footer links not redirecting properly",
          description: "Terms and Privacy links lead to 404 pages.",
          status: "OPEN",
          createdAt: new Date("2024-11-24T14:15:00Z"),
        },
        {
          title: "Implement feature flag system",
          description: "Allow toggling features on/off via config.",
          status: "IN_PROGRESS",
          createdAt: new Date("2024-11-25T11:10:00Z"),
        },
        {
          title: "Fix currency symbol mismatch",
          description: "Price shows $ instead of ₹ for Indian users.",
          status: "OPEN",
          createdAt: new Date("2024-11-26T09:45:00Z"),
        },
        {
          title: "Add comments feature on blog posts",
          description: "Users should be able to leave feedback under posts.",
          status: "IN_PROGRESS",
          createdAt: new Date("2024-11-27T13:30:00Z"),
        },
        {
          title: "Update outdated dependencies",
          description: "Several packages are showing security vulnerabilities.",
          status: "CLOSED",
          createdAt: new Date("2024-11-28T17:05:00Z"),
        },
        {
          title: "Fix mobile nav menu toggle issue",
          description: "Menu doesn't close after link click on small screens.",
          status: "IN_PROGRESS",
          createdAt: new Date("2024-11-29T12:50:00Z"),
        },
        {
          title: "Add API rate limiting",
          description: "Prevent abuse of public endpoints.",
          status: "OPEN",
          createdAt: new Date("2024-11-30T14:20:00Z"),
        },
        {
          title: "Fix content overlap on smaller screens",
          description: "Buttons overlap text in mobile view.",
          status: "IN_PROGRESS",
          createdAt: new Date("2024-12-01T10:40:00Z"),
        },
      ],
    });

    await prisma.user.createMany({
      data: [
        {
          name: "Alice Johnson",
          email: "alice.johnson@example.com",
        },
        {
          name: "Bob Martinez",
          email: "bob.martinez@example.com",
        },
        {
          name: "Carla Nguyen",
          email: "carla.nguyen@example.com",
        },
        {
          name: "David Thompson",
          email: "david.thompson@example.com",
        },
      ]
    });
    

    console.log("Seed completed.");

    return <Card className="bg-green-400"> Dummy data seeding success </Card>
  } catch (error) {
    console.log("Error while seeding dummy data",error);
    return <Card className="bg-red-400"> Error while seeding dummy data </Card>
  }
};


export default Main;
