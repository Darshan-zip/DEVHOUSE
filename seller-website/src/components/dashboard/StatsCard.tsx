
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm border border-eco-100 ${className}`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-eco-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {trend && (
            <div className="mt-2 flex items-center">
              <span className={`text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.positive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-xs text-eco-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        <div className="rounded-full bg-eco-100 p-3">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
