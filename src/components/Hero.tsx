import { ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Hero = ({ searchQuery: _searchQuery, onSearchChange: _onSearchChange }: HeroProps) => {
  return (
    <div className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center pt-24 sm:pt-32 pb-16 overflow-hidden bg-ivory">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gold/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-beige/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/50 border border-gold/10 backdrop-blur-md text-gold text-[9px] sm:text-[10px] font-black mb-6 sm:mb-8 uppercase tracking-[0.3em]">
              <span className="flex h-1.5 w-1.5 rounded-full bg-gold animate-ping"></span>
              PREMIUM BANGLADESHI FASHION
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-serif text-deep-brown leading-[0.9] mb-6 sm:mb-8 tracking-tighter">
              ZORÉ <br />
              <span className="text-gold italic font-light">COLLECTION</span>
            </h1>
            
            <p className="text-base sm:text-lg text-muted-brown mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium tracking-wide">
              Experience the pinnacle of Bangladeshi luxury. From handcrafted Panjabis to designer Three Pieces and Kotis, curated for the modern lifestyle.
            </p>

            <div className="flex flex-wrap gap-4 sm:gap-8 items-center justify-center lg:justify-start pt-4 border-t border-gold/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-brown text-left">Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gold" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-brown text-left">Island-wide Shipping</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden sm:block lg:block"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gold/5 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                alt="ZORÉ Luxury Fashion"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ivory/40 to-transparent"></div>
            </div>

            {/* Accent Card */}
            <div className="absolute -bottom-8 -left-4 sm:-left-8 p-6 sm:p-8 bg-cream/90 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-xl max-w-[200px] sm:max-w-[240px]">
              <p className="text-[9px] sm:text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-2">New Arrivals</p>
              <h3 className="text-lg sm:text-xl font-serif text-deep-brown mb-1 leading-tight">Handcrafted Pieces</h3>
              <p className="text-muted-brown text-[10px] sm:text-[11px] font-medium tracking-wide italic">Authentic Bangladeshi craft.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
