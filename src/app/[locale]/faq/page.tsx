'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const faqData = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'What is ArmenianCoin (ARMT)?',
        answer: 'ArmenianCoin (ARMT) is a cryptocurrency token designed to unite the global Armenian diaspora and support families and children in Armenia. Built on secure blockchain technology with Armenian cultural symbols (Mount Ararat, church, vine), ARMT provides holders with opportunities for growth while funding meaningful humanitarian initiatives within the Armenian community.',
      },
      {
        question: 'How do I buy ARMT tokens?',
        answer: 'To buy ARMT tokens, you need to: (1) Create a MetaMask wallet, (2) Fund it with ETH, (3) Connect your wallet to our platform, and (4) Swap ETH for ARMT tokens. Our beginner\'s guide provides detailed step-by-step instructions for each process, making it easy even for cryptocurrency newcomers.',
      },
      {
        question: 'Is it safe to invest in ArmenianCoin?',
        answer: 'While ARMT is built on secure Ethereum blockchain technology with audited smart contracts, all cryptocurrency investments carry inherent risks. Prices can be volatile, and you should never invest more than you can afford to lose. We recommend doing your own research and consulting with financial advisors before making any investment decisions.',
      },
    ],
  },
  {
    category: 'Technical Questions',
    questions: [
      {
        question: 'What blockchain is ARMT built on?',
        answer: 'ArmenianCoin (ARMT) is built on the Ethereum blockchain, which provides security, transparency, and compatibility with popular wallets like MetaMask. This ensures reliable transactions, easy integration with decentralized exchanges, and access to the robust Ethereum ecosystem.',
      },
      {
        question: 'What are the transaction fees?',
        answer: 'Transaction fees (gas fees) depend on the Ethereum network congestion at the time of your transaction. Fees typically range from $5-50 but can be higher during peak usage. We recommend checking current gas prices before making transactions and considering transactions during off-peak hours for lower fees.',
      },
      {
        question: 'Can I store ARMT in any wallet?',
        answer: 'Yes, ARMT can be stored in any Ethereum-compatible wallet, including MetaMask, Trust Wallet, Coinbase Wallet, and hardware wallets like Ledger or Trezor. Make sure to add the ARMT token contract address to see your balance in wallets that don\'t automatically detect it.',
      },
    ],
  },
  {
    category: 'Community & Mission',
    questions: [
      {
        question: 'How does ARMT support Armenian families?',
        answer: 'ARMT is designed with community support at its core. A portion of transaction fees and token reserves are allocated to humanitarian programs supporting Armenian families and children in Armenia. Token holders can participate in governance decisions about how these funds are distributed, ensuring transparency and community involvement.',
      },
      {
        question: 'How can I get involved in the ArmenianCoin community?',
        answer: 'You can join our global Armenian community through our official social media channels, participate in governance voting as a token holder, contribute to community discussions, and help spread awareness about our mission. We welcome all community members who share our values of family unity, cultural preservation, and helping those in need.',
      },
      {
        question: 'What if I need help or have problems?',
        answer: 'If you encounter any issues or need assistance, you can reach out through our official support channels. We have community moderators and technical support available to help with wallet setup, transactions, and general questions. Always verify you\'re contacting official support to avoid scams.',
      },
    ],
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

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
          <HelpCircle className="w-16 h-16 mx-auto mb-6 text-amber-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-amber-100 leading-relaxed">
            Find answers to common questions about ArmenianCoin, getting started with cryptocurrency, 
            and our mission to support Armenian families worldwide.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-amber-200">
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const itemId = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openItems.includes(itemId);
                    
                    return (
                      <Card key={questionIndex} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader 
                          className="cursor-pointer"
                          onClick={() => toggleItem(itemId)}
                        >
                          <CardTitle className="flex items-center justify-between text-lg font-semibold text-slate-900 hover:text-amber-600 transition-colors">
                            {faq.question}
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                            )}
                          </CardTitle>
                        </CardHeader>
                        
                        {isOpen && (
                          <CardContent className="pt-0">
                            <CardDescription className="text-base text-slate-700 leading-relaxed">
                              {faq.answer}
                            </CardDescription>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-8 bg-white border-0 shadow-lg">
            <CardHeader>
              <MessageSquare className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-slate-900">
                Still Need Help?
              </CardTitle>
              <CardDescription className="text-lg text-slate-600">
                Can't find the answer you're looking for? Our Armenian community and support team are here to help.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-2">Community Support</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Join our Armenian community channels for peer-to-peer help and discussions.
                  </p>
                  <Button variant="outline" size="sm" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                    Join Community
                  </Button>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-2">Technical Support</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Get help with wallet setup, transactions, and technical issues.
                  </p>
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-700 hover:bg-blue-50">
                    Contact Support
                  </Button>
                </div>
              </div>
              
              <div className="pt-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg">
                  <Link href="/guide">
                    View Beginner's Guide
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}