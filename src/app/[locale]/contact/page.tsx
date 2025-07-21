import type { Metadata } from 'next';
import { Mail, MessageSquare, Shield, Globe, Copy, ExternalLink, Wallet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Contact & Wallet Info - ArmenianToken (ARMT)',
  description: 'Get in touch with the ArmenianToken team and find official wallet contract information for ARMT token.',
};

export default function Contact() {
  const t = useTranslations('ContactPage');

  const contactMethods = [
    {
      title: t('communitySupportTitle'),
      description: t('communitySupportDesc'),
      icon: MessageSquare,
      action: t('communitySupportAction'),
      link: '#',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: t('officialEmailTitle'),
      description: t('officialEmailDesc'),
      icon: Mail,
      action: t('officialEmailAction'),
      link: 'mailto:info@armeniancoin.org',
      color: 'from-amber-500 to-amber-600',
    },
    {
      title: t('securityIssuesTitle'),
      description: t('securityIssuesDesc'),
      icon: Shield,
      action: t('securityIssuesAction'),
      link: 'mailto:security@armeniancoin.org',
      color: 'from-red-500 to-red-600',
    },
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      handle: '@ArmenianToken',
      description: t('twitterDesc'),
      icon: '🐦',
      verified: true,
    },
    {
      name: 'Telegram',
      handle: '@ArmenianCoinOfficial',
      description: t('telegramDesc'),
      icon: '📱',
      verified: true,
    },
    {
      name: 'Discord',
      handle: 'ArmenianToken Community',
      description: t('discordDesc'),
      icon: '💬',
      verified: true,
    },
    {
      name: 'LinkedIn',
      handle: 'ArmenianToken',
      description: t('linkedinDesc'),
      icon: '💼',
      verified: false,
    },
  ];

  const walletInfo = {
    contractAddress: t('walletContractAddress'),
    network: t('walletNetwork'),
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
                    src="/logo.png"
                    alt="ArmenianToken logo"
                    width={72}
                    height={72}
                    className="object-contain rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            {t('title')}
          </h1>
          <p className="text-xl text-amber-100 leading-relaxed max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('getInTouchTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('getInTouchDesc')}
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
              {t('followChannelsTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('followChannelsDesc')}
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
                        {t('verified')}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">{social.description}</p>
                  <Button variant="outline" size="sm" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                    {t('followAction')} <ExternalLink className="ml-2 h-4 w-4" />
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
              {t('walletInfoTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('walletInfoDesc')}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-amber-50 to-blue-50">
              <CardHeader className="text-center bg-armenian-gradient text-white rounded-t-lg">
                <div className="flex justify-center mb-4">
                  <Wallet className="w-12 h-12" />
                </div>
                <CardTitle className="text-3xl font-bold">{t('walletCardTitle')}</CardTitle>
                <CardDescription className="text-amber-100 text-lg">
                  {t('walletCardDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">{t('tokenName')}</h4>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <span className="font-mono text-slate-700">ArmenianToken</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">{t('symbol')}</h4>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <span className="font-mono text-slate-700">{walletInfo.symbol}</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">{t('network')}</h4>
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
                      <h4 className="font-semibold text-slate-900 mb-2">{t('decimals')}</h4>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <span className="font-mono text-slate-700">{walletInfo.decimals}</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">{t('totalSupply')}</h4>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <span className="font-mono text-slate-700">{walletInfo.totalSupply}</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">{t('contractAddress')}</h4>
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
                      <h4 className="font-semibold text-slate-900 mb-2">{t('securityNoticeTitle')}</h4>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {t('securityNoticeDesc')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-slate-600 mb-4">
                    {t('contractNotice')}
                  </p>
                  <Button asChild className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover-lift">
                    <Link href="/how-to-buy">
                      {t('learnHowToBuy')}
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
              {t('securityGuidelinesTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('securityGuidelinesDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                  <Shield className="w-6 h-6 text-green-600 mr-3" />
                  {t('dos')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <span>{t('do1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <span>{t('do2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <span>{t('do3')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <span>{t('do4')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <span>{t('do5')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                  <Shield className="w-6 h-6 text-red-600 mr-3" />
                  {t('donts')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 text-xl">✗</span>
                    <span>{t('dont1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 text-xl">✗</span>
                    <span>{t('dont2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 text-xl">✗</span>
                    <span>{t('dont3')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 text-xl">✗</span>
                    <span>{t('dont4')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 text-xl">✗</span>
                    <span>{t('dont5')}</span>
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
            {t('ctaTitle')}
          </h2>
          <p className="text-xl text-amber-100 mb-10 leading-relaxed">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-amber-700 hover:bg-amber-50 shadow-2xl text-lg px-8 py-4 hover-lift">
              <Link href="/how-to-buy">
                <Wallet className="mr-2 h-5 w-5" />
                {t('ctaBuy')}
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-amber-700 text-lg px-8 py-4 hover-lift shadow-xl">
              <Link href="/faq">
                {t('ctaFaq')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}