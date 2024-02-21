import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyNest",
  description: "Grow and Study with us",
  icons: {
    icon: 'https://utfs.io/f/4a1a7965-aa35-4dfb-add7-48ae6657ae04-61yf8.png',
    apple: 'https://utfs.io/f/4a1a7965-aa35-4dfb-add7-48ae6657ae04-61yf8.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
              <ToastProvider />
              {children}
            </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
