import type { Metadata } from 'next';
import { CheckCircle, Wallet, Download, Link as LinkIcon, CreditCard, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: "Beginner's Guide - ArmenianCoin (ARMT)",
  description: 'Complete step-by-step guide to getting started with ArmenianCoin. Learn how to create a MetaMask wallet, fund it, and buy ARMT tokens safely.',
};

export default function Guide() {
  const t = useTranslations('GuidePage');

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
            {t('title')}
          </h1>
          <p className="text-xl text-amber-100 leading-relaxed">
            {t('subtitle')}
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
                {t('safetyTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-slate-900">{t('securityBest')}</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-600">⚠️</span>
                      <span className="text-sm text-slate-700">{t('security1')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-600">🔒</span>
                      <span className="text-sm text-slate-700">{t('security2')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-600">🌐</span>
                      <span className="text-sm text-slate-700">{t('security3')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-amber-600">💰</span>
                      <span className="text-sm text-slate-700">{t('security4')}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-slate-900">{t('commonScams')}</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">❌</span>
                      <span className="text-sm text-slate-700">{t('scam1')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">❌</span>
                      <span className="text-sm text-slate-700">{t('scam2')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">❌</span>
                      <span className="text-sm text-slate-700">{t('scam3')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500">❌</span>
                      <span className="text-sm text-slate-700">{t('scam4')}</span>
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
            {t('ctaTitle')}
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-amber-600 hover:bg-amber-50 shadow-lg">
              <Link href="/faq">
                {t('ctaFaq')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-amber-600 shadow-xl">
              <Link href="/">
                {t('ctaHome')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}