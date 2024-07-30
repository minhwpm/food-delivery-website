import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from '@open-foody/redux-store';
import { Header } from "@open-foody/react-components"
import { SessionProvider } from "next-auth/react"
import "./index.scss"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* <StrictMode> */}
          <SessionProvider>
            <Provider store={store}>
              <Header />
              {children}
              <ScrollRestoration />
              <Scripts />
            </Provider>
          </SessionProvider>
        {/* </StrictMode> */}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
