'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PriceData {
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

export default function PriceWidget() {
  const [priceData, setPriceData] = useState<PriceData>({
    price: 0.0024,
    change24h: 5.2,
    volume24h: 125000,
    marketCap: 2400000,
  });

  // Simulate price updates (in a real app, this would fetch from an API)
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceData(prev => ({
        ...prev,
        price: prev.price + (Math.random() - 0.5) * 0.0001,
        change24h: prev.change24h + (Math.random() - 0.5) * 0.5,
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return price.toFixed(6);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    }
    return `$${(volume / 1000).toFixed(0)}K`;
  };

  const getTrendIcon = () => {
    if (priceData.change24h > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (priceData.change24h < 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return <Minus className="h-4 w-4 text-slate-500" />;
  };

  const getChangeColor = () => {
    if (priceData.change24h > 0) return 'text-green-500';
    if (priceData.change24h < 0) return 'text-red-500';
    return 'text-slate-500';
  };

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-blue-50 border-amber-200 shadow-lg hover:shadow-xl transition-all hover-lift">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">ARMT</h3>
              <p className="text-xs text-slate-600">ArmenianToken</p>
            </div>
          </div>
          {getTrendIcon()}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900">
              ${formatPrice(priceData.price)}
            </span>
            <span className={`text-sm font-semibold ${getChangeColor()}`}>
              {priceData.change24h > 0 ? '+' : ''}{priceData.change24h.toFixed(2)}%
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-600">24h Volume:</span>
              <div className="font-semibold text-slate-900">
                {formatVolume(priceData.volume24h)}
              </div>
            </div>
            <div>
              <span className="text-slate-600">Market Cap:</span>
              <div className="font-semibold text-slate-900">
                {formatVolume(priceData.marketCap)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}