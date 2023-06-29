import { Providers } from "../redux/provider";

import { ChakraProviders } from "./providers";

import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <ToastContainer />
          </ChakraProviders>
        </Providers>
      </body>
    </html>
  );
}
