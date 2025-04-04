
import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import ConfidenceBadge from './ConfidenceBadge';
import { cn } from '@/lib/utils';

interface EcoResultProps {
  isEcoFriendly: boolean;
  confidencePercentage: number;
  productName: string;
}

const EcoResult: React.FC<EcoResultProps> = ({ isEcoFriendly, confidencePercentage, productName }) => {
  return (
    <div className="rounded-lg border p-4 bg-white">
      <h2 className="font-medium text-lg mb-2 truncate" title={productName}>
        {productName}
      </h2>
      
      <div className={cn(
        "rounded-md p-3 mt-3 flex items-center gap-3",
        isEcoFriendly ? "bg-eco-green/10" : "bg-eco-red/10"
      )}>
        {isEcoFriendly ? (
          <CheckCircle2 className="text-eco-green h-8 w-8" />
        ) : (
          <XCircle className="text-eco-red h-8 w-8" />
        )}
        <div>
          <p className={cn(
            "font-semibold",
            isEcoFriendly ? "text-eco-green" : "text-eco-red"
          )}>
            {isEcoFriendly ? "Eco-Friendly" : "Not Eco-Friendly"}
          </p>
          <p className="text-sm text-gray-500">
            {isEcoFriendly 
              ? "This product meets eco-friendly standards" 
              : "This product doesn't meet eco-friendly standards"}
          </p>
        </div>
      </div>
      
      <div className="mt-4">
        <ConfidenceBadge percentage={confidencePercentage} />
      </div>
    </div>
  );
};

export default EcoResult;
