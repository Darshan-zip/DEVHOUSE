
import React from 'react';
import { Leaf } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizeMap = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };
  
  const textSizeMap = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className="flex items-center gap-2">
      <div className="bg-eco-500 text-white rounded-md p-1">
        <Leaf className={`${sizeMap[size]}`} />
      </div>
      {showText && (
        <span className={`font-bold ${textSizeMap[size]} text-eco-900`}>
          EcoSellersHub
        </span>
      )}
    </div>
  );
};

export default Logo;
