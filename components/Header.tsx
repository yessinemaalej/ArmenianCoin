'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

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
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'How to Buy', href: '/how-to-buy' },
    { name: 'Tokenomics', href: '/tokenomics' },
    { name: 'Charity Reports', href: '/charity' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLanguageChange = (languageCode: Language) => {
    setCurrentLanguage(languageCode);
    // Here you would typically implement actual language switching logic
    // For now, we'll just update the state
    console.log(`Language changed to: ${languageCode}`);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* logonobg */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 relative group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-amber-400 via-red-500 to-blue-600 p-0.5 animate-pulse-glow">
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <Image
                    src="/logonobg.png"
                    alt="ArmenianCoin logonobg"
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover-lift ${
                  isActive(item.href)
                    ? 'text-amber-700 bg-amber-50 border-b-2 border-amber-600'
                    : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Selector and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-lg">{getCurrentLanguage().flag}</span>
                  <span className="hidden sm:inline text-sm font-medium">
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
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
}