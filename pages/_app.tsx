import type { AppProps } from "next/app";
import { AppContextProvider } from "../context/AppContext";
import { OnboardContextProvider } from "../context/OnboardContext";
import "../styles/globals.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <OnboardContextProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </OnboardContextProvider>
    </AppContextProvider>
  );
}

export default MyApp;
