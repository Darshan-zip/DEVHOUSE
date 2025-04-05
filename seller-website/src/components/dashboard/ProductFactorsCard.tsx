
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Factor {
  label: string;
  positive: boolean;
}

interface ProductFactorsCardProps {
  factors: Factor[];
}

const ProductFactorsCard: React.FC<ProductFactorsCardProps> = ({ factors }) => {
  const positiveFactors = factors.filter(factor => factor.positive);
  const negativeFactors = factors.filter(factor => !factor.positive);
  
  return (
    <Card className="border border-eco-100">
      <CardHeader>
        <CardTitle className="text-eco-900">Product Factors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-green-600 mb-2">Positive Factors</h4>
          <div className="flex flex-wrap gap-2">
            {positiveFactors.map((factor, index) => (
              <Badge key={index} variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                {factor.label}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-red-600 mb-2">Areas for Improvement</h4>
          <div className="flex flex-wrap gap-2">
            {negativeFactors.map((factor, index) => (
              <Badge key={index} variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-200">
                {factor.label}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFactorsCard;
