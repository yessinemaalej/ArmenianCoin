import type { Metadata } from 'next';
import { PieChart, TrendingUp, Shield, Users, Heart, Coins, Target, Award, FileText, Rocket, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Tokenomics, Whitepaper & Roadmap - ArmenianToken (ARMT)',
  description: 'Complete documentation for ArmenianToken (ARMT): tokenomics, technical whitepaper, and development roadmap. Learn about our mission to support Armenian families.',
};

export default function TokenomicsWhitepaperRoadmap() {
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

  const whitepaperSections = [
    {
      title: t('visionTitle'),
      content: t('visionContent'),
      icon: Target,
      color: 'from-amber-500 to-amber-600',
    },
    {
      title: t('technologyTitle'),
      content: t('technologyContent'),
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: t('charitySystemTitle'),
      content: t('charitySystemContent'),
      icon: Heart,
      color: 'from-red-500 to-red-600',
    },
    {
      title: t('participateTitle'),
      content: t('participateContent'),
      icon: Users,
      color: 'from-green-500 to-green-600',
    },
  ];

  const roadmapPhases = [
    {
      phase: t('phase1'),
      title: t('phase1Title'),
      subtitle: t('phase1Subtitle'),
      status: 'completed',
      icon: Rocket,
      color: 'from-green-500 to-green-600',
      points: t.raw('phase1Points'),
    },
    {
      phase: t('phase2'),
      title: t('phase2Title'),
      subtitle: t('phase2Subtitle'),
      status: 'in-progress',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      points: t.raw('phase2Points'),
    },
    {
      phase: t('phase3'),
      title: t('phase3Title'),
      subtitle: t('phase3Subtitle'),
      status: 'upcoming',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      points: t.raw('phase3Points'),
    },
    {
      phase: t('phase4'),
      title: t('phase4Title'),
      subtitle: t('phase4Subtitle'),
      status: 'planned',
      icon: Award,
      color: 'from-amber-500 to-amber-600',
      points: t.raw('phase4Points'),
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'upcoming':
        return <MapPin className="w-5 h-5 text-amber-500" />;
      case 'planned':
        return <Users className="w-5 h-5 text-slate-400" />;
      default:
        return <MapPin className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return t('completed');
      case 'in-progress':
        return t('inProgress');
      case 'upcoming':
        return t('upcoming');
      case 'planned':
        return t('planned');
      default:
        return t('planned');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-amber-100 text-amber-800';
      case 'planned':
        return 'bg-slate-100 text-slate-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
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
                    alt="ArmenianToken Logo"
                    width={72}
                    height={72}
                    className="object-contain rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            {t('heroTitle')}
          </h1>
          <p className="text-xl text-amber-100 leading-relaxed max-w-3xl mx-auto">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50">
              <a href="#tokenomics">📊 {t('tabTokenomics')}</a>
            </Button>
            <Button asChild variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
              <a href="#whitepaper">📄 {t('tabWhitepaper')}</a>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <a href="#roadmap">🗺️ {t('tabRoadmap')}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* TOKENOMICS SECTION */}
      <section id="tokenomics" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              📊 {t('tokenomicsTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('tokenomicsDesc')}
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
          
          {/* Token Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
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

          {/* Charity Fund Allocation */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              {t('charityFundTitle')}
            </h3>
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
        </div>
      </section>

      {/* WHITEPAPER SECTION */}
      <section id="whitepaper" className="py-20 bg-gradient-to-br from-amber-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              📄 {t('whitepaperTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('whitepaperDesc')}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-red-500 via-blue-600 to-orange-500 p-1 rounded-2xl mb-12">
            <div className="bg-white rounded-xl p-8">
              <div className="flex items-center justify-center mb-6">
                <FileText className="w-12 h-12 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 text-center mb-4">
                {t('foundationTitle')}
              </h3>
              <p className="text-lg text-slate-700 text-center leading-relaxed">
                {t('foundationDesc')}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whitepaperSections.map((section, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all hover-lift border-0 shadow-lg bg-white">
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-r ${section.color} rounded-full flex items-center justify-center mb-4 animate-pulse-glow`}>
                    <section.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-slate-700 leading-relaxed">
                    {section.content}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technical Specifications */}
          <div className="mt-16 text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              {t('techSpecsTitle')}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-all hover-lift border-0 shadow-md">
              <div className="text-3xl font-bold text-amber-600 mb-2">ERC-20</div>
              <div className="text-slate-600 text-sm">{t('tokenStandard')}</div>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all hover-lift border-0 shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">Ethereum</div>
              <div className="text-slate-600 text-sm">{t('blockchainNetwork')}</div>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all hover-lift border-0 shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">1B</div>
              <div className="text-slate-600 text-sm">{t('totalSupply')}</div>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all hover-lift border-0 shadow-md">
              <div className="text-3xl font-bold text-red-600 mb-2">18</div>
              <div className="text-slate-600 text-sm">{t('decimals')}</div>
            </Card>
          </div>

          {/* Disclaimer */}
          <div className="mt-16">
            <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-red-50 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-slate-900">{t('disclaimerTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>{t('disclaimerStrong')}</strong>
                </p>
                <p className="text-base text-slate-600 leading-relaxed">
                  {t('disclaimerDesc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ROADMAP SECTION */}
      <section id="roadmap" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              🗺️ {t('roadmapTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('roadmapDesc')}
            </p>
          </div>
          
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-400 via-blue-500 to-red-500 rounded-full"></div>
            
            <div className="space-y-16">
              {roadmapPhases.map((phase, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <Card className="hover:shadow-2xl transition-all hover-lift border-0 shadow-lg bg-white">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-16 h-16 bg-gradient-to-r ${phase.color} rounded-full flex items-center justify-center animate-pulse-glow`}>
                            <phase.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(phase.status)}`}>
                            {getStatusText(phase.status)}
                          </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-slate-900">{phase.phase}</CardTitle>
                        <CardTitle className="text-xl font-bold text-amber-600">{phase.title}</CardTitle>
                        <CardDescription className="text-slate-600 font-medium">{phase.subtitle}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {phase.points.map((point: string, pointIndex: number) => (
                            <li key={pointIndex} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-700 leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="w-2/12 flex justify-center">
                    <div className="w-12 h-12 bg-white border-4 border-amber-400 rounded-full flex items-center justify-center shadow-lg z-10">
                      {getStatusIcon(phase.status)}
                    </div>
                  </div>
                  
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
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