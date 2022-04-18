import type { AppProps } from "next/app";
import { AppContextProvider } from "../context/AppContext";
import { OnboardContextProvider } from "../context/OnboardContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <OnboardContextProvider>
        <Component {...pageProps} />
      </OnboardContextProvider>
    </AppContextProvider>
  );
}

export default MyApp;
