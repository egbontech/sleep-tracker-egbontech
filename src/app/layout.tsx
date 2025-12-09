import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";


const poppins = Poppins({
  variable:"--font-poppins",
  subsets:["latin"],
  weight:["300","400","500","600","700"]
})

export const metadata: Metadata = {
  title: "Modern Sleep Tracker",
  description: "Modern sleep tracker EgbonTech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.className} antialiased bg-[#0f172a]`}
      >
        {children}
      </body>
    </html>
  );
}