import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import Header from "@/components/Header/Header";
import CommonClient from "./CommonClient";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { SignupContextProvider } from "@/contexts/SignupContext";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <AuthContextProvider>
          <SignupContextProvider>
            <Header />
            {children}
            <CommonClient />
          </SignupContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
