import type { Metadata } from 'next';
import { CheckCircle, Wallet, Download, Link as LinkIcon, CreditCard, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Beginner\'s Guide - ArmenianCoin (ARMT)',
  description: 'Complete step-by-step guide to getting started with ArmenianCoin. Learn how to create a MetaMask wallet, fund it, and buy ARMT tokens safely.',
};

export default function Guide() {
  const steps = [
    {
      number: 1,
      title: 'Create MetaMask Wallet',
      description: 'Set up your secure cryptocurrency wallet',
      icon: Wallet,
      content: [
        'Visit metamask.io and download the browser extension',
        'Install MetaMask for Chrome, Firefox, Brave, or Edge',
        'Click "Create a Wallet" and follow the setup process',
        'Write down your 12-word recovery phrase and store it safely',
        'Never share your recovery phrase with anyone',
      ],
    },
    {
      number: 2,
      title: 'Fund Your Wallet',
      description: 'Add cryptocurrency to your MetaMask wallet',
      icon: CreditCard,
      content: [
        'Open your MetaMask wallet extension',
        'Click "Buy" to purchase ETH with a credit card or bank transfer',
        'Alternatively, transfer ETH from another exchange (Coinbase, Binance, etc.)',
        'Wait for the transaction to confirm (usually 5-15 minutes)',
        'Ensure you have enough ETH to cover transaction fees (gas)',
      ],
    },
    {
      number: 3,
      title: 'Connect to ArmenianCoin',
      description: 'Link your wallet to our platform',
      icon: LinkIcon,
      content: [
        'Visit the ArmenianCoin trading platform',
        'Click "Connect Wallet" in the top right corner',
        'Select MetaMask from the wallet options',
        'Approve the connection in your MetaMask popup',
        'Your wallet address will now be displayed on the site',
      ],
    },
    {
      number: 4,
      title: 'Buy ARMT Tokens',
      description: 'Purchase your ArmenianCoin tokens',
      icon: CheckCircle,
      content: [
        'Enter the amount of ARMT you want to purchase',
        'Review the exchange rate and transaction details',
        'Click "Swap" or "Buy ARMT" to initiate the trade',
        'Confirm the transaction in your MetaMask wallet',
        'Wait for blockchain confirmation (usually 1-5 minutes)',
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-600 via-blue-600 to-red-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 relative">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-amber-300 via-red-400 to-blue-500 p-1 animate-pulse-glow shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <Image
                    src="/logonobg.png"
                    alt="ArmenianCoin logonobg"
                    width={56}
                    height={56}
                    className="object-contain rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Beginner's Guide to ArmenianCoin
          </h1>
          <p className="text-xl text-amber-100 leading-relaxed">
            New to cryptocurrency? No problem! Follow our simple 4-step process to safely 
            set up your wallet and purchase ARMT tokens to join our global Armenian community.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <Card key={step.number} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 bg-gradient-to-br from-amber-50 to-blue-50 p-8 flex flex-col justify-center">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
                        {step.number}
                      </div>
                      <step.icon className="w-8 h-8 text-amber-600" />
                    </div>
                    <CardHeader className="p-0">
                      <CardTitle className="text-2xl font-bold text-slate-900">
                        {step.title}
                      </CardTitle>
                      <CardDescription className="text-lg text-slate-600">
                        {step.description}
                      </CardDescription>
                    </CardHeader>
                  </div>
                  
                  <div className="lg:w-2/3 p-8">
                    <CardContent className="p-0">
                      <ul className="space-y-4">
                        {step.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-amber-200 bg-white shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-amber-800 flex items-center justify-center">
                <Download className="w-6 h-6 mr-2" />
                Important Safety Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-slate-900">Security Best Practices</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-600">⚠️</span>
                      <span className="text-sm text-slate-700">Never share your recovery phrase with anyone</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-600">🔒</span>
                      <span className="text-sm text-slate-700">Store your recovery phrase offline and securely</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-600">🌐</span>
                      <span className="text-sm text-slate-700">Always verify website URLs before connecting</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-600">💰</span>
                      <span className="text-sm text-slate-700">Start with small amounts while learning</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-slate-900">Common Scams to Avoid</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">❌</span>
                      <span className="text-sm text-slate-700">Fake MetaMask extensions or websites</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">❌</span>
                      <span className="text-sm text-slate-700">Phishing emails asking for wallet details</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">❌</span>
                      <span className="text-sm text-slate-700">Social media messages offering free tokens</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">❌</span>
                      <span className="text-sm text-slate-700">Unsolicited investment advice or "guarantees"</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 via-blue-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Check out our FAQ section for answers to common questions, or reach out to our 
            Armenian community for support and guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-amber-600 hover:bg-amber-50 shadow-lg">
              <Link href="/faq">
                View FAQ <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-amber-600 shadow-xl">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}