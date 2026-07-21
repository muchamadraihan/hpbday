import type { Metadata } from "next";
import { Caveat, Poppins } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Selamat Ulang Tahun",
  description: "Ucapan ulang tahun spesial untukmu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${caveat.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}