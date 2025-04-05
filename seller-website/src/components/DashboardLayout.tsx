
import React, { ReactNode } from 'react';
import DashboardSidebar from './DashboardSidebar';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Bell, User } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get user from localStorage (in a real app, you would use a proper auth system)
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  
  // Redirect to login if no user is found
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please login to access the dashboard.",
      });
    }
  }, [user, navigate, toast]);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-eco-50">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header bar */}
        <header className="bg-white border-b border-eco-100 h-16 flex items-center px-6 justify-between">
          <h1 className="text-2xl font-semibold text-eco-900">{title}</h1>
          
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-eco-100 text-eco-600">
              <Bell size={20} />
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-full hover:bg-eco-100">
                <div className="bg-eco-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="hidden md:inline text-sm font-medium">
                  {user.companyName || user.email}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
