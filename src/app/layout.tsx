"use client";

import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from '../store';
import Header from "src/components/Header/Header"
import { SessionProvider } from "next-auth/react"
import "../index.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="App">
      <head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <title>Foodie</title>
        <meta name="description" content="Foodie - Food Delivery Web App" />
      </head>
      <body>
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