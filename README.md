# Issue Tracker

This is an **Issue Tracker** application built with Next JS, designed to manage and track issues efficiently. It supports user authentication, issue creation, and management with a clean and responsive UI.

## Features

- User authentication with Google, GitHub, and custom credentials.
- Email verification for new users.
- Create, edit, and delete issues.
- Filter, Sorting and paginate issues.
- Dashboard with issue summaries and charts.
- Responsive design for mobile and desktop.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm, yarn, pnpm, or bun (choose one package manager)
- A PostgreSQL database (configured with Prisma)
- Built in Next JS 15
- Added Sentry for Error monitoring

### Installation

1. Clone the repository:

   ```bash
   git clone hgit@github.com:navasnoozy/issue-tracker.git
   cd issuetracker
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_BASE_URL=base url
   DATABASE_URL=your_database_url
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_ID=your_github_id
   GITHUB_SECRET=your_github_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   SMTP_MAIL=smtp provider username
   SMTP_PASSWORD=smtp provider password
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Folder Structure

Here is the folder structure of the project:

```
issuetracker/
├── .gitignore
├── .github/
│   └── workflows/
│       └── deploy.yml
├── README.md
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── issue/
│   │   │   └── route.ts
│   │   └── users/
│   │       ├── [id]/
│   │       │   └── route.ts
│   │       └── emailVerification/
│   │           └── route.ts
│   ├── auth/
│   │   ├── components/
│   │   │   ├── SendMail.tsx
│   │   │   ├── SigningForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   ├── VerifyEmail.tsx
│   │   │   └── verifyEmailTemplate.js
│   │   ├── AuthProvider.tsx
│   │   ├── authOptions.ts
│   │   ├── loading.tsx
│   │   ├── page.tsx
│   │   └── verify-Email/
│   │       └── page.tsx
│   ├── components/
│   │   ├── AuthButton.tsx
│   │   ├── CustomLink.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── Pagination.tsx
│   │   ├── SelectStatus.tsx
│   │   ├── SimpleMDETextField.tsx
│   │   ├── issueStatusBadge.tsx
│   │   └── navbar/
│   │       ├── Logoicon.tsx
│   │       ├── MobileMenu.tsx
│   │       ├── NavBar.tsx
│   │       ├── NavLinks.tsx
│   │       └── UserProfile.tsx
│   ├── dashboard/
│   │   ├── IssueChart.tsx
│   │   ├── IssueSummary.tsx
│   │   └── LatestIssues.tsx
│   ├── globals.css
│   ├── global-error.tsx
│   ├── hooks/
│   │   ├── useUsers.ts
│   │   └── userUser.ts
│   ├── issues/
│   │   ├── _components/
│   │   │   ├── DynamicIssueForm.tsx
│   │   │   ├── IssueForm.tsx
│   │   │   ├── IssueFormSkeleton.tsx
│   │   │   ├── IssueStatusFilter.tsx
│   │   │   ├── SelectAssignee.tsx
│   │   └── addnewissue/
│   │       ├── loading.tsx
│   │       └── page.tsx
│   │   ├── [id]/
│   │       ├── DeleteButton.tsx
│   │       ├── IssueDetailsPage.tsx
│   │       ├── edit/
│   │       │   ├── loading.tsx
│   │       │   └── page.tsx
│   │       ├── editButton.tsx
│   │       ├── loading.tsx
│   │       └── page.tsx
│   │   ├── IssueTable.tsx
├── lib/
│   └── prisma.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   └── favicon.ico
├── styles/
│   └── globals.css
├── .env
├── next.config.js
├── package.json
└── tsconfig.json
```

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Prisma Documentation](https://www.prisma.io/docs) - Learn about Prisma ORM.
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction) - Learn about authentication in Next.js.

## Deployed on Render
