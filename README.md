# Issue Tracker

This is an **Issue Tracker** application built with Next.js, designed to **manage and track issues** efficiently. and a real-time **ChatRoom** feature for team collaboration. The app supports user authentication, issue creation, management, and team communication with a clean and responsive UI.

## Features



- User authentication with Google, GitHub, and custom credentials
- Email verification for new users
- Create, edit, and delete issues
- Filter, sorting and pagination of issues
- Dashboard with issue summaries and charts
- **Real-time chat functionality** for team communication
- **Multiple chat rooms** with create and join capabilities
- Responsive design for mobile and desktop
- Error monitoring with Sentry

### Custom Server

This project uses a custom server implementation that can function as both a Next.js server and a Socket.IO server. The server dynamically switches between handling HTTP requests and WebSocket connections as needed:

- When a WebSocket connection is initiated, it provides real-time communication for the chat functionality
- This unified approach eliminates the need to run separate servers for the web application and chat features

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm, yarn, pnpm, or bun (choose one package manager)
- A PostgreSQL database (configured with Prisma)
- Built in Next.js 15
- Socket.IO for real-time communication

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

## Chat Room Feature

The new ChatRoom feature allows teams to communicate in real-time while working on issues:

- Create and join multiple chat rooms
- Real-time messaging using Socket.IO
- Responsive chat interface for both desktop and mobile

## Folder Structure

Here is the folder structure of the project:

```
issuetracker/
    └── 📁app
        └── .DS_Store
        └── 📁api
            └── 📁auth
                └── .DS_Store
                └── 📁[...nextauth]
                    └── route.ts
                └── route.ts
            └── 📁issue
                └── route.ts
            └── 📁users
                └── 📁[id]
                    └── route.ts
                └── 📁emailVerification
                    └── route.ts
                └── route.ts
        └── 📁auth
            └── authOptions.ts
            └── AuthProvider.tsx
            └── 📁components
                └── SendMail.tsx
                └── SigningForm.tsx
                └── SignupForm.tsx
                └── VerifyEmail.tsx
                └── verifyEmailTemplate.js
            └── loading.tsx
            └── page.tsx
            └── 📁verify-Email
                └── page.tsx
``` 
 
 
### Chat Room Structure

```
└── 📁chatroomapp
    └── ChatApp.tsx                 # Main chat application component
    └── 📁components
        └── 📁chatContext           # Context for global chat state
            └── ChatContextProvider.tsx
        └── ChatRooms.tsx           # List of available chat rooms
        └── CreateRoomForm.tsx      # Form to create new chat rooms
        └── 📁elements              # Reusable UI elements
            └── CloseButton.tsx
            └── NoAccess.tsx
        └── Messages.tsx            # Message display component
        └── PopoverProvider.tsx     # Popover UI component
    └── 📁Interface                 # Chat UI components
        └── ChatBody.tsx            # Message display area
        └── ChatFooter.tsx          # Message input area
        └── ChatNavbar.tsx          # Chat navigation bar
```
      
```
        └── 📁components
            └── .DS_Store
            └── AuthButton.tsx
            └── CustomLink.tsx
            └── ErrorMessage.tsx
            └── issueStatusBadge.tsx
            └── 📁navbar
                └── Logoicon.tsx
                └── MobileMenu.tsx
                └── NavBar.tsx
                └── NavLinks.tsx
                └── UserProfile.tsx
            └── Pagination.tsx
            └── SelectStatus.tsx
            └── SimpleMDETextField.tsx
        └── 📁dashboard
            └── IssueChart.tsx
            └── IssueSummary.tsx
            └── LatestIssues.tsx
        └── 📁dummyData
            └── 📁deleteall
                └── page.tsx
            └── 📁seed
                └── page.tsx
        └── globals.css
        └── 📁hooks
            └── userUser.ts
            └── useUsers.ts
        └── 📁issues
            └── 📁_components
                └── DynamicIssueForm.tsx
                └── IssueForm.tsx
                └── IssueFormSkeleton.tsx
                └── IssueStatusFilter.tsx
                └── SelectAssignee.tsx
            └── 📁[id]
                └── DeleteButton.tsx
                └── 📁edit
                    └── loading.tsx
                    └── page.tsx
                └── editButton.tsx
                └── IssueDetailsPage.tsx
                └── loading.tsx
                └── page.tsx
            └── 📁addnewissue
                └── loading.tsx
                └── page.tsx
            └── IssueTable.tsx
            └── loading.tsx
            └── page.tsx
        └── layout.tsx
        └── page.tsx
        └── QueryClientProvider.tsx
        └── validation.ts
    └── 📁lib
        └── prisma.ts
        └── socket.ts
    └── 📁prisma
        └── client.d.ts
        └── client.js
        └── default.d.ts
        └── default.js
        └── edge.d.ts
        └── edge.js
        └── index-browser.js
        └── index.d.ts
        └── index.js
        └── libquery_engine-darwin-arm64.dylib.node
        └── package.json
        └── 📁runtime
            └── edge-esm.js
            └── edge.js
            └── index-browser.d.ts
            └── index-browser.js
            └── library.d.ts
            └── library.js
            └── react-native.js
            └── wasm.js
        └── schema.prisma
        └── wasm.d.ts
        └── wasm.js
    └── 📁public
        └── favicon.ico
```

### Socket.IO Server Structure

```
└── 📁server
    └── server.ts                   # Socket.IO server entry point
    └── 📁socket
        └── 📁handlers              # Socket event handlers
            └── connectionHandler.ts # User connection handling
            └── messageHandler.ts    # Message handling
            └── roomHandler.ts       # Room operations handling
        └── 📁services              # Business logic services
            └── MessageFactory.ts    # Message creation service
            └── RoomService.ts       # Room management service
        └── socket.ts               # Socket.IO configuration
        ```


```
    └── 📁types
        └── chatContextType.ts
        └── messageType.ts
        └── socket.types.ts
    └── 📁utils
        └── getFormatTime.ts
        └── toastSettings.ts
    └── .DS_Store
    └── .env
    └── .gitignore
    └── eslint.config.mjs
    └── middleware.ts
    └── next-env.d.ts
    └── next.config.ts
    └── package-lock.json
    └── package.json
    └── postcss.config.mjs
    └── README.md
    └── tailwind.config.js
    └── tsconfig.json
    └── tsconfig.server.json
    ```

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Prisma Documentation](https://www.prisma.io/docs) - Learn about Prisma ORM
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction) - Learn about authentication in Next.js
- [Socket.IO Documentation](https://socket.io/docs/v4/) - Learn about real-time communication with Socket.IO
- [React Query Documentation](https://tanstack.com/query/v5/docs/react/overview) - Learn about data fetching in React

## Deployed on Render
