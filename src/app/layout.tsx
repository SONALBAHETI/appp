import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

// Import stylesheets
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        {children}
        {/* This is a global container for toast, which is used in all pages */}
        <ToastContainer progressStyle={{ top: 0, bottom: "unset" }} />
      </body>
    </html>
  );
}
