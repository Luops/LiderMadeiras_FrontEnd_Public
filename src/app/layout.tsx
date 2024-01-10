// CSS
import "./globals.css";

// Components
import Head from "./head";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

// Provider
import { Providers } from "../store/provider";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <Head />
      <body className="h-screen flex flex-col items-center justify-between bg-gradient-to-r from-[#fe902203] to-orange-50 font-mont">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
