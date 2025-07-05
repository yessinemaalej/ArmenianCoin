import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Shield, Users, Heart, TrendingUp, Wallet, Globe, Coins, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import PriceWidget from '@/components/PriceWidget';
import SwapWidget from '@/components/SwapWidget';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-armenian-gradient animate-gradient"></div>
        <div className="particles">
          {[...Array(9)].map((_, i) => (
            <div className="particle" key={i}></div>
          ))}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <div className="animate-slide-up opacity-0">
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 relative animate-float">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-amber-300 via-red-400 to-blue-500 p-1 animate-pulse-glow shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                    <Image
                      src="/logonobb.png"
                      alt="ArmenianCoin logonobb"
                      width={120}
                      height={120}
                      className="object-contain rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 glow-text animate-slide-up opacity-0 animate-delay-200">
              {t('welcome')}{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                {t('projectName')}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-amber-100 mb-4 animate-slide-up opacity-0 animate-delay-400">
              {t('slogan')}
            </p>
            <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-up opacity-0 animate-delay-600">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up opacity-0 animate-delay-800">
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-2xl text-lg px-8 py-4 hover-lift">
                <Link href="/how-to-buy">
                  {t('buyNow')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-amber-700 text-lg px-8 py-4 hover-lift shadow-xl">
                <Link href="/about">
                  {t('learnMore')}
                </Link>
              </Button>
            </div>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in opacity-0 animate-delay-800">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 hover-lift">
                <div className="text-2xl font-bold text-amber-300">ARMT</div>
                <div className="text-white/80 text-sm">{t('symbol')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 hover-lift">
                <div className="text-2xl font-bold text-amber-300">1B</div>
                <div className="text-white/80 text-sm">{t('totalSupply')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 hover-lift">
                <div className="text-2xl font-bold text-amber-300">ERC-20</div>
                <div className="text-white/80 text-sm">{t('ethereum')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 hover-lift">
                <div className="text-2xl font-bold text-amber-300">10%</div>
                <div className="text-white/80 text-sm">{t('toCharity')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price and Swap Section */}
      <section className="py-12 bg-gradient-to-r from-slate-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Price Widget */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 text-center lg:text-left">
                Live ARMT Price
              </h3>
              <PriceWidget />
            </div>
            
            {/* Swap Widget */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 text-center lg:text-left">
                Get ARMT Tokens
              </h3>
              <SwapWidget />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-amber-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('missionTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('missionDescription')}
            </p>
          </div>
          <div className="relative mb-16">
            <div className="w-full max-w-5xl mx-auto">
              <Image
                src="/22A99A88-036C-4A09-A7C4-953B436D32CF.jpeg"
                alt="Global Armenian Community United Around ArmenianCoin"
                width={1000}
                height={750}
                className="w-full h-auto rounded-3xl shadow-2xl hover-lift"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
          </div>
          <div className="text-center">
            <p className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed mb-8">
              {t('globalFamily')}
            </p>
            <div className="bg-gradient-to-r from-red-500 via-blue-600 to-orange-500 p-1 rounded-2xl inline-block">
              <div className="bg-white rounded-xl px-8 py-6">
                <p className="text-2xl font-bold text-slate-900">
                  {t('charityHighlight')}
                </p>
                <p className="text-slate-600 mt-2">{t('charitySubtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('valuesTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('valuesDescription')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover-lift bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl animate-pulse-glow">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">{t('heartSoul')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base text-slate-700 leading-relaxed">
                  {t('heartSoulDesc')}
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover-lift bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl animate-pulse-glow">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">{t('globalUnity')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base text-slate-700 leading-relaxed">
                  {t('globalUnityDesc')}
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover-lift bg-gradient-to-br from-amber-50 to-amber-100">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl animate-pulse-glow">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">{t('byLaw')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base text-slate-700 leading-relaxed">
                  {t('byLawDesc')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
                {t('featuresTitle')}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('featuresDescription')}
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-amber-600 rounded-full mt-2 animate-pulse"></div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{t('feature1Title')}</h3>
                    <p className="text-slate-600">{t('feature1Desc')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 animate-pulse"></div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{t('feature2Title')}</h3>
                    <p className="text-slate-600">{t('feature2Desc')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full mt-2 animate-pulse"></div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{t('feature3Title')}</h3>
                    <p className="text-slate-600">{t('feature3Desc')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-amber-600 rounded-full mt-2 animate-pulse"></div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{t('feature4Title')}</h3>
                    <p className="text-slate-600">{t('feature4Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all hover-lift">
                <TrendingUp className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2 text-slate-900">{t('growthPotential')}</h3>
                <p className="text-sm text-slate-600">{t('growthPotentialDesc')}</p>
              </Card>
              <Card className="text-center p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all hover-lift">
                <Wallet className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2 text-slate-900">{t('easyToHold')}</h3>
                <p className="text-sm text-slate-600">{t('easyToHoldDesc')}</p>
              </Card>
              <Card className="text-center p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all hover-lift">
                <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2 text-slate-900">{t('communityDriven')}</h3>
                <p className="text-sm text-slate-600">{t('communityDrivenDesc')}</p>
              </Card>
              <Card className="text-center p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all hover-lift">
                <Award className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2 text-slate-900">{t('verifiedImpact')}</h3>
                <p className="text-sm text-slate-600">{t('verifiedImpactDesc')}</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-armenian-gradient animate-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 glow-text">
            {t('joinMission')}
          </h2>
          <p className="text-xl text-amber-100 mb-10 leading-relaxed">
            {t('joinMissionDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-amber-700 hover:bg-amber-50 shadow-2xl text-lg px-8 py-4 hover-lift">
              <Link href="/how-to-buy">
                <Coins className="mr-2 h-5 w-5" />
                {t('buyNow')}
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-amber-700 text-lg px-8 py-4 hover-lift shadow-xl">
              <Link href="/charity">
                <Heart className="mr-2 h-5 w-5" />
                {t('viewCharityReports')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}