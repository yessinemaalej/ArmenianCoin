'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Globe, ChevronDown, ExternalLink, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import ProfileButton from '@/components/auth/ProfileButton';

type Language = 'en' | 'ru' | 'hy';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'hy', name: 'Հայերեն', flag: '🇦🇲' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Header');
  const { data: session, status } = useSession();

  // Get current language from URL
  const currentLanguage = languages.find(lang => pathname.startsWith(`/${lang.code}`))?.code || 'en';

  // Main navigation items (excluding contact and faq)
  const navigation = [
    { name: t('home'), href: '' },
    { name: t('about'), href: 'about' },
    { name: t('howToBuy'), href: 'how-to-buy' },
    { name: t('tokenomics'), href: 'tokenomics' },
    { name: t('charity'), href: 'charity' },
  ];

  // More menu items
  const moreMenuItems = [
    { name: t('faq'), href: 'faq' },
    { name: t('contact'), href: 'contact' },
  ];

  // Helper to build locale-aware hrefs
  const getLocaleHref = (href: string) => `/${currentLanguage}${href ? `/${href}` : ''}`;

  const isActive = (href: string) => {
    const localeHref = getLocaleHref(href);
    return pathname === localeHref;
  };

  const handleLanguageChange = (languageCode: Language) => {
    const segments = pathname.split('/');
    if (languages.some(lang => lang.code === segments[1])) {
      segments[1] = languageCode;
    } else {
      segments.splice(1, 0, languageCode);
    }
    const newPath = segments.join('/') || '/';
    router.push(newPath);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  const openUniswap = () => {
    window.open('https://app.uniswap.org/#/swap', '_blank');
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section: Logo + Price */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link href={getLocaleHref('')} className="flex items-center space-x-3 group">
              <div className="w-10 h-10 relative group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-amber-400 via-red-500 to-blue-600 p-0.5 animate-pulse-glow">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                    <Image
                      src="/logonobb.png"
                      alt="ArmenianCoin logonobb"
                      width={32}
                      height={32}
                      className="object-contain rounded-full"
                    />
                  </div>
                </div>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent group-hover:from-amber-700 group-hover:to-amber-900 transition-all">
                ArmenianCoin
              </span>
            </Link>

            {/* ARMT Price Display */}
            <div className="hidden xl:flex items-center bg-gradient-to-r from-amber-50 to-blue-50 px-4 py-2 rounded-lg border border-amber-200">
              <div className="text-sm">
                <span className="text-slate-600">ARMT:</span>
                <span className="font-bold text-amber-600 ml-1">$0.0024</span>
                <span className="text-green-500 text-xs ml-1">+5.2%</span>
              </div>
            </div>
          </div>

          {/* Center Section: Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={getLocaleHref(item.href)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover-lift ${
                  isActive(item.href)
                    ? 'text-amber-700 bg-amber-50 border-b-2 border-amber-600'
                    : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  <span>{t('more')}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {moreMenuItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      href={getLocaleHref(item.href)}
                      className="flex items-center cursor-pointer hover:bg-amber-50 hover:text-amber-700"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Section: Actions */}
          <div className="flex items-center space-x-3">
            {/* Uniswap Button - Only show when user is authenticated */}
            {session && (
              <Button
                onClick={openUniswap}
                size="sm"
                className="hidden md:flex bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover-lift"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                {t("swap")}
              </Button>
            )}

            {/* Authentication Section */}
            {session ? (
              // Show profile button if user is authenticated
              <ProfileButton />
            ) : (
              // Show sign in button if not authenticated
              <Button asChild size="sm" className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover-lift">
                <Link href="/auth/signin">
                  <User className="h-4 w-4 mr-2 sm:mr-1" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              </Button>
            )}

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition-colors min-w-[60px]"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-lg">{getCurrentLanguage().flag}</span>
                  <span className="hidden lg:inline text-sm font-medium">
                    {getCurrentLanguage().code.toUpperCase()}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`flex items-center space-x-3 cursor-pointer ${
                      currentLanguage === language.code
                        ? 'bg-amber-50 text-amber-700'
                        : 'hover:bg-amber-50 hover:text-amber-700'
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span className="font-medium">{language.name}</span>
                    {currentLanguage === language.code && (
                      <span className="ml-auto text-amber-600">✓</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-700 hover:text-amber-700"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-amber-100">
              {/* ARMT Price for Mobile */}
              <div className="px-3 py-2 bg-gradient-to-r from-amber-50 to-blue-50 rounded-md border border-amber-200 mb-2">
                <div className="text-sm text-center">
                  <span className="text-slate-600">ARMT:</span>
                  <span className="font-bold text-amber-600 ml-1">$0.0024</span>
                  <span className="text-green-500 text-xs ml-1">+5.2%</span>
                </div>
              </div>

              {/* Main Navigation */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={getLocaleHref(item.href)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-amber-700 bg-amber-50'
                      : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* More Menu Items */}
              {moreMenuItems.map((item) => (
                <Link
                  key={item.name}
                  href={getLocaleHref(item.href)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-amber-700 bg-amber-50'
                      : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              <div className="px-3 py-2 space-y-2">
                {session ? (
                  <Button 
                    onClick={() => router.push('/profile')}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg"
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </Button>
                ) : (
                  <Link href="/auth/signin">
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg">
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile Uniswap Button - Only show when user is authenticated */}
              {session && (
                <div className="px-3 py-2">
                  <Button
                    onClick={openUniswap}
                    size="sm"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Swap on Uniswap
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
