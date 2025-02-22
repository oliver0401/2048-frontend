import { useEffect } from "react";
import { useMainContext } from "../context/MainContext"
import { generateMnemonic } from "bip39";

export const useAddress = ()=> {
    const { mnemonic, setMnemonic } = useMainContext();
    useEffect(() => {
        if (mnemonic.length === 0) {
            setMnemonic(generateMnemonic(128).split(' '));
        }
    }, []);
    return { mnemonic };
}