import { useState, useEffect } from 'react';
import { Search, Menu, User } from 'lucide-react';
import { cn } from '../utils/cn';

interface NavbarProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onMenuClick: () => void;
  isLoggedIn: boolean;
  userEmail: string | null;
  onLogout: () => void;
  onProfileClick: () => void;
  isAdmin?: boolean;
  onAdminClick?: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const Navbar = ({ onLoginClick, onSignUpClick, onMenuClick, isLoggedIn, userEmail, onLogout, onProfileClick, isAdmin, onAdminClick, searchQuery, onSearchChange }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 py-4',
        isScrolled ? 'bg-ivory/95 backdrop-blur-md border-b border-gold/10 py-3 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className={cn("text-2xl sm:text-3xl font-serif font-black tracking-tighter text-gold")}>
            ZORÉ
          </span>
        </div>

        <div className="flex-1 max-w-md mx-2 sm:mx-8">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-brown group-focus-within:text-gold transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="SEARCH..." 
              className="w-full bg-cream/50 border border-gold/5 rounded-xl py-2 pl-9 pr-2 sm:pl-10 sm:pr-4 text-[9px] sm:text-[10px] font-bold tracking-widest text-deep-brown focus:ring-1 focus:ring-gold transition-all outline-none h-9 sm:h-auto"
            />
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 shrink-0">
          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              {isAdmin && (
                <button 
                  onClick={onAdminClick}
                  className="text-[10px] font-black uppercase tracking-widest text-gold hover:text-deep-brown transition-colors"
                >
                  Admin Panel
                </button>
              )}
              <button 
                onClick={onProfileClick}
                className="flex items-center gap-2 px-3 py-1.5 bg-cream/50 rounded-full border border-gold/10 hover:border-gold/30 transition-all"
              >
                <div className="w-8 h-8 bg-deep-brown rounded-full flex items-center justify-center text-ivory text-xs font-bold">
                  {userEmail?.[0].toUpperCase()}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-deep-brown max-w-[100px] truncate">{userEmail?.split('@')[0]}</span>
              </button>
              <button 
                onClick={onLogout}
                className="text-[10px] font-black uppercase tracking-widest text-muted-brown hover:text-gold transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button 
                onClick={onLoginClick}
                className="p-2 text-deep-brown hover:text-gold transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
              <button 
                onClick={onSignUpClick}
                className="bg-deep-brown text-ivory px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-muted-brown transition-all shadow-md"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button 
            className="p-2 text-deep-brown hover:bg-cream rounded-xl transition-all"
            onClick={onMenuClick}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
