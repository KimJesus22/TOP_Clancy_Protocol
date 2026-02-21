import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import DemaRadioPlayer from "./components/DemaRadioPlayer";
import ThemeApplier from "./components/ThemeApplier";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clancy Protocol",
  description: "Twenty One Pilots Clancy aesthetic starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable}`}>
        <ThemeApplier />
        {children}
        <DemaRadioPlayer />
      </body>
    </html>
  );
}
