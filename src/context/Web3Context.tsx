import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Web3, Web3BaseWalletAccount } from 'web3';
import { TOKEN_CONTRACT_INFO, REWARD_CONTRACT_INFO } from '../contracts';
import { useMainContext } from './MainContext';
import { CONFIG, TOKEN } from '../consts';
import { createWeb3Instance } from '../utils/web3config';
// import { createGasPriceStrategy } from '../utils/gasPriceStrategy';

interface Web3ContextType {
    web3: Web3;
    account: string;
    tokenContract: any;
    rewardContract: any;
    userBalance: bigint | null;
    setUserBalance: (userBalance: bigint) => void;
    getBalance: () => Promise<any>;
    getUserGameTokenBalance: () => Promise<any>;
    buyItemsWithGameTokens: (amount: number) => Promise<any>;
    buyThemesWithUSD: (tokenType: string | null, amount: number) => Promise<any>;
}

interface ContractInfo {
    abi: any; // Replace with the actual type of your ABI if available
    address: string;
}

interface ContractByName {
    [network: string]: {
        [tokenType: string]: ContractInfo;
    };
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const { user, privateKey } = useMainContext();
    const [account, setAccount] = useState<Web3BaseWalletAccount | null>(null);
    const [userBalance, setUserBalance] = useState<bigint | null>(null);
    const web3: Web3 = createWeb3Instance(CONFIG.FUSE_PROVIDER_URL);

    useEffect(() => {
        getBalance();
    }, [account, user]);

    useEffect(() => {
        if (privateKey !== "") {
            setAccount(web3.eth.accounts.privateKeyToAccount(privateKey));
        }
    }, [privateKey]);

    useEffect(() => {
        if (account) {
            web3.eth.accounts.wallet.add(account);
            web3.eth.defaultAccount = account.address;
        }
    }, [account]);

    const getBalance = async () => {
        const userbal = await getUserGameTokenBalance();
        setUserBalance(userbal);
    }

    const getContracts = () => {
        const tokenContract = new web3.eth.Contract(
            TOKEN_CONTRACT_INFO.abi as any,
            TOKEN_CONTRACT_INFO.address
        );

        const rewardContract = new web3.eth.Contract(
            REWARD_CONTRACT_INFO.abi as any,
            REWARD_CONTRACT_INFO.address
        );

        return { tokenContract, rewardContract };
    }

    const { tokenContract, rewardContract } = getContracts();

    const contractByName: ContractByName = {
        fuse: {
            fusdt: {
                abi: TOKEN.CONTRACT_ABI.FUSDT,
                address: TOKEN.CONTRACT_ADDRESS.FUSDT,
            },
            fusdc: {
                abi: TOKEN.CONTRACT_ABI.FUSDC,
                address: TOKEN.CONTRACT_ADDRESS.FUSDC,
            },
        },
        binance: {
            busdt: {
                abi: TOKEN.CONTRACT_ABI.BUSDT,
                address: TOKEN.CONTRACT_ADDRESS.BUSDT,
            },
            busdc: {
                abi: TOKEN.CONTRACT_ABI.BUSDC,
                address: TOKEN.CONTRACT_ADDRESS.BUSDC,
            },
        },
        arbitrum: {
            ausdt: {
                abi: TOKEN.CONTRACT_ABI.AUSDT,
                address: TOKEN.CONTRACT_ADDRESS.AUSDT,
            },
            ausdc: {
                abi: TOKEN.CONTRACT_ABI.AUSDC,
                address: TOKEN.CONTRACT_ADDRESS.AUSDC,
            },
        },
        polygon: {
            pusdt: {
                abi: TOKEN.CONTRACT_ABI.PUSDT,
                address: TOKEN.CONTRACT_ADDRESS.PUSDT,
            },
            pusdc: {
                abi: TOKEN.CONTRACT_ABI.PUSDC,
                address: TOKEN.CONTRACT_ADDRESS.PUSDC,
            },
        },
    };

    const getUserGameTokenBalance = async () => {
        if (account) {
            const balance: bigint = await tokenContract.methods.balanceOf(account?.address).call();
            return balance;
        }
        return BigInt(0)
    }

    // const getRewardContractGameTokenBalance = async () => {
    //     if (account) {
    //         const balance: bigint = await tokenContract.methods.balanceOf(String(REWARD_CONTRACT_INFO.address)).call();
    //         return balance;
    //     }
    //     return BigInt(0)
    // }

    const getUsdtPriceInNativeToken = async (tokenType: string | null): Promise<number> => {
        try {
            const coinId = CONFIG.COINGECKO_ID[tokenType as any];
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
                params: {
                    ids: coinId,
                    vs_currencies: "usd"
                }
            });

            const priceInUSD = response.data[coinId]?.usd;
            if (!priceInUSD) throw new Error("Price fetch failed");

            return 1 / priceInUSD; // Convert 1 USDT to native token amount
        } catch (error) {
            console.error("Error fetching price:", error);
            throw error;
        }

    }

    const buyThemesWithUSD = async (tokenType: string | null, amount: number): Promise<any> => {
        const networkName = getNetworkFromToken(tokenType as string);
        const providerUrl = getProviderUrl(tokenType || "");
        const web3_2: Web3 = createWeb3Instance(providerUrl);
        if (account) {
            try {
                // Make sure account is added to this web3 instance
                web3_2.eth.accounts.wallet.add(account);
                web3_2.eth.defaultAccount = account.address;

                const receiverAddress = CONFIG.RECEIVER_ADDRESS;

                const type = tokenType?.substring(1).toUpperCase();

                if (type === "USDT" || type === "USDC") {
                    // Get the token contract on the source network
                    if (!contractByName[networkName] || !contractByName[networkName][tokenType?.toLowerCase() as string]) {
                        toast.error(`Token ${tokenType} not supported on ${networkName}`);
                        return;
                    }

                    const tokenContractInfo = contractByName[networkName][tokenType?.toLowerCase() as string];
                    const contract = new web3_2.eth.Contract(
                        tokenContractInfo.abi,
                        tokenContractInfo.address
                    );

                    // Convert amount to proper format if needed (e.g., for tokens with decimals)
                    // Check the decimals of the token
                    const decimals = await contract.methods.decimals().call();
                    console.log(decimals);
                    const amountInSmallestUnit = web3_2.utils.toBigInt(
                        amount * 10 ** Number(decimals)
                    );
                    console.log(amountInSmallestUnit);

                    // Now transfer the tokens
                    const balanceOfUser: bigint = await contract.methods.balanceOf(account.address).call();
                    const balanceOfServer: bigint = await contract.methods.balanceOf(receiverAddress).call();
                    console.log(`UserBalance: ${balanceOfUser} / ServerBalance: ${balanceOfServer} / amount: ${BigInt(amountInSmallestUnit)}`);
                    const transferData = contract.methods.transfer(receiverAddress, amountInSmallestUnit).encodeABI();

                    const gasPrice: bigint = await web3_2.eth.getGasPrice();
                    //console.log(`Reward gas price: ${gasPriceStrategy.getGasPriceInGwei(rewardGasPrice)} Gwei`);

                    const nonce = await web3_2.eth.getTransactionCount(account.address, "latest");
                    console.log(nonce);

                    const transferTransaction = {
                        from: account.address,
                        to: contract.options.address,
                        gas: 100000,
                        gasPrice: gasPrice,
                        data: transferData,
                        nonce
                    }

                    const signedTx = await web3_2.eth.accounts.signTransaction(transferTransaction, account.privateKey);

                    console.log(gasPrice);

                    return new Promise((resolve, reject) => {

                        const promiEvent = web3_2.eth.sendSignedTransaction(signedTx.rawTransaction!);

                        promiEvent
                            .on('transactionHash', (hash) => {
                                toast.info(`Transaction submitted with hash: ${hash.substring(0, 10)}...`);
                            })
                            .then((receipt) => {
                                toast.success("Payment successful!");
                                resolve(receipt);
                            })
                            .catch((error) => {
                                console.error("Transaction error:", error);

                                // More detailed error handling
                                if (error.message.includes("Transaction has been reverted by the EVM")) {
                                    // Try to get more specific information about why it was reverted

                                    // Check if there's a reason string
                                    if (error.message.includes("reason string")) {
                                        const reasonMatch = error.message.match(/reason string: '(.+)'/);
                                        if (reasonMatch && reasonMatch[1]) {
                                            toast.error(`Transaction reverted: ${reasonMatch[1]}`);
                                        }
                                    } else {
                                        // Check for common ERC20 revert reasons
                                        checkCommonERC20Errors(contract, account.address, receiverAddress, amountInSmallestUnit.toString())
                                            .then(reason => {
                                                if (reason) {
                                                    toast.error(`Transaction likely reverted because: ${reason}`);
                                                } else {
                                                    toast.error("Transaction reverted by the contract. Check if the contract has transfer restrictions.");
                                                }
                                            })
                                            .catch(() => {
                                                toast.error("Transaction reverted by the contract.");
                                            });
                                    }
                                } else if (error.message.includes("insufficient funds")) {
                                    toast.error("Insufficient funds for gas");
                                } else if (error.message.includes("nonce too low")) {
                                    toast.error("Transaction nonce issue. Try again.");
                                } else if (error.message.includes("gas limit")) {
                                    toast.error("Gas limit issue. Try with higher gas.");
                                } else {
                                    toast.error(`Payment failed: ${error.message || "Unknown error"}`);
                                }

                                reject(error);
                            });
                    });
                } else {
                    const nativeTokenAmount = await getUsdtPriceInNativeToken(tokenType);
                    console.log(`1 USDT ≈ ${nativeTokenAmount} ${tokenType}`);

                    // Convert amount to Wei
                    const amountInWei = web3_2.utils.toBigInt(
                        Math.floor(amount * nativeTokenAmount * 10 ** 18)
                    );
                    console.log(amountInWei);

                    // Get nonce
                    const nonce = await web3_2.eth.getTransactionCount(account.address, "latest");
                    console.log(nonce);

                    const gasPrice = await web3_2.eth.getGasPrice();

                    // Define transaction details
                    const txData = {
                        from: account.address,
                        to: receiverAddress,
                        value: amountInWei,
                        gas: 21000,
                        gasPrice: gasPrice,
                        nonce
                    };

                    // Sign transaction
                    const signedTx = await web3_2.eth.accounts.signTransaction(txData, account.privateKey);
                    if (!signedTx.rawTransaction) throw new Error("Transaction signing failed");
                    // Send transaction
                    console.log(gasPrice);
                    return new Promise((resolve, reject) => {

                        const promiEvent = web3_2.eth.sendSignedTransaction(signedTx.rawTransaction!);

                        promiEvent
                            .on('transactionHash', (hash) => {
                                toast.info(`Transaction submitted with hash: ${hash.substring(0, 10)}...`);
                            })
                            .then((receipt) => {
                                toast.success("Payment successful!");
                                resolve(receipt);
                            })
                            .catch((error) => {
                                console.error("Transaction error:", error);

                                // More detailed error handling
                                if (error.message.includes("Transaction has been reverted by the EVM")) {
                                    // Try to get more specific information about why it was reverted

                                    // Check if there's a reason string
                                    if (error.message.includes("reason string")) {
                                        const reasonMatch = error.message.match(/reason string: '(.+)'/);
                                        if (reasonMatch && reasonMatch[1]) {
                                            toast.error(`Transaction reverted: ${reasonMatch[1]}`);
                                        }
                                    } else {
                                        toast.error("no reason string");
                                    }
                                } else if (error.message.includes("insufficient funds")) {
                                    toast.error("Insufficient funds for gas");
                                } else if (error.message.includes("nonce too low")) {
                                    toast.error("Transaction nonce issue. Try again.");
                                } else if (error.message.includes("gas limit")) {
                                    toast.error("Gas limit issue. Try with higher gas.");
                                } else {
                                    toast.error(`Payment failed: ${error.message || "Unknown error"}`);
                                }

                                reject(error);
                            });
                    });

                }


                // toast.success("Paid successfully!");

            } catch (error: any) {
                console.error("Transaction failed:", error);
                toast.error("Payment failed!");
                throw error;
            }
        }
    }

    const buyItemsWithGameTokens = async (amount: number): Promise<any> => {
        const providerUrl = CONFIG.FUSE_PROVIDER_URL;
        const web3_2: Web3 = createWeb3Instance(providerUrl);
        if (account) {
            try {
                const gasPrice: bigint = await web3_2.eth.getGasPrice();
                const gasLimit: bigint = await tokenContract.methods.transfer(REWARD_CONTRACT_INFO.address, amount).estimateGas({ from: account.address });

                const paymentData = tokenContract.methods.transfer(REWARD_CONTRACT_INFO.address, amount).encodeABI();

                const paymentTransaction = {
                    from: account.address,
                    to: TOKEN_CONTRACT_INFO.address,
                    gas: gasLimit,
                    gasPrice: gasPrice,
                    data: paymentData
                }

                const signedTx = await web3_2.eth.accounts.signTransaction(paymentTransaction, account.privateKey);
                await web3_2.eth.sendSignedTransaction(signedTx.rawTransaction!);
                toast.success("Paid successfully!");
            } catch (error: any) {
                console.error("Transaction failed:", error);
                toast.error("Payment failed!");
                throw error;
            }
        }
    };

    const getNetworkFromToken = (tokenType: string): string => {
        if (tokenType.startsWith('b')) return 'binance';
        if (tokenType.startsWith('a')) return 'arbitrum';
        if (tokenType.startsWith('p')) return 'polygon';
        if (tokenType.startsWith('f')) return 'fuse';
        return 'fuse';
    };

    const getProviderUrl = (network: string) => {
        switch (network) {
            case 'busdt':
            case 'busdc':
            case 'bnb':
                return CONFIG.BNB_PROVIDER_URL;
            case 'ausdt':
            case 'ausdc':
            case 'arb':
                return CONFIG.ABT_PROVIDER_URL;
            case 'pusdt':
            case 'pusdc':
            case 'pol':
                return CONFIG.POL_PROVIDER_URL;
            case 'fusdt':
            case 'fusdc':
            case 'fuse':
                return CONFIG.FUSE_PROVIDER_URL;
            default:
                return CONFIG.FUSE_PROVIDER_URL;
        }
    }



    return (
        <Web3Context.Provider
            value={{
                web3,
                account: account?.address || "",
                tokenContract,
                rewardContract,
                userBalance,
                setUserBalance,
                getBalance,
                getUserGameTokenBalance,
                buyItemsWithGameTokens,
                buyThemesWithUSD
            }}
        >
            {children}
        </Web3Context.Provider>
    );
}

export const useWeb3Context = () => {
    const context = useContext(Web3Context);
    if (context === undefined) {
        throw new Error("useWeb3Context must be used within a Web3Provider");
    }
    return context;
}

// Helper function to check for common ERC20 revert reasons
async function checkCommonERC20Errors(contract: any, fromAddress: any, toAddress: any, amount: any) {
    try {
        // Check if sender has enough balance
        const balance = await contract.methods.balanceOf(fromAddress).call();
        toast.info(`${BigInt(balance) - BigInt(amount)}`);
        if (BigInt(balance) < BigInt(amount)) {
            return "Insufficient token balance";
        }

        // Check if contract has a paused state
        try {
            const isPaused = await contract.methods.paused().call();
            if (isPaused) {
                return "Token transfers are paused";
            }
        } catch (e) {
            // Function doesn't exist, ignore
        }

        // Check for blacklisting
        try {
            const isBlacklisted = await contract.methods.isBlacklisted(fromAddress).call();
            if (isBlacklisted) {
                return "Sender address is blacklisted";
            }
        } catch (e) {
            // Function doesn't exist, ignore
        }

        // Check for transfer restrictions
        try {
            const canTransfer = await contract.methods.canTransfer(fromAddress, toAddress, amount).call();
            if (!canTransfer) {
                return "Transfer is restricted by the contract";
            }
        } catch (e) {
            // Function doesn't exist, ignore
        }

        return null; // No common issues found
    } catch (error) {
        console.error("Error checking for common ERC20 issues:", error);
        return null;
    }
}