'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  chainId: number | null;
  isConnecting: boolean;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchToEthereum: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if wallet is already connected on page load
  useEffect(() => {
    checkConnection();
    
    // Setup event listeners
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('disconnect', handleDisconnect);
    }

    // Cleanup event listeners on unmount
    return () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, []);

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          await updateWalletInfo(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      await updateWalletInfo(accounts[0]);
    }
  };

  const handleChainChanged = (chainId: string) => {
    setChainId(parseInt(chainId, 16));
    // Refresh page on chain change as recommended by MetaMask
    window.location.reload();
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const updateWalletInfo = async (walletAddress: string) => {
    try {
      setAddress(walletAddress);
      setIsConnected(true);

      // Get balance
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(walletAddress);
        setBalance(ethers.formatEther(balance));

        // Get chain ID
        const network = await provider.getNetwork();
        setChainId(Number(network.chainId));
      }

      setError(null);
    } catch (error) {
      console.error('Error updating wallet info:', error);
      setError('Failed to get wallet information');
    }
  };

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      const errorMsg = 'MetaMask is not installed. Please install MetaMask to continue.';
      setError(errorMsg);
      // Redirect to MetaMask download
      window.open('https://metamask.io/download/', '_blank');
      throw new Error(errorMsg);
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        await updateWalletInfo(accounts[0]);
        return accounts[0]; // Return the connected address
      } else {
        throw new Error('No accounts found');
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      let errorMessage = 'Failed to connect wallet';
      
      if (error.code === 4001) {
        errorMessage = 'Connection rejected by user';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      throw error; // Re-throw to allow handling in components
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    setBalance(null);
    setChainId(null);
    setError(null);
  };

  const switchToEthereum = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      setError('MetaMask is not installed');
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }], // Ethereum Mainnet
      });
    } catch (error: any) {
      console.error('Error switching to Ethereum:', error);
      if (error.code === 4902) {
        // Chain not added to MetaMask
        setError('Please add Ethereum Mainnet to your MetaMask');
      } else {
        setError('Failed to switch to Ethereum network');
      }
    }
  };

  const value: WalletContextType = {
    isConnected,
    address,
    balance,
    chainId,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    switchToEthereum,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};