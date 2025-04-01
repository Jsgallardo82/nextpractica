import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BootstrapProvider from "./BootstrapProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chat de fca",
  description: "Chatea con tus compañeros",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BootstrapProvider>
          {children}
        </BootstrapProvider>
      </body>
    </html>
  );
}
