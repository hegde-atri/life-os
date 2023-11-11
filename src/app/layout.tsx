import "~/styles/globals.css";

import { Lustria } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "./providers";

const lustria = Lustria({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Life OS",
  description: "Play our life",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${lustria.className}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Providers>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
