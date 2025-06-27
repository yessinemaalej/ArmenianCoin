import type { Metadata } from 'next';
import { Heart, Users, BookOpen, Building, TrendingUp, Award, CheckCircle, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Charity Reports - ArmenianCoin Impact on Armenian Families',
  description: 'View transparent reports on how ArmenianCoin supports Armenian families and children from Artsakh. 10% of funds go to verified charity support.',
};

export default function Charity() {
  const t = useTranslations('CharityPage');

  const impactStats = [
    {
      number: '1,250',
      label: t('familiesSupported'),
      description: t('familiesSupportedDesc'),
      icon: Users,
      color: 'from-red-500 to-red-600',
    },
    {
      number: '3,400',
      label: t('childrenHelped'),
      description: t('childrenHelpedDesc'),
      icon: Heart,
      color: 'from-blue-500 to-blue-600',
    },
    {
      number: '$485K',
      label: t('totalDistributed'),
      description: t('totalDistributedDesc'),
      icon: TrendingUp,
      color: 'from-amber-500 to-amber-600',
    },
    {
      number: '45',
      label: t('partnerOrganizations'),
      description: t('partnerOrganizationsDesc'),
      icon: Building,
      color: 'from-green-500 to-green-600',
    },
  ];

  const recentProjects = [
    {
      title: t('project1Title'),
      date: t('project1Date'),
      amount: '$125,000',
      beneficiaries: t('project1Beneficiaries'),
      description: t('project1Desc'),
      status: t('project1Status'),
      image: '🏠',
    },
    {
      title: t('project2Title'),
      date: t('project2Date'),
      amount: '$85,000',
      beneficiaries: t('project2Beneficiaries'),
      description: t('project2Desc'),
      status: t('project2Status'),
      image: '📚',
    },
    {
      title: t('project3Title'),
      date: t('project3Date'),
      amount: '$95,000',
      beneficiaries: t('project3Beneficiaries'),
      description: t('project3Desc'),
      status: t('project3Status'),
      image: '🏥',
    },
    {
      title: t('project4Title'),
      date: t('project4Date'),
      amount: '$45,000',
      beneficiaries: t('project4Beneficiaries'),
      description: t('project4Desc'),
      status: t('project4Status'),
      image: '🧥',
    },
  ];

  const partnerOrganizations = [
    {
      name: t('org1Name'),
      focus: t('org1Focus'),
      established: '1910',
      description: t('org1Desc'),
    },
    {
      name: t('org2Name'),
      focus: t('org2Focus'),
      established: '1993',
      description: t('org2Desc'),
    },
    {
      name: t('org3Name'),
      focus: t('org3Focus'),
      established: '2020',
      description: t('org3Desc'),
    },
    {
      name: t('org4Name'),
      focus: t('org4Focus'),
      established: '1906',
      description: t('org4Desc'),
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

      {/* Impact Statistics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('impactTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('impactDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-2xl transition-all hover-lift border-0 shadow-lg bg-white">
                <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-4xl font-bold text-slate-900 mb-2">{stat.number}</CardTitle>
                <CardDescription className="text-lg font-semibold text-slate-700 mb-3">{stat.label}</CardDescription>
                <p className="text-slate-600 text-sm">{stat.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('recentProjectsTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('recentProjectsDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all hover-lift border-0 shadow-lg bg-white">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-4xl">{project.image}</span>
                      <div>
                        <CardTitle className="text-xl font-bold text-slate-900">{project.title}</CardTitle>
                        <CardDescription className="text-slate-600">{project.date}</CardDescription>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      project.status === t('projectStatusCompleted') 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">{project.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">{project.amount}</div>
                      <div className="text-sm text-slate-600">{t('amountDistributed')}</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{project.beneficiaries}</div>
                      <div className="text-sm text-slate-600">{t('beneficiaries')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('transparencyTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('transparencyDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-xl transition-all hover-lift border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 mb-4">{t('verifiedRecipients')}</CardTitle>
              <CardDescription className="text-slate-700">
                {t('verifiedRecipientsDesc')}
              </CardDescription>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-xl transition-all hover-lift border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Target className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 mb-4">{t('blockchainTracking')}</CardTitle>
              <CardDescription className="text-slate-700">
                {t('blockchainTrackingDesc')}
              </CardDescription>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-xl transition-all hover-lift border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Award className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 mb-4">{t('impactReports')}</CardTitle>
              <CardDescription className="text-slate-700">
                {t('impactReportsDesc')}
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Partner Organizations */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('partnersTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('partnersDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerOrganizations.map((org, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">{org.name}</CardTitle>
                      <CardDescription className="text-amber-600 font-semibold">{org.focus}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500">{t('established')}</div>
                      <div className="font-bold text-slate-900">{org.established}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">{org.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fund Allocation */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('fundAllocationTitle')}
            </h2>
            <div className="bg-gradient-to-r from-red-500 via-blue-600 to-orange-500 p-1 rounded-2xl inline-block">
              <div className="bg-white rounded-xl px-8 py-6">
                <p className="text-2xl font-bold text-slate-900 mb-2">
                  {t('fundAllocationHighlight')}
                </p>
                <p className="text-lg text-slate-600">
                  {t('fundAllocationDesc')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-all hover-lift border-0 shadow-md bg-gradient-to-br from-red-50 to-red-100">
              <div className="text-4xl mb-3">🏠</div>
              <CardTitle className="text-lg font-bold text-slate-900 mb-2">{t('allocation1Percent')}</CardTitle>
              <CardDescription className="text-slate-700">{t('allocation1Label')}</CardDescription>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all hover-lift border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-4xl mb-3">📚</div>
              <CardTitle className="text-lg font-bold text-slate-900 mb-2">{t('allocation2Percent')}</CardTitle>
              <CardDescription className="text-slate-700">{t('allocation2Label')}</CardDescription>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all hover-lift border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
              <div className="text-4xl mb-3">🏥</div>
              <CardTitle className="text-lg font-bold text-slate-900 mb-2">{t('allocation3Percent')}</CardTitle>
              <CardDescription className="text-slate-700">{t('allocation3Label')}</CardDescription>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all hover-lift border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100">
              <div className="text-4xl mb-3">🚨</div>
              <CardTitle className="text-lg font-bold text-slate-900 mb-2">{t('allocation4Percent')}</CardTitle>
              <CardDescription className="text-slate-700">{t('allocation4Label')}</CardDescription>
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
                <Heart className="mr-2 h-5 w-5" />
                {t('ctaBuy')}
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-amber-700 text-lg px-8 py-4 hover-lift shadow-xl">
              <Link href="/about">
                {t('ctaLearn')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}