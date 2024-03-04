import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";
import {
  nftDropContractAddress,
  stakingContractAddress,
  tokenContractAddress,
} from "../consts/contractAddresses";
import styles from "../styles/Home.module.css";

const Stake: NextPage = () => {
  const address = useAddress();
  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );
  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );
  const { contract, isLoading } = useContract(stakingContractAddress);
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  const { data: stakedTokens } = useContractRead(contract, "getStakeInfo", [
    address,
  ]);

  useEffect(() => {
    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await contract?.call("getStakeInfo", [address]);
      setClaimableRewards(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, contract]);

  async function stakeNft(id: string) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }
    await contract?.call("stake", [[id]]);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background-image: url('/stake3-darker.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
      `}</style>
      <div className={styles.container}>
        <h1 className={styles.h1}>c̶̠̘̣̿͛h̷̹͊̐̚ȧ̵̡̯̦̭́͌̎p̶̧̳̞͍̐͋ẗ̴͙͎̹͈́̎e̶͖̣̾r̵͓̮̪̎ ̵̠͍͍̆Í̸̬̓̓̃Ȉ̷͙̗̠̱̎̆̚:̷͍̦̙͘ ̸̙̍̎̄̈t̷̡̙̟̙͛́̓̂h̵̛͕̪̾̂́e̸̛͉ ̵͕̘̫͙͗̍̏̓f̸̬̠̼̐å̸͎̻̭̗i̶͉͑̂̿͠t̵̥̖̻̊̐̅h̸̖̭̃̿f̷̠̱͐u̷͓̠̙̜͒̾̊l̶̰̯̣̤͛̐</h1>
        <div className={styles.emptySpace}></div>
        <p>Pledge your Cultis into service at the Church - the faithful shall be rewarded...</p>
        <hr className={`${styles.divider} ${styles.spacerTop} ${styles.spacerBottom}`} />

        {!address ? (
          <ConnectWallet />
        ) : (
          <>
            <h2>Your Tokens</h2>
            <div className={styles.tokenGrid}>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
                <p className={styles.tokenValue}>
                  <b>
                    {!claimableRewards
                      ? "Loading..."
                      : ethers.utils.formatUnits(claimableRewards, 18)}
                  </b>{" "}
                  {tokenBalance?.symbol}
                </p>
              </div>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Current Balance</h3>
                <p className={styles.tokenValue}>
                  <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
                </p>
              </div>
            </div>

            <Web3Button
              action={(contract) => contract.call("claimRewards")}
              contractAddress={stakingContractAddress}
            >
              Claim Rewards
            </Web3Button>

            <hr className={`${styles.divider} ${styles.spacerTop}`} />
            <h2>Your Staked NFTs</h2>
            <div className={styles.nftBoxGrid}>
              {stakedTokens &&
                stakedTokens[0]?.map((stakedToken: BigNumber) => (
                  <NFTCard
                    tokenId={stakedToken.toNumber()}
                    key={stakedToken.toString()}
                  />
                ))}
            </div>

            <hr className={`${styles.divider} ${styles.spacerTop}`} />
            <h2>Your Unstaked NFTs</h2>
            <div className={styles.nftBoxGrid}>
              {ownedNfts?.map((nft) => (
                <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                    className={styles.nftMedia}
                  />
                  <h3>{nft.metadata.name}</h3>
                  <Web3Button
                    contractAddress={stakingContractAddress}
                    action={() => stakeNft(nft.metadata.id)}
                  >
                    Stake
                  </Web3Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Stake;
