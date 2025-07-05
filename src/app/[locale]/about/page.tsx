"use client"
import { useTranslations } from 'next-intl';
import { Heart, Globe, Shield, Users, Target, Award, Coins } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default async function About() {
  const t =await useTranslations('AboutPage');

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
          <p className="text-2xl text-amber-100 mb-4 font-semibold">
            {t('subtitle')}
          </p>
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('missionTitle')}
            </h2>
            <div className="bg-gradient-to-r from-red-500 via-blue-600 to-orange-500 p-1 rounded-2xl inline-block">
              <div className="bg-white rounded-xl px-8 py-6">
                <p className="text-2xl font-bold text-slate-900 mb-2">
                  {t('missionSubtitle')}
                </p>
                <p className="text-lg text-slate-600">
                  {t('missionDescription')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">{t('whyTitle')}</h3>
              <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
                <p>{t('why1')}</p>
                <p>{t('why2')}</p>
                <p>{t('why3')}</p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/22A99A88-036C-4A09-A7C4-953B436D32CF.jpeg"
                alt="Global Armenian Community"
                width={600}
                height={450}
                className="w-full h-auto rounded-2xl shadow-2xl hover-lift"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('coreValuesTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('coreValuesSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover-lift bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl animate-pulse-glow">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">{t('heartSoulTitle')}</CardTitle>
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
                <CardTitle className="text-2xl font-bold text-slate-900">{t('globalUnityTitle')}</CardTitle>
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
                <CardTitle className="text-2xl font-bold text-slate-900">{t('byLawTitle')}</CardTitle>
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

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('howItWorksTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('howItWorksSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-xl transition-all hover-lift border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg font-bold mb-3 text-slate-900">{t('step1Title')}</CardTitle>
              <CardDescription className="text-slate-600">
                {t('step1Desc')}
              </CardDescription>
            </Card>
            <Card className="text-center p-6 hover:shadow-xl transition-all hover-lift border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <Target className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg font-bold mb-3 text-slate-900">{t('step2Title')}</CardTitle>
              <CardDescription className="text-slate-600">
                {t('step2Desc')}
              </CardDescription>
            </Card>
            <Card className="text-center p-6 hover:shadow-xl transition-all hover-lift border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg font-bold mb-3 text-slate-900">{t('step3Title')}</CardTitle>
              <CardDescription className="text-slate-600">
                {t('step3Desc')}
              </CardDescription>
            </Card>
            <Card className="text-center p-6 hover:shadow-xl transition-all hover-lift border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <Award className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg font-bold mb-3 text-slate-900">{t('step4Title')}</CardTitle>
              <CardDescription className="text-slate-600">
                {t('step4Desc')}
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('commitmentTitle')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('commitmentSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                  <Shield className="w-6 h-6 text-amber-600 mr-3" />
                  {t('transparencyPromiseTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-700">
                  {/* Add translated bullet points if needed */}
                </ul>
              </CardContent>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-all hover-lift border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                {/* Add more translated content if needed */}
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}