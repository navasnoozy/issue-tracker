//app/layout.tsx
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar/NavBar";
import AuthProvider from "./auth/AuthProvider";
import QueryClientProvider from "./QueryClientProvider";
import ChatWidget from "./chatApp/ChatWidget";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} inter `}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="violet" radius="small">
              <div className="container mt-2 rounded-md justify-self-center">
                <NavBar />
                <main className="p-6 flex justify-center ">
                  <div className="max-w-7xl flex justify-center w-[100%] pb-6   ">
                    {children}
                  </div>
                </main>
              </div>
              <ChatWidget />
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Create and Track Issues",
};
