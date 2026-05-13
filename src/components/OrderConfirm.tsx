import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderConfirmProps {
  onBackToHome: () => void;
}

const OrderConfirm = ({ onBackToHome }: OrderConfirmProps) => {
  const orderId = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="bg-ivory py-16 px-10 text-center rounded-[3rem]">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12 }}
        className="w-24 h-24 bg-cream text-gold rounded-full flex items-center justify-center mx-auto mb-10 border border-gold/10 shadow-xl"
      >
        <CheckCircle2 className="w-12 h-12" />
      </motion.div>

      <h2 className="text-4xl font-serif font-black text-deep-brown mb-4 tracking-tighter uppercase">Order Placed Successfully</h2>
      <p className="text-muted-brown mb-12 max-w-sm mx-auto italic text-lg">
        Thank you for choosing ZORÉ. Your order <strong>#{orderId}</strong> is now being processed.
      </p>

      <div className="bg-cream/40 rounded-[2.5rem] p-10 mb-12 space-y-6 border border-gold/10">
        <div className="flex items-center gap-6 text-left">
          <div className="w-12 h-12 bg-ivory rounded-2xl flex items-center justify-center shadow-md border border-gold/5">
            <Package className="w-6 h-6 text-gold" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-1">Status</p>
            <p className="text-deep-brown font-bold uppercase text-sm">Preparing Your Selection</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-left border-t border-gold/5 pt-6 text-sm">
          <div className="w-12 h-12 bg-ivory rounded-2xl flex items-center justify-center shadow-md border border-gold/5">
            <CheckCircle2 className="w-6 h-6 text-gold" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-1">Timeline</p>
            <p className="text-deep-brown font-bold uppercase text-sm">Delivery in 3-5 Working Days</p>
          </div>
        </div>
      </div>

      <button 
        onClick={onBackToHome}
        className="w-full py-6 bg-deep-brown text-ivory font-black rounded-2xl hover:bg-muted-brown transition-all shadow-2xl shadow-deep-brown/20 flex items-center justify-center gap-4 uppercase text-[10px] tracking-[0.3em]"
      >
        Continue Shopping
        <ArrowRight className="w-5 h-5 text-gold" />
      </button>
    </div>
  );
};

export default OrderConfirm;
