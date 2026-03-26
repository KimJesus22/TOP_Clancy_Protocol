import type { Metadata } from "next";
import { Fira_Code, Inter, Noto_Sans_JP, Noto_Sans_KR } from "next/font/google";
import DemaRadioPlayer from "./components/DemaRadioPlayer";
import ThemeApplier from "./components/ThemeApplier";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  display: "swap",
  preload: false,
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
      <body
        className={`${inter.variable} ${firaCode.variable} ${notoSansKr.variable} ${notoSansJp.variable}`}
      >
        <a
          href="#main-content"
          className="skip-link"
        >
          Saltar al contenido principal
        </a>
        <ThemeApplier />
        {children}
        <DemaRadioPlayer />
      </body>
    </html>
  );
}
