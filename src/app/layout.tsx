import type { Metadata } from "next";
import { Oswald, Poppins, Roboto_Condensed } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/conponents/shared/Navbar";
import StoreProvider from "@/redux/features/StoreProvider";
import Footer from "@/conponents/shared/Footer";

const roboto = Roboto_Condensed({
  subsets: ["latin"], // FIXED (cyrillic not needed)
  variable: "--font-condensed",
});

const oswald = Oswald({
  subsets: ["latin"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body className={`${poppins.variable} font-sans antialiased bg-white text-black`}>
        
        {/* ✅ Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
        >
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TZN9B5MW');
          `}
        </Script>

        {/* ✅ GTM NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TZN9B5MW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <StoreProvider>
          {children}
        </StoreProvider>

      </body>
    </html>
  );
}