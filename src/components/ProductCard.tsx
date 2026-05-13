import { Heart, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  location: string;
  image: string;
  time: string;
}

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  onDelete?: (id: number) => void;
  onBuyNow?: (product: Product) => void;
}

const ProductCard = ({ product, isAdmin, isWishlisted, onToggleWishlist, onDelete, onBuyNow }: ProductCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className="group bg-cream/30 rounded-[2rem] overflow-hidden border border-gold/10 hover:border-gold/30 hover:shadow-[0_20px_40px_rgba(43,33,25,0.05)] transition-all duration-500 relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden m-2 rounded-[1.5rem]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-ivory/80 backdrop-blur-md rounded-full text-[9px] font-black text-gold uppercase tracking-widest shadow-sm border border-gold/5">
            {product.category}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-1.5 translate-x-0 sm:translate-x-12 sm:group-hover:translate-x-0 transition-transform duration-500 z-10">
          {isAdmin ? (
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete?.(product.id); }}
              className="p-2.5 bg-deep-brown text-ivory rounded-xl hover:bg-muted-brown transition-all shadow-lg"
            >
              <ArrowRight className="w-4 h-4 rotate-45" />
            </button>
          ) : (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist?.(product);
              }}
              className={cn(
                "p-2 sm:p-2.5 rounded-xl shadow-lg transition-all border",
                isWishlisted 
                  ? "bg-gold text-ivory border-gold" 
                  : "bg-ivory text-gold hover:text-deep-brown border-gold/10"
              )}
            >
              <Heart className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", isWishlisted && "fill-current")} />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4 pt-1 flex flex-col">
        <h3 className="font-serif text-deep-brown text-lg leading-tight group-hover:text-gold transition-colors line-clamp-1 mb-2">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-3 h-3 text-gold" />
          <span className="text-[10px] font-bold text-muted-brown uppercase tracking-widest">{product.location}</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-black text-deep-brown tracking-tighter">
            {product.price.startsWith('$') ? product.price.replace('$', '৳') : product.price}
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onBuyNow?.(product);
            }}
            className="bg-deep-brown text-ivory px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-muted-brown transition-all"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
