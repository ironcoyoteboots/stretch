// app/layout.tsx
"use client";

import Header from "../components/Header";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Header />
        {children}
      </body>
    </html>
  );
}