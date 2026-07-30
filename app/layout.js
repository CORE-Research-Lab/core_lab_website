import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "CORE Lab",
    template: "%s | CORE Lab",
  },
  description: "Computing education research at the University of Toronto and partner institutions.",
};

export const viewport = {
  themeColor: "#0b3a72",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} flex min-h-screen flex-col bg-white text-slate-900 antialiased`}
      >
        <a
          href="#main"
          className="sr-only rounded-lg bg-brand px-4 py-2 font-medium text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <Navbar />
        {/* grow keeps the footer at the bottom on short pages such as 404 */}
        <main id="main" className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
