import type { Metadata } from "next";
import { Oswald, Poppins, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/conponents/shared/Navbar";
import StoreProvider from "@/redux/features/StoreProvider";
import Footer from "@/conponents/shared/Footer";

const roboto = Roboto_Condensed({
  subsets: ["cyrillic"],
  variable: "--font-condensed",
});

const oswald = Oswald({
  subsets: ["cyrillic"],
  variable: "--font-condensed",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Play Picker",
  description: "This is the best sports editing site",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased bg-white text-black`}
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
