
import React from 'react';
import { Leaf } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-full bg-eco-green/10 p-3">
        <Leaf className="text-eco-green" size={size === 'lg' ? 40 : size === 'md' ? 28 : 20} />
      </div>
      <h1 className={`font-semibold mt-2 text-eco-green ${sizeClasses[size]}`}>EcoAware</h1>
    </div>
  );
};

export default Logo;
