import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-amber-400 via-red-500 to-blue-600 p-0.5">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="ArmenianToken logo"
                      width={32}
                      height={32}
                      className="object-contain rounded-full"
                    />
                  </div>
                </div>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                ArmenianToken
              </span>
            </div>
            <p className="text-sm leading-6 text-slate-400">
              {t('brandSlogan')}
            </p>
            <div className="flex space-x-1">
              <div className="w-6 h-4 bg-red-600 rounded-sm"></div>
              <div className="w-6 h-4 bg-blue-600 rounded-sm"></div>
              <div className="w-6 h-4 bg-orange-500 rounded-sm"></div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-amber-400 mb-4">{t('navigationTitle')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-amber-400 transition-colors">
                  {t('navHome')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-amber-400 transition-colors">
                  {t('navAbout')}
                </Link>
              </li>
              <li>
                <Link href="/how-to-buy" className="text-sm hover:text-amber-400 transition-colors">
                  {t('navHowToBuy')}
                </Link>
              </li>
              <li>
                <Link href="/tokenomics" className="text-sm hover:text-amber-400 transition-colors">
                  {t('navTokenomics')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-amber-400 mb-4">{t('communityTitle')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/charity" className="text-sm hover:text-amber-400 transition-colors">
                  {t('navCharity')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:text-amber-400 transition-colors">
                  {t('navFAQ')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-amber-400 transition-colors">
                  {t('navContact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Token Info */}
          <div>
            <h3 className="font-semibold text-amber-400 mb-4">{t('tokenInfoTitle')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <span className="text-amber-400">🪙</span>
                <span>{t('tokenSymbol')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">⛓️</span>
                <span>{t('tokenNetwork')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">📊</span>
                <span>{t('tokenSupply')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-red-400">❤️</span>
                <span>{t('tokenCharity')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-center md:text-left text-slate-400">
              © 2025 ArmenianToken (ARMT). {t('copyright')}
            </p>
            <div className="text-xs text-slate-500 max-w-md text-center md:text-right">
              <p className="mb-2">
                <strong className="text-amber-400">{t('legalDisclaimerTitle')}</strong> {t('legalDisclaimer')}
              </p>
              <p>
                {t('legalAdvice')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}