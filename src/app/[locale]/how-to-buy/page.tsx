import type { Metadata } from 'next';
import { CheckCircle, Wallet, Download, Link as LinkIcon, CreditCard, ArrowRight, AlertTriangle, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'How to Buy ARMT - ArmenianCoin Purchase Guide',
  description: 'Complete step-by-step guide to purchasing ArmenianCoin (ARMT). Learn how to create a MetaMask wallet, fund it, and buy ARMT tokens safely.',
};

export default function HowToBuy() {
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
      description: 'Add Ethereum (ETH) to your MetaMask wallet',
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
      title: 'Purchase ARMT Tokens',
      description: 'Buy your ArmenianCoin tokens',
      icon: CheckCircle,
      content: [
        'Enter the amount of ARMT you want to purchase',
        'Review the exchange rate and transaction details',
        'Click "Swap" or "Buy ARMT" to initiate the trade',
        'Confirm the transaction in your MetaMask wallet',
        'Wait for blockchain confirmation (usually 1-5 minutes)',
        'Your ARMT tokens will appear in your wallet',
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-armenian-gradient animate-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 relative animate-float">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-amber-300 via-red-400 to-blue-500 p-1 animate-pulse-glow shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <Image
                    src="/logonobg.png"
                    alt="ArmenianCoin logonobg"
                    width={72}
                    height={72}
                    className="object-contain rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            How to Buy ARMT
          </h1>
          <p className="text-xl text-amber-100 leading-relaxed max-w-3xl mx-auto">
            New to cryptocurrency? No problem! Follow our simple 4-step process to safely 
            set up your wallet and purchase ARMT tokens to join our mission of supporting 
            Armenian families and children.
          </p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12 bg-gradient-to-r from-amber-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center p-4 hover:shadow-lg transition-all hover-lift border-0 shadow-md">
              <div className="text-2xl font-bold text-amber-600 mb-1">ARMT</div>
              <div className="text-slate-600 text-sm">Token Symbol</div>
            </Card>
            <Card className="text-center p-4 hover:shadow-lg transition-all hover-lift border-0 shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-1">ERC-20</div>
              <div className="text-slate-600 text-sm">Ethereum Network</div>
            </Card>
            <Card className="text-center p-4 hover:shadow-lg transition-all hover-lift border-0 shadow-md">
              <div className="text-2xl font-bold text-red-600 mb-1">1B</div>
              <div className="text-slate-600 text-sm">Total Supply</div>
            </Card>
            <Card className="text-center p-4 hover:shadow-lg transition-all hover-lift border-0 shadow-md">
              <div className="text-2xl font-bold text-green-600 mb-1">10%</div>
              <div className="text-slate-600 text-sm">To Charity</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Follow these easy steps to purchase ARMT tokens and join our global Armenian community.
            </p>
          </div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <Card key={step.number} className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all hover-lift">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 bg-gradient-to-br from-amber-50 to-blue-50 p-8 flex flex-col justify-center">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-armenian-gradient rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-xl animate-pulse-glow">
                        {step.number}
                      </div>
                      <step.icon className="w-10 h-10 text-amber-600" />
                    </div>
                    <CardHeader className="p-0">
                      <CardTitle className="text-3xl font-bold text-slate-900">
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
                            <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700 leading-relaxed text-lg">{item}</span>
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
      <section className="py-20 bg-gradient-to-br from-red-50 to-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-red-200 bg-white shadow-2xl">
            <CardHeader className="text-center bg-gradient-to-r from-red-500 to-amber-500 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold flex items-center justify-center">
                <Shield className="w-8 h-8 mr-3" />
                Critical Safety Information
              </CardTitle>
              <CardDescription className="text-red-100 text-lg">
                Protect yourself and your investment with these essential security practices
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="font-bold text-2xl text-slate-900 flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                    Security Best Practices
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-slate-700"><strong>Never share your recovery phrase</strong> with anyone, ever</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-slate-700"><strong>Store recovery phrase offline</strong> in a secure location</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-slate-700"><strong>Always verify website URLs</strong> before connecting your wallet</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-slate-700"><strong>Start with small amounts</strong> while learning</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-slate-700"><strong>Use official MetaMask extension</strong> only from metamask.io</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-6">
                  <h3 className="font-bold text-2xl text-slate-900 flex items-center">
                    <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                    Common Scams to Avoid
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span className="text-slate-700"><strong>Fake MetaMask extensions</strong> or phishing websites</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span className="text-slate-700"><strong>Phishing emails</strong> asking for wallet details or recovery phrases</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span className="text-slate-700"><strong>Social media messages</strong> offering free tokens or "airdrops"</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span className="text-slate-700"><strong>Unsolicited investment advice</strong> or guaranteed returns</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span className="text-slate-700"><strong>Fake customer support</strong> asking for private keys</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <p className="text-slate-700 font-semibold">
                  <strong>Remember:</strong> ArmenianCoin team will NEVER ask for your private keys, recovery phrase, 
                  or passwords. Always verify communications through our official channels.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contract Information */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-slate-900">
                ARMT Token Contract Information
              </CardTitle>
              <CardDescription className="text-lg text-slate-600">
                Official contract details for ArmenianCoin (ARMT) on Ethereum
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Token Name</h4>
                    <p className="text-slate-700 font-mono bg-slate-50 p-2 rounded">ArmenianCoin</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Symbol</h4>
                    <p className="text-slate-700 font-mono bg-slate-50 p-2 rounded">ARMT</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Network</h4>
                    <p className="text-slate-700 font-mono bg-slate-50 p-2 rounded">Ethereum (ERC-20)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Total Supply</h4>
                    <p className="text-slate-700 font-mono bg-slate-50 p-2 rounded">1,000,000,000 ARMT</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-slate-600">
                  <strong>Note:</strong> Contract address will be provided upon token launch. 
                  Always verify the official contract address through our verified channels before making any transactions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-armenian-gradient animate-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 glow-text">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-amber-100 mb-10 leading-relaxed">
            Join thousands of Armenians worldwide who are already supporting families and children 
            in need through ArmenianCoin. Every purchase makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-amber-700 hover:bg-amber-50 shadow-2xl text-lg px-8 py-4 hover-lift">
              <Link href="/faq">
                View FAQ <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-amber-700 text-lg px-8 py-4 hover-lift shadow-xl">
              <Link href="/contact">
                Need Help?
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}