
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ticket, Copy, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PromoCodeGenerator: React.FC = () => {
  const { toast } = useToast();
  const [discountType, setDiscountType] = useState<string>('percentage');
  const [discountValue, setDiscountValue] = useState<string>('10');
  const [promoCode, setPromoCode] = useState<string>('');
  const [generatedCodes, setGeneratedCodes] = useState<Array<{code: string, type: string, value: string}>>([]);

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const prefix = 'ECO';
    let result = prefix;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPromoCode(result);
  };

  const handleGenerateCode = () => {
    generateRandomCode();
  };

  const handlePublishCode = () => {
    if (!promoCode || !discountValue) {
      toast({
        title: "Missing information",
        description: "Please generate a promo code and set a discount value.",
        variant: "destructive"
      });
      return;
    }

    const newCode = {
      code: promoCode,
      type: discountType,
      value: discountValue
    };

    setGeneratedCodes([...generatedCodes, newCode]);
    
    toast({
      title: "Promo code published!",
      description: `${promoCode} has been published to the promo codes website.`,
    });

    // Reset form
    setPromoCode('');
    setDiscountValue('10');
    setDiscountType('percentage');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: `${text} has been copied to your clipboard.`
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Promo Code Generator</CardTitle>
            <CardDescription>Create and publish promotion codes for your eco products</CardDescription>
          </div>
          <div className="h-10 w-10 bg-eco-100 rounded-full flex items-center justify-center text-eco-600">
            <Ticket size={20} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="promo-code">Promo Code</Label>
            <div className="flex gap-2">
              <Input 
                id="promo-code" 
                value={promoCode} 
                onChange={(e) => setPromoCode(e.target.value)} 
                placeholder="ECOSPRING20"
                className="flex-1"
              />
              <Button variant="outline" onClick={handleGenerateCode}>Generate</Button>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="discount-type">Discount Type</Label>
            <Select value={discountType} onValueChange={setDiscountType}>
              <SelectTrigger>
                <SelectValue placeholder="Select discount type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage (%)</SelectItem>
                <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                <SelectItem value="free-shipping">Free Shipping</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1 space-y-2">
            <Label htmlFor="discount-value">Discount Value</Label>
            <Input 
              id="discount-value" 
              type="number" 
              value={discountValue} 
              onChange={(e) => setDiscountValue(e.target.value)}
              disabled={discountType === 'free-shipping'}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-eco-500 hover:bg-eco-600"
          onClick={handlePublishCode}
          disabled={!promoCode}
        >
          Publish Promo Code
        </Button>
      </CardFooter>

      {generatedCodes.length > 0 && (
        <CardContent className="mt-4 border-t pt-4">
          <h4 className="font-medium mb-3">Recently Published Codes</h4>
          <div className="space-y-2 max-h-32 overflow-auto">
            {generatedCodes.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 rounded bg-eco-50">
                <div>
                  <span className="font-medium">{item.code}</span>
                  <span className="text-sm text-eco-600 ml-2">
                    {item.type === 'percentage' ? `${item.value}% Off` : 
                     item.type === 'fixed' ? `$${item.value} Off` : 'Free Shipping'}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(item.code)}>
                    <Copy size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default PromoCodeGenerator;
