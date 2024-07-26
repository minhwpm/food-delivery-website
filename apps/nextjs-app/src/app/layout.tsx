"use client";

import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from '@open-foody/redux-store';
import { Header } from "@open-foody/react-components"
import { SessionProvider } from "next-auth/react"
import { Poppins } from "next/font/google";
import "../index.scss"

const fontClass = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <title>Foodie</title>
        <meta name="description" content="Foodie - Food Delivery Web App" />
      </head>
      <body className={fontClass.className}>
        <StrictMode>
          <SessionProvider>
            <Provider store={store}>
              <Header />
              {children}
            </Provider>
          </SessionProvider>
        </StrictMode>
      </body>
    </html>
  );
}