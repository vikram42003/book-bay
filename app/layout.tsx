import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/stores/storeProvider";
import Navbar from "@/components/Navbar";
import UserHydration from "@/components/UserHydration";


const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
});


export const metadata: Metadata = {
  title: "Book Bay - An online book marketplace",
  description: "Its like Ebay but for books!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} antialiased min-h-screen bg-blue-50`}>
        <StoreProvider>
          <UserHydration />
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
