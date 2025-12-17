import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@css/reset.scss";
import "@css/globals.css";
import AOSProvider from "./provider/AOSProvider";
import Menu from "./_component/menu";
import FooterNav from "./_component/footerNav";

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
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AOSProvider>
          <div className="layout-wrapper">
            
            <header>
                <Menu/>
            </header>

            <main>
              {children}
            </main>

            <footer>
              <FooterNav />
            </footer>

          </div>
        </AOSProvider>
      </body>
    </html>
  );
}