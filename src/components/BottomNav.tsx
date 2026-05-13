import { Home, Phone, Heart, ShoppingBag, User } from 'lucide-react';
import { cn } from '../utils/cn';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  cartCount: number;
}

const BottomNav = ({ activeTab, onTabChange, cartCount }: BottomNavProps) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'call', icon: Phone, label: 'Support' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'cart', icon: ShoppingBag, label: 'Cart', count: cartCount },
    { id: 'user', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-ivory/95 backdrop-blur-xl border-t border-gold/10 px-6 py-4 z-[80] lg:hidden shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex flex-col items-center gap-1.5 transition-all relative",
              activeTab === item.id ? "text-gold" : "text-muted-brown"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-full transition-all",
              activeTab === item.id ? "bg-cream/50" : "bg-transparent"
            )}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            
            {item.count !== undefined && item.count > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-deep-brown text-gold text-[9px] font-black rounded-full flex items-center justify-center border border-gold/20">
                {item.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
