
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import CheckButton from '@/components/CheckButton';
import EcoResult from '@/components/EcoResult';
import { checkProductEcoFriendliness, getCurrentTabUrl } from '@/services/ecoCheckService';
import { Leaf } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{
    isEcoFriendly: boolean;
    confidencePercentage: number;
    productName: string;
  } | null>(null);
  const { toast } = useToast();

  const handleCheck = async () => {
    setLoading(true);
    try {
      const url = await getCurrentTabUrl();
      const checkResult = await checkProductEcoFriendliness(url);
      
      setResult(checkResult);
    } catch (error) {
      console.error("Error checking product:", error);
      toast({
        title: "Error",
        description: "Failed to check product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eco-extension bg-eco-bg min-h-screen flex flex-col p-4">
      <div className="flex flex-col items-center mt-4 mb-8">
        <Logo size="lg" />
        <p className="text-gray-600 text-sm mt-2 text-center">
          Check if products are eco-friendly with one click
        </p>
      </div>

      <div className="mb-6">
        <CheckButton onClick={handleCheck} isLoading={loading} />
      </div>

      {loading && !result && (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="animate-pulse-opacity">
            <Leaf className="h-16 w-16 text-eco-green/70" />
          </div>
          <p className="text-gray-500 mt-4 animate-pulse">Analyzing product...</p>
        </div>
      )}

      {!loading && !result && (
        <div className="flex flex-col items-center justify-center p-8 bg-white/50 rounded-lg border border-dashed">
          <div className="bg-eco-green/10 p-4 rounded-full">
            <Leaf className="h-10 w-10 text-eco-green/70" />
          </div>
          <h3 className="font-medium text-lg mt-4 text-center">Ready to check products</h3>
          <p className="text-gray-500 mt-2 text-center text-sm">
            Click the check button above to analyze the current product
          </p>
        </div>
      )}

      {result && (
        <EcoResult 
          isEcoFriendly={result.isEcoFriendly}
          confidencePercentage={result.confidencePercentage}
          productName={result.productName}
        />
      )}

      <div className="mt-auto pt-4 text-center text-xs text-gray-400">
        EcoAware Extension v1.0
      </div>
    </div>
  );
};

export default Index;
