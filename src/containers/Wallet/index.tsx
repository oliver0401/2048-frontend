import React, { useMemo, useEffect, useState } from 'react';
import Text from '../../components/Text';
import { useMainContext } from '../../context/MainContext';
import {
  HiOutlineClipboardDocument,
  HiOutlineClipboardDocumentCheck,
} from 'react-icons/hi2';
import { useClipboard } from '../../hooks/useClipboard';
import Button from '../../components/Button';
import { PATH, TOKEN } from '../../consts';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoKey, IoWallet } from 'react-icons/io5';
import { TbSeeding } from 'react-icons/tb';
import { useToggle } from '../../hooks/useToggle';
import { PrivateKeyModal } from './PrivateKeyModal';
import { ImportWalletModal } from './ImportWalletModal';
import { RenderField } from './RenderField';
import { ShowSeedModal } from './ShowSeedModal';
import { SiEthereum, SiPolygon } from 'react-icons/si';
import { SiBinance } from 'react-icons/si';
import { DropDown } from '../../components/DropDown';
import { TOption, TToken } from '../../types';
import { useDropDown } from '../../hooks/useDropDown';
import arbitrum from '../../assets/svg/arbitrum.svg';
import dwat from '../../assets/img/hrks.png';
import fuse from '../../assets/svg/fuse.svg';
import { useWeb3Context } from '../../context';

export const WalletContainer: React.FC = () => {
  const { user } = useMainContext();
  const navigate = useNavigate();
  const { userBalance } = useWeb3Context();
  const { onClick, content } = useClipboard(
    user?.address || '',
    <HiOutlineClipboardDocument
      size={24}
      className="text-primary dark:text-primary-dark"
    />,
    <HiOutlineClipboardDocumentCheck
      size={24}
      className="text-primary dark:text-primary-dark"
    />,
  );

  const { open, onClose, onOpen } = useToggle(false);
  const {
    open: openImportWallet,
    onClose: onCloseImportWallet,
    onOpen: onOpenImportWallet,
  } = useToggle(false);
  const {
    open: openSeedPhrase,
    onClose: onCloseSeedPhrase,
    onOpen: onOpenSeedPhrase,
  } = useToggle(false);

  const networks: TOption[] = useMemo(
    () => [
      {
        label: (
          <div className="flex items-center gap-2 text-cyan-500 text-[16px]">
            <img src={fuse} alt="fuse" className="w-6 h-6" />
            Fuse Mainnet
          </div>
        ),
        value: 'fus',
      },
      {
        label: (
          <div className="flex items-center gap-2 text-purple-500 text-[16px]">
            <SiPolygon className="text-purple-500" size={24} />
            Polygon Mainnet
          </div>
        ),
        value: 'pol',
      },
      {
        label: (
          <div className="flex items-center gap-2 text-blue-500 text-[16px] text-nowrap">
            <SiEthereum className="text-blue-500" size={24} />
            Ethereum Mainnet
          </div>
        ),
        value: 'eth',
      },
      {
        label: (
          <div className="flex items-center gap-2 text-yellow-500 text-[16px]">
            <SiBinance className="text-yellow-500" size={24} />
            Binance Mainnet
          </div>
        ),
        value: 'bnb',
      },
      {
        label: (
          <div className="flex items-center gap-2 text-cyan-500 text-[16px]">
            <img src={arbitrum} alt="arbitrum" className="w-6 h-6" />
            Arbitrum Mainnet
          </div>
        ),
        value: 'arb',
      },
    ],
    [],
  );

  const { selectedOption, onSelect } = useDropDown(networks);

  const tokens = useMemo<
    Record<'fus' | 'eth' | 'bnb' | 'arb' | 'pol', TToken[]>
  >(
    () => ({
      pol: [TOKEN.POL, TOKEN.PUSDT, TOKEN.PUSDC],
      eth: [TOKEN.ETH, TOKEN.EUSDT, TOKEN.EUSDC],
      bnb: [TOKEN.BNB, TOKEN.BUSDT, TOKEN.BUSDC],
      arb: [TOKEN.ARB, TOKEN.AUSDT, TOKEN.AUSDC],
      fus: [
        {
          unit: 'DWAT',
          icon: <img src={dwat} alt="dwat" className="w-8 h-8" />,
          balance: async (_address: string) => {
            return userBalance ? userBalance.toString() : '0';
          },
          name: 'dwat',
        },
        TOKEN.FUSE,
        TOKEN.FUSDT,
        TOKEN.FUSDC,
      ],
    }),
    [],
  );

  // Add this state to store balances for all tokens
  const [balances, setBalances] = useState<Record<string, string>>({});

  // Move the useEffect outside of the map
  useEffect(() => {
    const fetchBalances = async () => {
      const network = selectedOption.value as 'fus' | 'eth' | 'bnb' | 'arb' | 'pol';
      const currentTokens = tokens[network];
      
      const newBalances: Record<string, string> = {};
      for (const token of currentTokens) {
        const balance = await token.balance(user?.address || '');
        newBalances[token.unit] = balance;
      }
      setBalances(newBalances);
    };

    if (user?.address) {
      fetchBalances();
    }
  }, [selectedOption.value, user?.address, tokens]);

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-start items-start p-10">
      <div className="w-full flex items-center justify-between">
        <DropDown
          options={networks}
          selectedOption={selectedOption.value}
          onSelect={onSelect}
        />
        <div onClick={onClick} className="flex items-center justify-center">
          <Text as="span" color="primary" fontSize={18} className="font-mono">
            {user?.address?.slice(0, 7)}...{user?.address?.slice(-5)}
          </Text>
          <div className="flex items-center justify-center">{content}</div>
        </div>
      </div>

      {tokens[selectedOption.value as 'fus' | 'eth' | 'bnb' | 'arb' | 'pol'].map(
        (token, idx) => (
          <RenderField
            key={idx}
            label={token.icon}
            value={
              <span className="text-lg text-blue-500">
                {balances[token.unit] || '0'} {token.unit}
              </span>
            }
          />
        ),
      )}

      <Button
        onClick={onOpen}
        className="w-full flex items-center justify-center gap-2 group"
      >
        <IoKey
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Show Private Key
      </Button>
      <Button
        onClick={onOpenSeedPhrase}
        className="group w-full flex items-center justify-center gap-2"
      >
        <TbSeeding
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Show Seed Phrase
      </Button>
      <Button
        onClick={onOpenImportWallet}
        className="w-full flex items-center justify-center gap-2 group"
      >
        <IoWallet
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Import New Wallet
      </Button>
      <Button
        onClick={() => navigate(PATH.GAME)}
        className="group w-full flex items-center justify-center gap-2"
      >
        <IoArrowBack
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Return to Game
      </Button>
      <PrivateKeyModal isOpen={open} onClose={onClose} />
      <ImportWalletModal
        isOpen={openImportWallet}
        onClose={onCloseImportWallet}
      />
      <ShowSeedModal isOpen={openSeedPhrase} onClose={onCloseSeedPhrase} />
    </div>
  );
};
