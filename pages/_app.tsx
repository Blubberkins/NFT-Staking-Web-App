import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Sepolia } from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.
const activeChain = "Sepolia";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      //activeChain={activeChain}
      clientId={'105ef5a554d10154c40eecd0c7861d7f'}
      // clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
