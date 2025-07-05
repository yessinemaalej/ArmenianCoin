import type { Metadata } from 'next';
import { CheckCircle, Wallet, Download, Link as LinkIcon, CreditCard, ArrowRight, AlertTriangle, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'How to Buy ARMT - ArmenianCoin Purchase Guide',
  description: 'Complete step-by-step guide to purchasing ArmenianCoin (ARMT). Learn how to create a MetaMask wallet, fund it, and buy ARMT tokens safely.',
};

export default function HowToBuy() {
  const t = useTranslations('HowToBuyPage');

  const steps = [
    {
      number: 1,
      title: t('step1Title'),
      description: t('step1Desc'),
      icon: Wallet,
      content: [
        t('step1a'),
        t('step1b'),
        t('step1c'),
        t('step1d'),
        t('step1e'),
      ],
    },
    {
      number: 2,
      title: t('step2Title'),
      description: t('step2Desc'),
      icon: CreditCard,
      content: [
        t('step2a'),
        t('step2b'),
        t('step2c'),
        t('step2d'),
        t('step2e'),
      ],
    },
    {
      number: 3,
      title: t('step3Title'),
      description: t('step3Desc'),
      icon: LinkIcon,
      content: [
        t('step3a'),
        t('step3b'),
        t('step3c'),
        t('step3d'),
        t('step3e'),
      ],
    },
    {
      number: 4,
      title: t('step4Title'),
      description: t('step4Desc'),
      icon: CheckCircle,
      content: [
        t('step4a'),
        t('step4b'),
        t('step4c'),
        t('step4d'),
        t('step4e'),
        t('step4f'),
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
                    src="/logonobb.png"
                    alt="ArmenianCoin logonobb"
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

      {/* Quick Info */}
      <section className="py-12 bg-gradient-to-r from-amber-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center p-4 hover:shadow-lg transition-all hover-lift border-0 shadow-md">
              <div className="text-2xl font-bold text-amber-600 mb-1">ARMT</div>
              <div className="text-slate-600 text-sm">{t('tokenSymbol')}</div>
            </Card>
            <Card className="text-center p-4 hover:shadow-lg transition-all hover-lift border-0 shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-1">ERC-20</div>
              <div className="text-slate-600 text-sm">{t('ethereumNetwork')}</div>
            </Card>
            <Card className="text-center p-4 hover:shadow-lg transition-all hover-lift border-0 shadow-md">
              <div className="text-2xl font-bold text-red-600 mb-1">1B</div>
              <div className="text-slate-600 text-sm">{t('totalSupply')}</div>
            </Card>
            <Card className="text-center p-4 hover:shadow-lg transition-all hover-lift border-0 shadow-md">
              <div className="text-2xl font-bold text-green-600 mb-1">10%</div>
              <div className="text-slate-600 text-sm">{t('toCharity')}</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('stepsTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('stepsSubtitle')}
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
                {t('safetyTitle')}
              </CardTitle>
              <CardDescription className="text-red-100 text-lg">
                {t('safetySubtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="font-bold text-2xl text-slate-900 flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                    {t('securityBest')}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-slate-700">{t('security1')}</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-slate-700">{t('security2')}</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-slate-700">{t('security3')}</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-slate-700">{t('security4')}</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-slate-700">{t('security5')}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-6">
                  <h3 className="font-bold text-2xl text-slate-900 flex items-center">
                    <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                    {t('commonScams')}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span className="text-slate-700">{t('scam1')}</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span className="text-slate-700">{t('scam2')}</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span className="text-slate-700">{t('scam3')}</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span className="text-slate-700">{t('scam4')}</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span className="text-slate-700">{t('scam5')}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <p className="text-slate-700 font-semibold">
                  <strong>{t('remember')}</strong> {t('rememberDesc')}
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
                {t('contractInfoTitle')}
              </CardTitle>
              <CardDescription className="text-lg text-slate-600">
                {t('contractInfoDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">{t('tokenName')}</h4>
                    <p className="text-slate-700 font-mono bg-slate-50 p-2 rounded">ArmenianCoin</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">{t('symbol')}</h4>
                    <p className="text-slate-700 font-mono bg-slate-50 p-2 rounded">ARMT</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">{t('network')}</h4>
                    <p className="text-slate-700 font-mono bg-slate-50 p-2 rounded">Ethereum (ERC-20)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">{t('totalSupply')}</h4>
                    <p className="text-slate-700 font-mono bg-slate-50 p-2 rounded">1,000,000,000 ARMT</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-slate-600">
                  <strong>{t('contractNoteStrong')}</strong> {t('contractNote')}
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
            {t('ctaTitle')}
          </h2>
          <p className="text-xl text-amber-100 mb-10 leading-relaxed">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-amber-700 hover:bg-amber-50 shadow-2xl text-lg px-8 py-4 hover-lift">
              <Link href="/faq">
                {t('ctaFaq')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-amber-700 text-lg px-8 py-4 hover-lift shadow-xl">
              <Link href="/contact">
                {t('ctaHelp')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}