import React from 'react';
import { SiTether, SiPolygon, SiBinance, SiEthereum } from 'react-icons/si';
import USDC from '../assets/svg/usdc.svg';
import ARBITRUM from '../assets/svg/arbitrum.svg';
import { TToken } from '../types';

export const API_KEY = {
  ETH: 'R8IKIIPAJKC9TZDCV3W17N62VZ99BZJD87',
  POL: 'FQTFJ3SZY4726GDTT83ZIYJHY21TJS5WXI',
  BNB: 'I4WZIXVBR7KRTNZY1P6VIGEN29R2U737MK',
  ARB: '6KVU5REZUYBQCC8KR573YF7I91NY98BEIN',
};

export const CONTRACT_ADDRESS = {
  PUSDT: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  PUSDC: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
  EUSDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  EUSDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  AUSDT: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
  AUSDC: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
  BUSDT: '0x55d398326f99059ff775485246999027b3197955',
  BUSDC: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
};

export const BASEURL = {
  ETH: 'https://api.etherscan.io/api',
  POL: 'https://api.polygonscan.com/api',
  BNB: 'https://api.bscscan.com/api',
  ARB: 'https://api.arbiscan.io/api',
};

export const ETH: TToken = {
  unit: 'ETH',
  icon: <SiEthereum className="text-blue-500" size={32} />,
  name: 'eth',
  endpoint: `${BASEURL.ETH}?module=account&action=balance&apikey=${API_KEY.ETH}`,
};

export const POL: TToken = {
  unit: 'POL',
  icon: <SiPolygon className="text-purple-500" size={32} />,
  name: 'pol',
  endpoint: `${BASEURL.POL}?module=account&action=balance&apikey=${API_KEY.POL}`,
};

export const BNB: TToken = {
  unit: 'BNB',
  icon: <SiBinance className="text-yellow-500" size={32} />,
  name: 'bnb',
  endpoint: `${BASEURL.BNB}?module=account&action=balance&apikey=${API_KEY.BNB}`,
};

export const ARB: TToken = {
  unit: 'ARB',
  icon: <img src={ARBITRUM} className="w-8 h-8" />,
  name: 'arb',
  endpoint: `${BASEURL.ARB}?module=account&action=balance&apikey=${API_KEY.ARB}`,
};

export const PUSDT: TToken = {
  unit: 'USDT',
  icon: (
    <div className="relative">
      <SiTether className="text-green-500" size={32} />
      <SiPolygon
        className="bg-purple-500 text-white absolute -bottom-1 -right-2 rounded-full p-1"
        size={20}
      />
    </div>
  ),
  name: 'pusdt',
  endpoint: `${BASEURL.POL}?module=account&action=balance&apikey=${API_KEY.POL}&contractaddress=${CONTRACT_ADDRESS.PUSDT}`,
};

export const BUSDT: TToken = {
  unit: 'USDT',
  icon: (
    <div className="relative">
      <SiTether className="text-green-500" size={32} />
      <SiBinance
        className="bg-yellow-500 text-white absolute -bottom-1 -right-2 rounded-full p-1"
        size={20}
      />
    </div>
  ),
  name: 'busdt',
  endpoint: `${BASEURL.BNB}?module=account&action=balance&apikey=${API_KEY.BNB}&contractaddress=${CONTRACT_ADDRESS.BUSDT}`,
};

export const EUSDT: TToken = {
  unit: 'USDT',
  icon: (
    <div className="relative">
      <SiTether className="text-green-500" size={32} />
      <SiEthereum
        className="bg-blue-500 text-white absolute -bottom-1 -right-2 rounded-full p-1"
        size={20}
      />
    </div>
  ),
  name: 'eusdt',
  endpoint: `${BASEURL.ETH}?module=account&action=balance&apikey=${API_KEY.ETH}&contractaddress=${CONTRACT_ADDRESS.EUSDT}`,
};

export const PUSDC: TToken = {
  unit: 'USDC',
  icon: (
    <div className="relative">
      <img src={USDC} className="w-8 h-8" />
      <SiPolygon
        className="bg-purple-500 text-white absolute -bottom-1 -right-2 rounded-full p-1"
        size={20}
      />
    </div>
  ),
  name: 'pusdc',
  endpoint: `${BASEURL.POL}?module=account&action=balance&apikey=${API_KEY.POL}&contractaddress=${CONTRACT_ADDRESS.PUSDC}`,
};

export const BUSDC: TToken = {
  unit: 'USDC',
  icon: (
    <div className="relative">
      <img src={USDC} className="w-8 h-8" />
      <SiBinance
        className="bg-yellow-500 text-white absolute -bottom-1 -right-2 rounded-full p-1"
        size={20}
      />
    </div>
  ),
  name: 'busdc',
  endpoint: `${BASEURL.BNB}?module=account&action=balance&apikey=${API_KEY.BNB}&contractaddress=${CONTRACT_ADDRESS.BUSDC}`,
};

export const EUSDC: TToken = {
  unit: 'USDC',
  icon: (
    <div className="relative">
      <img src={USDC} className="w-8 h-8" />
      <SiEthereum
        className="bg-blue-500 text-white absolute -bottom-1 -right-2 rounded-full p-1"
        size={20}
      />
    </div>
  ),
  name: 'eusdc',
  endpoint: `${BASEURL.ETH}?module=account&action=balance&apikey=${API_KEY.ETH}&contractaddress=${CONTRACT_ADDRESS.EUSDC}`,
};

export const AUSDT: TToken = {
  unit: 'USDC',
  icon: (
    <div className="relative">
      <SiTether className="text-green-500" size={32} />
      <img
        src={ARBITRUM}
        className="absolute -bottom-1 -right-2 rounded-full w-4 h-4"
      />
    </div>
  ),
  name: 'ausdt',
  endpoint: `${BASEURL.ARB}?module=account&action=balance&apikey=${API_KEY.ARB}&contractaddress=${CONTRACT_ADDRESS.AUSDT}`,
};

export const AUSDC: TToken = {
  unit: 'USDC',
  icon: (
    <div className="relative">
      <img src={USDC} className="w-8 h-8" />
      <img
        src={ARBITRUM}
        className="absolute -bottom-1 -right-2 rounded-full w-4 h-4"
      />
    </div>
  ),
  name: 'eusdc',
  endpoint: `${BASEURL.ARB}?module=account&action=balance&apikey=${API_KEY.ARB}&contractaddress=${CONTRACT_ADDRESS.AUSDC}`,
};
