import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify'; 
import { Web3, Web3BaseWalletAccount } from 'web3';
import { TOKEN_CONTRACT_INFO, REWARD_CONTRACT_INFO } from '../contracts';
import { useMainContext } from './MainContext';
import { CONFIG } from '../consts';

interface Web3ContextType {
    web3: Web3;
    account: string;
    tokenContract: any;
    rewardContract: any;
    buyItemsWithGameTokens: (amount: number) => Promise<any>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const { privateKey } = useMainContext();
    console.log(privateKey);

    const userPrivateKey: string = privateKey;
    const web3: Web3 = new Web3(
        new Web3.providers.HttpProvider(CONFIG.WEB3_PROVIDER_URL)
    );
    const [account, setAccount] = useState<Web3BaseWalletAccount | null>(null);
    useEffect(() => {
        if (privateKey !== "") {
            setAccount(web3.eth.accounts.privateKeyToAccount(userPrivateKey));
        }
    }, [privateKey]);

    useEffect(() => {
        if (account) {
            web3.eth.accounts.wallet.add(account);
            web3.eth.defaultAccount = account.address;
        }
    }, [account]);

    const tokenContract = new web3.eth.Contract(
        TOKEN_CONTRACT_INFO.abi as any,
        TOKEN_CONTRACT_INFO.address
    );

    const rewardContract = new web3.eth.Contract(
        REWARD_CONTRACT_INFO.abi as any,
        REWARD_CONTRACT_INFO.address
    );

    const buyItemsWithGameTokens = async (amount: number): Promise<any> => {
        if (account) {
            try {
                const gasPrice: bigint = await web3.eth.getGasPrice();
                const gasLimit: bigint = await tokenContract.methods.transfer(REWARD_CONTRACT_INFO.address, amount).estimateGas({ from: account.address });
                
                const paymentData = tokenContract.methods.transfer(REWARD_CONTRACT_INFO.address, amount).encodeABI();

                const paymentTransaction = {
                    from: account.address,
                    to: TOKEN_CONTRACT_INFO.address,
                    gas: gasLimit,
                    gasPrice: gasPrice,
                    data: paymentData
                }

                const signedTx = await web3.eth.accounts.signTransaction(paymentTransaction, account.privateKey);
                const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction!);
                console.log("Payment transaction hash: ", receipt.transactionHash);
                toast.success("Paid successfully!");
            } catch (error: any) {
                console.error("Transaction failed:", error);
                toast.error("Payment failed!");
                throw error;
            }
        }
    };

    return (
        <Web3Context.Provider
            value={{
                web3,
                account: account?.address || "",
                tokenContract,
                rewardContract,
                buyItemsWithGameTokens
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
