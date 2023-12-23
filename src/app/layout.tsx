import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";

// Import stylesheets
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scholarnetics",
  description: "Connecting learners with mentors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
        {/* This is a global container for toast, which is used in all pages */}
        <ToastContainer progressStyle={{ top: 0, bottom: "unset" }} />
      </body>
    </html>
  );
}
