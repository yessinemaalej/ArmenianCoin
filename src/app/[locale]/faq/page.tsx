'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

/*export const metadata: Metadata = {
  title: 'FAQ - ArmenianCoin (ARMT)',
  description: 'Frequently asked questions about ArmenianCoin, ARMT token, and our mission.',
};*/

export default function FAQ() {
  const t = useTranslations('FAQPage');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqData = [
    {
      category: t('gettingStarted'),
      questions: [
        {
          question: t('q1'),
          answer: t('a1'),
        },
        {
          question: t('q2'),
          answer: t('a2'),
        },
        {
          question: t('q3'),
          answer: t('a3'),
        },
      ],
    },
    {
      category: t('technicalQuestions'),
      questions: [
        {
          question: t('q4'),
          answer: t('a4'),
        },
        {
          question: t('q5'),
          answer: t('a5'),
        },
        {
          question: t('q6'),
          answer: t('a6'),
        },
      ],
    },
    {
      category: t('communityMission'),
      questions: [
        {
          question: t('q7'),
          answer: t('a7'),
        },
        {
          question: t('q8'),
          answer: t('a8'),
        },
        {
          question: t('q9'),
          answer: t('a9'),
        },
      ],
    },
  ];

  const toggleItem = (itemId: string) => {
    setOpenItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

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
                    src="/logonobb.png"
                    alt="ArmenianCoin logonobb"
                    width={56}
                    height={56}
                    className="object-contain rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <HelpCircle className="w-16 h-16 mx-auto mb-6 text-amber-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-amber-100 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-amber-200">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const itemId = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openItems.includes(itemId);
                    return (
                      <Card key={questionIndex} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader
                          className="cursor-pointer"
                          onClick={() => toggleItem(itemId)}
                        >
                          <CardTitle className="flex items-center justify-between text-lg font-semibold text-slate-900 hover:text-amber-600 transition-colors">
                            {faq.question}
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                            )}
                          </CardTitle>
                        </CardHeader>
                        {isOpen && (
                          <CardContent className="pt-0">
                            <CardDescription className="text-base text-slate-700 leading-relaxed">
                              {faq.answer}
                            </CardDescription>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-8 bg-white border-0 shadow-lg">
            <CardHeader>
              <MessageSquare className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-slate-900">
                {t('stillNeedHelp')}
              </CardTitle>
              <CardDescription className="text-lg text-slate-600">
                {t('stillNeedHelpDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-2">{t('communitySupport')}</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {t('communitySupportDesc')}
                  </p>
                  <Button variant="outline" size="sm" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                    {t('joinCommunity')}
                  </Button>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-2">{t('technicalSupport')}</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {t('technicalSupportDesc')}
                  </p>
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-700 hover:bg-blue-50">
                    {t('contactSupport')}
                  </Button>
                </div>
              </div>
              <div className="pt-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg">
                  <Link href="/guide">
                    {t('viewGuide')}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}