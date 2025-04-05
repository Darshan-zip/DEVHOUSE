
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const LandingHeader: React.FC = () => {
  return (
    <header className="border-b border-eco-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo size="md" />
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-eco-900 hover:text-eco-600 transition-colors">
            Features
          </a>
          <a href="#about" className="text-eco-900 hover:text-eco-600 transition-colors">
            About
          </a>
          <a href="#testimonials" className="text-eco-900 hover:text-eco-600 transition-colors">
            Testimonials
          </a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button className="bg-eco-500 hover:bg-eco-600" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
