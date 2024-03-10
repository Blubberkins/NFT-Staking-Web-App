import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Sepolia } from "@thirdweb-dev/chains";

// activeChain cannot be used for Sepolia as it isn't supported as one of the default chains, and is imported instead
// const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      //activeChain={activeChain}
      activeChain={Sepolia}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
