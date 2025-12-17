import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@css/reset.scss";
import "@css/globals.css";
import AOSProvider from "./provider/AOSProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abravanel",
  description: "Abravanel",
  icons: {
    icon: [
      { url: './favicon.png', sizes: '32x32', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="./favicon.png" type="image/png" sizes="32x32" />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AOSProvider>{children}</AOSProvider>
      </body>
    </html>
  );
}
