import { Providers } from "../redux/provider";

import { ChakraProviders } from "./providers";

import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/index";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chattr App",
  description: "A simple blog application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ChakraProviders>
            <Navbar />
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                success: {
                  style: {
                    background: 'green',
                    color: 'white'
                  }
                },
                error: {
                  style: {
                    background: '#ab0000',
                    color: 'white'
                  }
                }
              }} 
            />
          </ChakraProviders>
        </Providers>
      </body>
    </html>
  );
}
