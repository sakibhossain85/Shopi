import { X, MapPin, Clock, ShieldCheck, ShoppingCart, Share2 } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  location: string;
  image: string;
  time: string;
}

interface ProductDetailsProps {
  product: Product;
  onBuyNow: (product: Product) => void;
  onClose: () => void;
}

const ProductDetails = ({ product, onBuyNow, onClose }: ProductDetailsProps) => {
  return (
    <div className="bg-ivory">
      <div className="relative h-[45vh] sm:h-[60vh] overflow-hidden m-4 rounded-[2.5rem] border border-gold/10">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-ivory/80 backdrop-blur-xl rounded-full text-deep-brown shadow-2xl border border-gold/10"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-10 lg:p-16">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="px-4 py-1.5 bg-gold/10 border border-gold/30 text-gold rounded-full text-[10px] font-black uppercase tracking-widest">
            {product.category}
          </span>
          <div className="flex items-center gap-2 text-muted-brown font-medium text-xs tracking-wide">
            <Clock className="w-4 h-4 text-gold" />
            <span className="italic">Added {product.time}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-16">
          <div className="flex-1">
            <h2 className="text-5xl lg:text-7xl font-serif font-black text-deep-brown mb-6 tracking-tighter leading-[0.9]">{product.title}</h2>
            <div className="flex items-center gap-3 text-muted-brown mb-10">
              <MapPin className="w-6 h-6 text-gold" />
              <span className="font-bold text-xl uppercase tracking-[0.2em]">{product.location}</span>
            </div>
            
            <div className="prose prose-stone prose-lg text-muted-brown leading-relaxed mb-12 max-w-2xl">
              <p className="italic font-medium text-lg">A masterpiece of Zoré craftsmanship.</p>
              <p className="mt-4">
                Designed for the discerning individual, this {product.title} embodies our philosophy of timeless elegance and contemporary flair. 
                Utilizing only the finest atelier-sourced materials, it offers an unparalleled tactile experience and silhouette.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 border-t border-gold/10 pt-10">
              <div className="flex items-center gap-3 px-6 py-3 bg-cream/50 rounded-2xl text-deep-brown text-[10px] font-black uppercase tracking-widest border border-gold/5">
                <ShieldCheck className="w-4 h-4 text-gold" />
                Atelier Certified
              </div>
              <button className="flex items-center gap-3 px-6 py-3 bg-ivory rounded-2xl text-muted-brown text-[10px] font-black uppercase tracking-widest hover:bg-cream transition-all border border-gold/10">
                <Share2 className="w-4 h-4 text-gold" />
                Share Piece
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[420px] p-12 bg-deep-brown rounded-[3.5rem] border border-gold/20 shadow-2xl relative overflow-hidden shrink-0 self-start">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-4">Atelier Valuation</div>
              <div className="text-6xl font-black text-white mb-12 tracking-tighter">{product.price.replace('$', '৳')}</div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => onBuyNow(product)}
                  className="w-full py-6 bg-gold text-deep-brown font-black rounded-2xl hover:bg-ivory transition-all shadow-2xl text-sm tracking-widest uppercase"
                >
                  <div className="flex items-center justify-center gap-4">
                    <ShoppingCart className="w-6 h-6" />
                    BUY NOW
                  </div>
                </button>
              </div>

              <div className="mt-10 flex items-center justify-center gap-2 text-gold/40 text-[9px] font-black uppercase tracking-[0.3em]">
                <ShieldCheck className="w-3 h-3" /> Zoré Purchase Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
