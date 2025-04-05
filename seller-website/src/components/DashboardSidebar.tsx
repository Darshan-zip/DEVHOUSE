
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Award, 
  BarChart3, 
  Settings, 
  LogOut
} from 'lucide-react';

const SidebarLink: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
  icon: React.ReactNode;
}> = ({ to, children, className, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
        isActive 
          ? 'bg-eco-500 text-white' 
          : 'text-eco-800 hover:bg-eco-100 hover:text-eco-700',
        className
      )}
    >
      <span className={cn(isActive ? 'text-white' : 'text-eco-600')}>{icon}</span>
      <span>{children}</span>
    </Link>
  );
};

const DashboardSidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-white border-r border-eco-100 flex flex-col">
      <div className="p-6">
        <Logo />
      </div>
      
      <div className="flex-1 px-3 py-4 space-y-1">
        <SidebarLink to="/dashboard" icon={<LayoutDashboard size={18} />}>
          Dashboard
        </SidebarLink>
        <SidebarLink to="/products" icon={<ShoppingBag size={18} />}>
          Products
        </SidebarLink>
        <SidebarLink to="/certifications" icon={<Award size={18} />}>
          Certifications
        </SidebarLink>
        <SidebarLink to="/analytics" icon={<BarChart3 size={18} />}>
          Analytics
        </SidebarLink>
        <SidebarLink to="/settings" icon={<Settings size={18} />}>
          Settings
        </SidebarLink>
      </div>
      
      <div className="p-4 border-t border-eco-100">
        <SidebarLink 
          to="/" 
          className="text-eco-700 hover:bg-eco-100" 
          icon={<LogOut size={18} />}
        >
          Logout
        </SidebarLink>
      </div>
    </div>
  );
};

export default DashboardSidebar;
