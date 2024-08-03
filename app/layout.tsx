import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import {cn} from '@/lib/utils'
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Nunito_Sans({ 
  subsets: ["latin"],
  weight: ['300','400','500','600','700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "Med Scheduler",
  description: "A hospital appointment application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
