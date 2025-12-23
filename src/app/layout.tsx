import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/query-provider";
import LayoutWrapper from "./component/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KPI Total - Digital Marketing Agency",
  description:
    "We help you reach from zero to millions with innovative digital strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
