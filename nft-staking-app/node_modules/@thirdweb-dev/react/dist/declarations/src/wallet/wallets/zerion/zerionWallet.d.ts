import type { WalletConfig } from "@thirdweb-dev/react-core";
import { ZerionWallet } from "@thirdweb-dev/wallets";
/**
 * @wallet
 */
export type ZerionkWalletConfigOptions = {
    /**
     * When connecting MetaMask using the QR Code - Wallet Connect connector is used which requires a project id.
     * This project id is Your project’s unique identifier for wallet connect that can be obtained at cloud.walletconnect.com.
     *
     * https://docs.walletconnect.com/2.0/web3modal/options#projectid-required
     */
    projectId?: string;
    /**
     * If true, the wallet will be tagged as "recommended" in ConnectWallet Modal
     */
    recommended?: boolean;
};
/**
 * A wallet configurator for [Zerion Wallet](https://zerion.io/) which allows integrating the wallet with React.
 *
 * It returns a [`WalletConfig`](https://portal.thirdweb.com/references/react/v4/WalletConfig) object which can be used to connect the wallet to via [`ConnectWallet`](https://portal.thirdweb.com/react/v4/components/ConnectWallet) component or [`useConnect`](https://portal.thirdweb.com/references/react/v4/useConnect) hook as mentioned in [Connecting Wallets](https://portal.thirdweb.com/react/v4/connecting-wallets) guide
 *
 * @example
 * ```ts
 * zerionWallet({
 *  projectId: "your_project_id",
 *  recommended: true,
 * })
 * ```
 *
 * @param options -
 * Optional configuration options for the wallet
 *
 * ### projectId (optional)
 * When connecting MetaMask using the QR Code - Wallet Connect connector is used which requires a project id.
 * This project id is Your project’s unique identifier for wallet connect that can be obtained at cloud.walletconnect.com.
 *
 * ### recommended (optional)
 * If true, the wallet will be tagged as "recommended" in ConnectWallet Modal
 *
 * @wallet
 */
export declare const zerionWallet: (options?: ZerionkWalletConfigOptions) => WalletConfig<ZerionWallet>;
//# sourceMappingURL=zerionWallet.d.ts.map