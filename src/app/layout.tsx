import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers/Providers";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@mui/material/Container";

import "./globals.css";

import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home Page",
  description: "Tech test task home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <Container maxWidth="lg" sx={{ padding: "3rem" }}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
