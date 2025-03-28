
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Activity, Info, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300',
        scrolled ? 'bg-background/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-semibold"
        >
          <Activity className="h-6 w-6" />
          <span className="hidden sm:inline">DiagnosisAI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              location.pathname === '/' ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            Predictor
          </Link>
          <Link
            to="/about"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              location.pathname === '/about' ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            About
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg animate-fade-in">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/"
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                location.pathname === '/' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Predictor
            </Link>
            <Link
              to="/about"
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                location.pathname === '/about' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
