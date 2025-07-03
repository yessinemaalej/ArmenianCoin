import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider,hasLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WalletProvider } from '@/contexts/WalletContext';
import AuthProvider from '@/components/auth/AuthProvider';
import {routing} from '../../i18n/routing';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArmenianCoin (ARMT) - With Heart, Soul and By the Law',
  description:
    'ArmenianCoin unites Armenians worldwide to support families and children from Artsakh and those in need. 10% of funds go to verified charity support. Built on Ethereum with 1B ARMT total supply.',
  keywords:
    'ArmenianCoin, ARMT, cryptocurrency, Armenia, Artsakh, diaspora, blockchain, charity, humanitarian, MetaMask',
  authors: [{ name: 'ArmenianCoin Team' }],
  openGraph: {
    title: 'ArmenianCoin (ARMT) - With Heart, Soul and By the Law',
    description:
      'Uniting Armenians worldwide to support families and children from Artsakh and those in need through cryptocurrency.',
    type: 'website',
  },
};


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-amber-50 text-slate-900 antialiased`}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AuthProvider>
          <WalletProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </WalletProvider>
        </AuthProvider>
      </NextIntlClientProvider>
    </body>
</html >
);
}