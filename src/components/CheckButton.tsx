
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface CheckButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const CheckButton: React.FC<CheckButtonProps> = ({ onClick, isLoading }) => {
  return (
    <Button 
      onClick={onClick} 
      disabled={isLoading}
      className="w-full bg-eco-green hover:bg-eco-green/90 text-white"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
          <span>Checking...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          <span>Check Product</span>
        </div>
      )}
    </Button>
  );
};

export default CheckButton;
