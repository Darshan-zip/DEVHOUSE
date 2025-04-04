
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ConfidenceBadgeProps {
  percentage: number;
}

const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ percentage }) => {
  const getConfidenceColor = () => {
    if (percentage >= 80) return 'bg-eco-green text-white';
    if (percentage >= 60) return 'bg-eco-amber text-black';
    return 'bg-eco-red text-white';
  };

  const getProgressColor = () => {
    if (percentage >= 80) return 'bg-eco-green';
    if (percentage >= 60) return 'bg-eco-amber';
    return 'bg-eco-red';
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Confidence Level</span>
        <div className={cn("px-2 py-1 rounded-full text-xs font-medium", getConfidenceColor())}>
          {percentage}%
        </div>
      </div>
      <Progress value={percentage} className={cn("h-2", getProgressColor())} />
    </div>
  );
};

export default ConfidenceBadge;
