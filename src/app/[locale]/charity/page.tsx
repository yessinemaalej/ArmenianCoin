'use client';

import { useEffect, useState } from 'react';
import { Heart, Users, BookOpen, Building, TrendingUp, Award, CheckCircle, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';

interface CharityStat {
  id: string;
  key: string;
  value: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

interface CharityProject {
  id: string;
  title: string;
  date: string;
  amount: string;
  beneficiaries: string;
  description: string;
  status: 'COMPLETED' | 'ONGOING' | 'PLANNED';
  image: string;
}

interface CharityPartner {
  id: string;
  name: string;
  focus: string;
  established: string;
  description: string;
}

interface CharityAllocation {
  id: string;
  category: string;
  percentage: number;
  description: string;
  icon: string;
}

interface CharityData {
  stats: CharityStat[];
  projects: CharityProject[];
  partners: CharityPartner[];
  allocations: CharityAllocation[];
}

export default function Charity() {
  const t = useTranslations('CharityPage');
  const [charityData, setCharityData] = useState<CharityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const CHARITY_WALLET = '0x63d3454b04e40a319af6de6b2b3f361b637b9181'; // Replace with your wallet address
const ETHERSCAN_API_KEY = 'QH299S8EI3421J8VTUQYY2ZP6P9YKN9G2I'; // Replace with your Etherscan API key
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [lastTx, setLastTx] = useState<any>(null);
   useEffect(() => {
    // Fetch wallet balance
    fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${CHARITY_WALLET}&tag=latest&apikey=${ETHERSCAN_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "1") {
          setWalletBalance((parseFloat(data.result) / 1e18).toFixed(4)); // ETH
        }
      });

    // Fetch last transaction
    fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${CHARITY_WALLET}&startblock=0&endblock=99999999&page=1&offset=1&sort=desc&apikey=${ETHERSCAN_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "1" && data.result.length > 0) {
          setLastTx(data.result[0]);
        }
      });
  }, []);
  useEffect(() => {
    const fetchCharityData = async () => {
      try {
        console.log('Fetching charity data from:', '/api/charity');
        const response = await fetch('/api/charity');
        if (!response.ok) {
          console.error('Charity API response not OK:', response.status, response.statusText);
          throw new Error('Failed to fetch charity data');
        }
        const data = await response.json();
        console.log('Charity data received:', data);
        setCharityData(data);
      } catch (err) {
        console.error('Error fetching charity data:', err);
        setError('Failed to load charity information. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharityData();
  }, []);

  // Helper function to get icon component based on string name
  const getIconComponent = (iconName: string, className: string = "w-10 h-10 text-white") => {
    switch (iconName) {
      case 'Heart': return <Heart className={className} />;
      case 'Users': return <Users className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Building': return <Building className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'Award': return <Award className={className} />;
      case 'CheckCircle': return <CheckCircle className={className} />;
      case 'Target': return <Target className={className} />;
      default: return <Heart className={className} />;
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
       {/* Charity Wallet Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Charity Wallet
          </h2>
          <p className="text-slate-600 mb-2">
            Address: <span className="font-mono">{CHARITY_WALLET}</span>
          </p>
          <p className="text-slate-600 mb-2">
            Balance: <span className="font-bold">{walletBalance ? `${walletBalance} ETH` : 'Loading...'}</span>
          </p>
          {lastTx && (
            <div className="mt-4 text-left inline-block">
              <div className="text-slate-700 text-sm mb-1">Last Transaction:</div>
              <div className="bg-slate-50 p-4 rounded shadow text-xs">
                <div>Hash: <span className="font-mono">{lastTx.hash}</span></div>
                <div>From: <span className="font-mono">{lastTx.from}</span></div>
                <div>To: <span className="font-mono">{lastTx.to}</span></div>
                <div>Value: <span>{(parseFloat(lastTx.value) / 1e18).toFixed(4)} ETH</span></div>
                <div>Date: <span>{new Date(lastTx.timeStamp * 1000).toLocaleString()}</span></div>
              </div>
            </div>
          )}
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
            {isLoading ? (
              // Skeleton loaders for stats
              Array(4).fill(0).map((_, index) => (
                <Card key={index} className="text-center p-8 hover:shadow-2xl transition-all hover-lift border-0 shadow-lg bg-white">
                  <div className="flex justify-center mb-6">
                    <Skeleton className="w-20 h-20 rounded-full" />
                  </div>
                  <Skeleton className="h-8 w-32 mx-auto mb-2" />
                  <Skeleton className="h-6 w-48 mx-auto mb-3" />
                  <Skeleton className="h-4 w-40 mx-auto" />
                </Card>
              ))
            ) : error ? (
              <div className="col-span-4 text-center text-red-500">
                {error}
              </div>
            ) : (
              charityData?.stats.map((stat) => (
                <Card key={stat.id} className="text-center p-8 hover:shadow-2xl transition-all hover-lift border-0 shadow-lg bg-white">
                  <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow`}>
                    {getIconComponent(stat.icon)}
                  </div>
                  <CardTitle className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-slate-700 mb-3">{stat.label}</CardDescription>
                  <p className="text-slate-600 text-sm">{stat.description}</p>
                </Card>
              ))
            )}
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
            {isLoading ? (
              // Skeleton loaders for projects
              Array(4).fill(0).map((_, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all hover-lift border-0 shadow-lg bg-white">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div>
                          <Skeleton className="h-6 w-40 mb-2" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-20 rounded-lg" />
                      <Skeleton className="h-20 rounded-lg" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : error ? (
              <div className="col-span-2 text-center text-red-500">
                {error}
              </div>
            ) : (
              charityData?.projects.map((project) => (
                <Card key={project.id} className="hover:shadow-2xl transition-all hover-lift border-0 shadow-lg bg-white">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-4xl">{project.image}</span>
                        <div>
                          <CardTitle className="text-xl font-bold text-slate-900">{project.title}</CardTitle>
                          <CardDescription className="text-slate-600">
                            {new Date(project.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long'
                            })}
                          </CardDescription>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        project.status === 'COMPLETED' 
                          ? 'bg-green-100 text-green-800' 
                          : project.status === 'ONGOING'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {t(`projectStatus${project.status}`)}
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
              ))
            )}
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
            {isLoading ? (
              // Skeleton loaders for partners
              Array(4).fill(0).map((_, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6 mt-2" />
                    <Skeleton className="h-4 w-4/6 mt-2" />
                  </CardContent>
                </Card>
              ))
            ) : error ? (
              <div className="col-span-2 text-center text-red-500">
                {error}
              </div>
            ) : (
              charityData?.partners.map((org) => (
                <Card key={org.id} className="p-6 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-white">
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
              ))
            )}
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
            {isLoading ? (
              // Skeleton loaders for allocations
              Array(4).fill(0).map((_, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-all hover-lift border-0 shadow-md">
                  <Skeleton className="h-12 w-12 rounded-full mx-auto mb-3" />
                  <Skeleton className="h-6 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </Card>
              ))
            ) : error ? (
              <div className="col-span-4 text-center text-red-500">
                {error}
              </div>
            ) : (
              charityData?.allocations.map((allocation) => (
                <Card key={allocation.id} className="text-center p-6 hover:shadow-lg transition-all hover-lift border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100">
                  <div className="text-4xl mb-3">{allocation.icon}</div>
                  <CardTitle className="text-lg font-bold text-slate-900 mb-2">{allocation.percentage}%</CardTitle>
                  <CardDescription className="text-slate-700">{allocation.category}</CardDescription>
                </Card>
              ))
            )}
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