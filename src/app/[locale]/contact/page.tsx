import type { Metadata } from 'next';
import { Mail, MessageSquare, Shield, Globe, Copy, ExternalLink, Wallet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact & Wallet Info - ArmenianCoin (ARMT)',
  description: 'Get in touch with the ArmenianCoin team and find official wallet contract information for ARMT token.',
};

export default function Contact() {
  const contactMethods = [
    {
      title: 'Community Support',
      description: 'Join our global Armenian community for peer support and discussions',
      icon: MessageSquare,
      action: 'Join Telegram',
      link: '#',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Official Email',
      description: 'For official inquiries, partnerships, and technical support',
      icon: Mail,
      action: 'Send Email',
      link: 'mailto:info@armeniancoin.org',
      color: 'from-amber-500 to-amber-600',
    },
    {
      title: 'Security Issues',
      description: 'Report security vulnerabilities or suspicious activities',
      icon: Shield,
      action: 'Report Issue',
      link: 'mailto:security@armeniancoin.org',
      color: 'from-red-500 to-red-600',
    },
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      handle: '@ArmenianCoin',
      description: 'Latest updates and announcements',
      icon: '🐦',
      verified: true,
    },
    {
      name: 'Telegram',
      handle: '@ArmenianCoinOfficial',
      description: 'Community discussions and support',
      icon: '📱',
      verified: true,
    },
    {
      name: 'Discord',
      handle: 'ArmenianCoin Community',
      description: 'Real-time chat and community events',
      icon: '💬',
      verified: true,
    },
    {
      name: 'LinkedIn',
      handle: 'ArmenianCoin',
      description: 'Professional updates and partnerships',
      icon: '💼',
      verified: false,
    },
  ];

  const walletInfo = {
    contractAddress: 'Coming Soon',
    network: 'Ethereum Mainnet',
    symbol: 'ARMT',
    decimals: 18,
    totalSupply: '1,000,000,000',
  };

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
            Contact & Wallet Info
          </h1>
          <p className="text-xl text-amber-100 leading-relaxed max-w-3xl mx-auto">
            Get in touch with our team, join our community, and find official wallet 
            contract information for ArmenianCoin (ARMT).
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're here to help! Reach out through any of our official channels for 
              support, questions, or to join our global Armenian community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-2xl transition-all hover-lift border-0 shadow-lg bg-white">
                <div className={`w-20 h-20 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow`}>
                  <method.icon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-4">{method.title}</CardTitle>
                <CardDescription className="text-slate-700 mb-6 leading-relaxed">
                  {method.description}
                </CardDescription>
                <Button asChild className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover-lift">
                  <Link href={method.link}>
                    {method.action}
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Follow Our Official Channels
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Stay updated with the latest news, announcements, and community discussions 
              through our verified social media channels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {socialLinks.map((social, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{social.icon}</span>
                      <div>
                        <CardTitle className="text-xl font-bold text-slate-900">{social.name}</CardTitle>
                        <CardDescription className="text-slate-600">{social.handle}</CardDescription>
                      </div>
                    </div>
                    {social.verified && (
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                        Verified
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">{social.description}</p>
                  <Button variant="outline" size="sm" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                    Follow <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Wallet Contract Information */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Official Wallet Information
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Official contract details and wallet information for ArmenianCoin (ARMT). 
              Always verify through our official channels before making transactions.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-amber-50 to-blue-50">
              <CardHeader className="text-center bg-armenian-gradient text-white rounded-t-lg">
                <div className="flex justify-center mb-4">
                  <Wallet className="w-12 h-12" />
                </div>
                <CardTitle className="text-3xl font-bold">ARMT Token Contract</CardTitle>
                <CardDescription className="text-amber-100 text-lg">
                  Official ArmenianCoin (ARMT) smart contract information
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Token Name</h4>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <span className="font-mono text-slate-700">ArmenianCoin</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Symbol</h4>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <span className="font-mono text-slate-700">{walletInfo.symbol}</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Network</h4>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <span className="font-mono text-slate-700">{walletInfo.network}</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Decimals</h4>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <span className="font-mono text-slate-700">{walletInfo.decimals}</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Total Supply</h4>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <span className="font-mono text-slate-700">{walletInfo.totalSupply}</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Contract Address</h4>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <span className="font-mono text-slate-700">{walletInfo.contractAddress}</span>
                        <Button variant="ghost" size="sm" disabled>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-amber-100 rounded-lg border-l-4 border-amber-500">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Security Notice</h4>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        <strong>Always verify the contract address through our official channels before making any transactions.</strong> 
                        ArmenianCoin team will never ask for your private keys, recovery phrases, or passwords. 
                        Be cautious of scams and only use official contract addresses provided through verified sources.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-slate-600 mb-4">
                    Contract address will be announced upon token launch through all official channels.
                  </p>
                  <Button asChild className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover-lift">
                    <Link href="/how-to-buy">
                      Learn How to Buy ARMT
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Guidelines */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Security Guidelines
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Protect yourself and your investment by following these essential security practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                  <Shield className="w-6 h-6 text-green-600 mr-3" />
                  Do's
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <span>Always verify contract addresses through official channels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <span>Use official MetaMask extension from metamask.io</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <span>Store recovery phrases offline and securely</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <span>Double-check website URLs before connecting wallets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <span>Start with small amounts while learning</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                  <Shield className="w-6 h-6 text-red-600 mr-3" />
                  Don'ts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 text-xl">✗</span>
                    <span>Never share your recovery phrase with anyone</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 text-xl">✗</span>
                    <span>Don't click on suspicious links or emails</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 text-xl">✗</span>
                    <span>Avoid fake social media accounts or websites</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 text-xl">✗</span>
                    <span>Don't trust "too good to be true" offers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 text-xl">✗</span>
                    <span>Never give private keys to "customer support"</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-armenian-gradient animate-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 glow-text">
            Join Our Community
          </h2>
          <p className="text-xl text-amber-100 mb-10 leading-relaxed">
            Connect with thousands of Armenians worldwide who share our mission of supporting 
            families and children in need. Together, we can make a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-amber-700 hover:bg-amber-50 shadow-2xl text-lg px-8 py-4 hover-lift">
              <Link href="/how-to-buy">
                <Wallet className="mr-2 h-5 w-5" />
                Buy ARMT Now
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-amber-700 text-lg px-8 py-4 hover-lift shadow-xl">
              <Link href="/faq">
                Have Questions?
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}