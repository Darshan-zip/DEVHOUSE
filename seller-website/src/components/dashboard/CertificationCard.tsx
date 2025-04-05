
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CertificationProps {
  name: string;
  issuer: string;
  date: string;
  icon?: string;
  onClick?: () => void;
}

const CertificationCard: React.FC<CertificationProps> = ({
  name,
  issuer,
  date,
  icon,
  onClick
}) => {
  return (
    <Card className="border border-eco-100">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-eco-100 flex items-center justify-center text-eco-600">
          {icon ? (
            <img src={icon} alt={name} className="h-8 w-8" />
          ) : (
            <Award size={24} />
          )}
        </div>
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>{issuer}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-eco-600">Issued: {date}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-eco-600 border-eco-200 hover:bg-eco-50"
          onClick={onClick}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CertificationCard;
