'use client';

import { useState } from 'react';
import { ExternalLink, ArrowUpDown, Wallet, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWallet } from '../contexts/WalletContext';

export default function SwapWidget() {
  const [ethAmount, setEthAmount] = useState('');
  const [armtAmount, setArmtAmount] = useState('');
  
  const { isConnected, connectWallet, chainId, switchToEthereum } = useWallet();

  // Simulated exchange rate (1 ETH = 1,000,000 ARMT)
  const exchangeRate = 1000000;
  const isEthereumMainnet = chainId === 1;

  const handleEthChange = (value: string) => {
    setEthAmount(value);
    if (value && !isNaN(Number(value))) {
      setArmtAmount((Number(value) * exchangeRate).toLocaleString());
    } else {
      setArmtAmount('');
    }
  };

  const handleArmtChange = (value: string) => {
    setArmtAmount(value);
    const numericValue = Number(value.replace(/,/g, ''));
    if (value && !isNaN(numericValue)) {
      setEthAmount((numericValue / exchangeRate).toFixed(6));
    } else {
      setEthAmount('');
    }
  };

  const openUniswap = () => {
    // In production, this would include the ARMT token contract address
    const uniswapUrl = 'https://app.uniswap.org/#/swap?outputCurrency=0x...'; // Replace with actual ARMT contract
    window.open(uniswapUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white border-0 shadow-xl">
      <CardHeader className="text-center bg-gradient-to-r from-amber-500 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-center space-x-2">
          <ArrowUpDown className="h-5 w-5" />
          <span>Swap for ARMT</span>
        </CardTitle>
        <CardDescription className="text-amber-100">
          Exchange ETH for ArmenianToken tokens
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        {/* Network Warning */}
        {isConnected && !isEthereumMainnet && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-amber-800">Wrong Network</p>
              <p className="text-amber-700">Please switch to Ethereum Mainnet to trade ARMT.</p>
              <Button 
                onClick={switchToEthereum}
                size="sm" 
                className="mt-2 bg-amber-600 hover:bg-amber-700 text-white"
              >
                Switch to Ethereum
              </Button>
            </div>
          </div>
        )}

        {/* From (ETH) */}
        <div className="space-y-2">
          <Label htmlFor="eth-amount" className="text-sm font-medium text-slate-700">
            From (ETH)
          </Label>
          <div className="relative">
            <Input
              id="eth-amount"
              type="number"
              placeholder="0.0"
              value={ethAmount}
              onChange={(e) => handleEthChange(e.target.value)}
              className="pr-16 text-lg font-semibold"
              step="0.000001"
              disabled={!isConnected || !isEthereumMainnet}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-slate-600">ETH</span>
            </div>
          </div>
        </div>

        {/* Swap Icon */}
        <div className="flex justify-center">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-blue-600 rounded-full flex items-center justify-center">
            <ArrowUpDown className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* To (ARMT) */}
        <div className="space-y-2">
          <Label htmlFor="armt-amount" className="text-sm font-medium text-slate-700">
            To (ARMT)
          </Label>
          <div className="relative">
            <Input
              id="armt-amount"
              type="text"
              placeholder="0"
              value={armtAmount}
              onChange={(e) => handleArmtChange(e.target.value)}
              className="pr-20 text-lg font-semibold"
              disabled={!isConnected || !isEthereumMainnet}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <div className="w-5 h-5 bg-gradient-to-r from-amber-500 to-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-slate-600">ARMT</span>
            </div>
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
          <div className="text-sm text-slate-600 text-center">
            <span>Rate: 1 ETH = {exchangeRate.toLocaleString()} ARMT</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {!isConnected ? (
            <Button
              onClick={connectWallet}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover-lift"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          ) : !isEthereumMainnet ? (
            <Button
              onClick={switchToEthereum}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover-lift"
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Switch to Ethereum
            </Button>
          ) : (
            <Button
              onClick={openUniswap}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover-lift"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Swap on Uniswap
            </Button>
          )}
          
          <div className="text-xs text-slate-500 text-center">
            <p>* Prices are estimates. Actual rates may vary on Uniswap.</p>
            <p>Contract address will be available after token launch.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}