import type { Metadata } from 'next';
import { PieChart, TrendingUp, Shield, Users, Heart, Coins, Target, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'ARMT Tokenomics - ArmenianCoin Distribution and Economics',
  description: 'Learn about ArmenianCoin (ARMT) tokenomics, distribution, charity allocation, and economic model. 10% of funds support Armenian families.',
};

export default function Tokenomics() {
  const t = useTranslations('TokenomicsPage');

  const tokenDistribution = [
    {
      category: t('publicSale'),
      percentage: 40,
      amount: '400,000,000',
      description: t('publicSaleDesc'),
      color: 'from-amber-500 to-amber-600',
      icon: Users,
    },
    {
      category: t('charityReserve'),
      percentage: 25,
      amount: '250,000,000',
      description: t('charityReserveDesc'),
      color: 'from-red-500 to-red-600',
      icon: Heart,
    },
    {
      category: t('development'),
      percentage: 15,
      amount: '150,000,000',
      description: t('developmentDesc'),
      color: 'from-blue-500 to-blue-600',
      icon: Target,
    },
    {
      category: t('teamAdvisors'),
      percentage: 10,
      amount: '100,000,000',
      description: t('teamAdvisorsDesc'),
      color: 'from-purple-500 to-purple-600',
      icon: Award,
    },
    {
      category: t('liquidityPool'),
      percentage: 10,
      amount: '100,000,000',
      description: t('liquidityPoolDesc'),
      color: 'from-green-500 to-green-600',
      icon: TrendingUp,
    },
  ];

  const charityAllocation = [
    {
      category: t('artsakhFamilies'),
      percentage: 40,
      description: t('artsakhFamiliesDesc'),
      icon: '🏠',
    },
    {
      category: t('childrenEducation'),
      percentage: 30,
      description: t('childrenEducationDesc'),
      icon: '📚',
    },
    {
      category: t('healthcareSupport'),
      percentage: 20,
      description: t('healthcareSupportDesc'),
      icon: '🏥',
    },
    {
      category: t('emergencyRelief'),
      percentage: 10,
      description: t('emergencyReliefDesc'),
      icon: '🚨',
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
            {t('title')}
          </h1>
          <p className="text-xl text-amber-100 leading-relaxed max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Token Overview */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('overviewTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('overviewDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center p-6 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
              <Coins className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-slate-900 mb-2">ARMT</CardTitle>
              <CardDescription className="text-slate-600">{t('tokenSymbol')}</CardDescription>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-slate-900 mb-2">ERC-20</CardTitle>
              <CardDescription className="text-slate-600">{t('ethereumStandard')}</CardDescription>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-slate-900 mb-2">1B</CardTitle>
              <CardDescription className="text-slate-600">{t('totalSupply')}</CardDescription>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
              <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-slate-900 mb-2">25%</CardTitle>
              <CardDescription className="text-slate-600">{t('charityReserve')}</CardDescription>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-red-500 via-blue-600 to-orange-500 p-1 rounded-2xl">
            <div className="bg-white rounded-xl p-8 text-center">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                {t('fixedSupplyTitle')}
              </h3>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                {t('fixedSupplyDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Token Distribution */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('distributionTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('distributionDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Distribution Chart Placeholder */}
            <div className="relative">
              <div className="w-full max-w-md mx-auto">
                <div className="relative w-80 h-80 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-blue-500 to-red-500 animate-pulse-glow"></div>
                  <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="w-16 h-16 text-amber-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-slate-900">1B ARMT</div>
                      <div className="text-slate-600">{t('totalSupply')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Distribution Details */}
            <div className="space-y-4">
              {tokenDistribution.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-all hover-lift border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg text-slate-900">{item.category}</h3>
                          <span className="text-2xl font-bold text-slate-900">{item.percentage}%</span>
                        </div>
                        <p className="text-slate-600 text-sm mb-2">{item.description}</p>
                        <p className="text-amber-600 font-semibold">{item.amount} ARMT</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Charity Fund Allocation */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('charityTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('charityDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {charityAllocation.map((item, index) => (
              <Card key={index} className="hover:shadow-xl transition-all hover-lift border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                    <span className="text-3xl mr-3">{item.icon}</span>
                    {item.category}
                    <span className="ml-auto text-2xl font-bold text-amber-600">{item.percentage}%</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-slate-700">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Card className="inline-block p-8 border-0 shadow-xl bg-gradient-to-br from-red-50 to-amber-50">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {t('continuousCharityTitle')}
                </h3>
                <p className="text-lg text-slate-700 mb-4">
                  {t('continuousCharityDesc')}
                </p>
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                  <p className="text-slate-600 font-semibold">
                    {t('continuousCharityNote')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Economic Model */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('economicTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('economicDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-white">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 mb-4">{t('deflationaryTitle')}</CardTitle>
              <CardDescription className="text-slate-700">
                {t('deflationaryDesc')}
              </CardDescription>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-white">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 mb-4">{t('communityTitle')}</CardTitle>
              <CardDescription className="text-slate-700">
                {t('communityDesc')}
              </CardDescription>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-white">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 mb-4">{t('impactTitle')}</CardTitle>
              <CardDescription className="text-slate-700">
                {t('impactDesc')}
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Vesting Schedule */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('vestingTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('vestingDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all hover-lift border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">{t('teamAdvisors')}</CardTitle>
                <CardDescription className="text-slate-600">{t('teamAdvisorsAmount')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
                    <span><strong>{t('vestingCliff')}</strong> {t('vestingCliffDesc')}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    <span><strong>{t('vestingLinear')}</strong> {t('vestingLinearDesc')}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    <span><strong>{t('vestingMonthly')}</strong> {t('vestingMonthlyDesc')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-all hover-lift border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">{t('charityReserve')}</CardTitle>
                <CardDescription className="text-slate-600">{t('charityReserveAmount')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                    <span><strong>{t('vestingImmediate')}</strong> {t('vestingImmediateDesc')}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
                    <span><strong>{t('vestingQuarterly')}</strong> {t('vestingQuarterlyDesc')}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    <span><strong>{t('vestingGoverned')}</strong> {t('vestingGovernedDesc')}</span>
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
                <Coins className="mr-2 h-5 w-5" />
                {t('ctaBuy')}
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-amber-700 text-lg px-8 py-4 hover-lift shadow-xl">
              <Link href="/charity">
                <Heart className="mr-2 h-5 w-5" />
                {t('ctaCharity')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}