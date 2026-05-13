import { X, ChevronDown, ChevronRight, Home, ShoppingBag, Zap, Tag, Gift, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const Sidebar = ({ isOpen, onClose, onSelectCategory, selectedCategory }: SidebarProps) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  const menuItems = [
    { id: 'all', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'new', label: 'New Arrival', icon: Zap },
    { id: 'offer', label: 'Exclusive Offers', icon: Tag },
    { id: 'campaign', label: 'Campaigns', icon: Gift },
  ];

  const categories = ['Panjabi', 'Three Piece', 'Koti', 'Others'];

  const handleCategoryClick = (cat: string) => {
    onSelectCategory(cat);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-deep-brown/40 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[300px] bg-ivory z-[101] shadow-2xl flex flex-col border-r border-gold/10"
          >
            <div className="p-8 flex items-center justify-between">
              <span className="text-3xl font-serif font-black tracking-tighter text-gold">ZORÉ</span>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-cream rounded-full transition-colors text-muted-brown"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-6 text-left">
              <div className="space-y-1 mb-10">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'all') onSelectCategory('All');
                      onClose();
                    }}
                    className={cn(
                      "w-full flex items-center gap-4 px-4 py-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all",
                      (item.id === 'all' && selectedCategory === 'All') 
                        ? "bg-cream text-gold" 
                        : "text-muted-brown hover:bg-cream hover:text-deep-brown"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gold font-black text-[10px] uppercase tracking-[0.3em] mb-4"
                >
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-3.5 h-3.5" />
                    Categories
                  </div>
                  {isCategoriesOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>

                <AnimatePresence>
                  {isCategoriesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 space-y-1 ml-4 border-l border-gold/10">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={cn(
                              "w-full text-left px-8 py-3 text-[11px] font-bold tracking-widest uppercase transition-all",
                              selectedCategory === cat
                                ? "text-gold bg-cream/50"
                                : "text-muted-brown hover:text-deep-brown hover:bg-cream/30"
                            )}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="p-8 border-t border-gold/5">
              <div className="bg-deep-brown rounded-[2rem] p-6 text-ivory border border-gold/20 shadow-xl">
                <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-2">Campaign</p>
                <p className="text-sm font-serif mb-4 leading-relaxed tracking-wide italic">Join ZORÉ Rewards for exclusive access.</p>
                <button className="w-full py-3 bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
