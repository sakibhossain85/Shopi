import { X, ShoppingBag, ArrowRight, Trash2, Minus, Plus, MapPin, Phone, User as UserIcon, ShieldCheck, Loader } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

interface CheckoutProps {
  cart: CartItem[];
  directProduct?: CartItem | null;
  user: any;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onConfirm: (customerData: any) => void;
  onBack: () => void;
}

const Checkout = ({ cart, directProduct, user, onRemove, onUpdateQuantity, onConfirm, onBack }: CheckoutProps) => {
  const [shippingArea, setShippingArea] = useState<'inside' | 'outside'>('inside');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [customerData, setCustomerData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const checkoutItems = directProduct ? [directProduct] : cart;

  const subtotal = checkoutItems.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    return acc + (price * item.quantity);
  }, 0);

  const shippingCharge = shippingArea === 'inside' ? 80 : 120;
  const discount = 0; 
  const total = subtotal + shippingCharge - discount;

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    // Validation with specific error messages
    if (!customerData.name?.trim()) {
      setErrorMessage('✗ Please enter your full name');
      return;
    }
    if (!customerData.phone?.trim()) {
      setErrorMessage('✗ Please enter your mobile number');
      return;
    }
    if (!/^[\d+\s-]{10,}$/.test(customerData.phone)) {
      setErrorMessage('✗ Please enter a valid phone number');
      return;
    }
    if (!customerData.address?.trim()) {
      setErrorMessage('✗ Please enter your delivery address');
      return;
    }

    // Show processing state immediately
    setIsProcessing(true);
    setErrorMessage('');

    // Simulate API processing with async/await
    try {
      // Simulate network delay (typically 500-1000ms for API calls)
      await new Promise(resolve => setTimeout(resolve, 600));

      // Call the parent's confirm handler
      onConfirm({ ...customerData, shippingArea, subtotal, shippingCharge, total });
    } catch (error) {
      setErrorMessage('✗ An error occurred while processing your order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="bg-ivory p-12 text-center py-32">
        <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center mx-auto mb-10 border border-gold/10">
          <ShoppingBag className="w-10 h-10 text-gold" />
        </div>
        <h3 className="text-3xl font-serif text-deep-brown mb-4 uppercase tracking-tighter">Your Cart is Empty</h3>
        <p className="text-muted-brown mb-10 italic">Your journey with ZORÉ begins here.</p>
        <button onClick={onBack} className="px-12 py-4 bg-deep-brown text-ivory font-black rounded-2xl hover:bg-muted-brown transition-all shadow-xl uppercase text-[10px] tracking-widest">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-ivory">
      <div className="p-8 sm:p-10 border-b border-gold/10 flex items-center justify-between sticky top-0 bg-ivory/95 backdrop-blur-xl z-10">
        <h2 className="text-3xl sm:text-4xl font-serif font-black text-deep-brown tracking-tighter uppercase">Checkout</h2>
        <button onClick={onBack} className="p-3 hover:bg-cream rounded-full transition-colors text-muted-brown">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6 sm:p-10">
        <form onSubmit={handleConfirm} className="space-y-10 mb-16">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-gold uppercase tracking-[0.3em] border-b border-gold/10 pb-4">Shipping Information</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-muted-brown uppercase tracking-widest mb-3">Full Name *</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                  <input
                    type="text"
                    required
                    value={customerData.name}
                    onChange={(e) => {
                      setCustomerData({...customerData, name: e.target.value});
                      setErrorMessage('');
                    }}
                    className="w-full pl-12 pr-6 py-4 bg-cream border border-gold/5 rounded-2xl outline-none focus:ring-1 focus:ring-gold text-deep-brown font-bold"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted-brown uppercase tracking-widest mb-3">Mobile Number *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                  <input
                    type="tel"
                    required
                    value={customerData.phone}
                    onChange={(e) => {
                      setCustomerData({...customerData, phone: e.target.value});
                      setErrorMessage('');
                    }}
                    className="w-full pl-12 pr-6 py-4 bg-cream border border-gold/5 rounded-2xl outline-none focus:ring-1 focus:ring-gold text-deep-brown font-bold"
                    placeholder="+880 17XX-XXXXXX"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted-brown uppercase tracking-widest mb-3">Delivery Address *</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                  <input
                    type="text"
                    required
                    value={customerData.address}
                    onChange={(e) => {
                      setCustomerData({...customerData, address: e.target.value});
                      setErrorMessage('');
                    }}
                    className="w-full pl-12 pr-6 py-4 bg-cream border border-gold/5 rounded-2xl outline-none focus:ring-1 focus:ring-gold text-deep-brown font-bold"
                    placeholder="House, Road, Area (Dhaka, Chattogram, etc.)"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-muted-brown uppercase tracking-widest mb-4">Select Zone *</label>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <button
                    type="button"
                    onClick={() => setShippingArea('inside')}
                    className={`py-5 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${shippingArea === 'inside' ? 'border-gold bg-cream text-gold shadow-lg shadow-gold/10' : 'border-gold/10 bg-transparent text-muted-brown'}`}
                  >
                    DHAKA (৳80)
                  </button>
                  <button
                    type="button"
                    onClick={() => setShippingArea('outside')}
                    className={`py-5 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${shippingArea === 'outside' ? 'border-gold bg-cream text-gold shadow-lg shadow-gold/10' : 'border-gold/10 bg-transparent text-muted-brown'}`}
                  >
                    OUTSIDE DHAKA (৳120)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
              <div className="flex-1">
                <p className="text-[13px] font-bold text-red-700">{errorMessage}</p>
              </div>
            </div>
          )}

          <button 
            type="submit"
            disabled={isProcessing}
            className={`w-full py-6 font-black rounded-[2.5rem] text-xs tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-2xl ${
              isProcessing 
                ? 'bg-gold/70 text-deep-brown cursor-not-allowed shadow-gold/20' 
                : 'bg-deep-brown text-ivory hover:bg-muted-brown shadow-deep-brown/20'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                PROCESSING...
              </>
            ) : (
              <>
                PLACE ORDER NOW
                <ArrowRight className="w-5 h-5 text-gold" />
              </>
            )}
          </button>
        </form>

        <div className="pt-12 border-t border-gold/10 space-y-10">
          <h3 className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">Review Your Order</h3>
          <div className="space-y-6">
            {checkoutItems.map((item) => (
              <div key={item.id} className="flex gap-4 sm:gap-6 items-center p-4 sm:p-6 bg-cream/30 rounded-[2rem] border border-gold/5">
                <img src={item.image} alt="" className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] object-cover shrink-0 border border-gold/10 shadow-sm" />
                <div className="flex-1">
                  <h4 className="font-serif text-deep-brown text-lg sm:text-xl leading-tight line-clamp-1 mb-1">{item.title}</h4>
                  <p className="text-gold font-black text-xs sm:text-sm">{item.price}</p>
                </div>
                {!directProduct ? (
                  <>
                    <div className="flex items-center gap-2 sm:gap-4 bg-ivory px-3 py-2 rounded-xl border border-gold/10 shadow-sm">
                      <button 
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:text-gold transition-colors text-muted-brown"
                      >
                        <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                      <span className="font-black text-deep-brown text-xs min-w-[15px] text-center">{item.quantity}</span>
                      <button 
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:text-gold transition-colors text-muted-brown"
                      >
                        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                    <button 
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="p-2 text-gold/30 hover:text-deep-brown transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-brown">Quantity: {item.quantity}</div>
                )}
              </div>
            ))}
          </div>

          <div className="p-8 sm:p-10 bg-deep-brown text-ivory rounded-[3rem] border border-gold/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mr-32 -mt-32"></div>
            <div className="space-y-5 relative z-10">
              <div className="flex justify-between text-gold/60 font-black text-[10px] uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-ivory">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gold/60 font-black text-[10px] uppercase tracking-widest">
                <span>Shipping Charge</span>
                <span className="text-ivory">৳{shippingCharge}</span>
              </div>
              <div className="flex justify-between text-gold/60 font-black text-[10px] uppercase tracking-widest">
                <span>Discount</span>
                <span className="text-ivory">-৳{discount}</span>
              </div>
              <div className="pt-8 border-t border-gold/10 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-2">Payable Amount</p>
                  <p className="text-4xl sm:text-5xl font-black text-white tracking-tighter">৳{total.toLocaleString()}</p>
                </div>
                <div className="hidden sm:flex bg-gold/10 border border-gold/30 px-4 py-1.5 rounded-full text-[8px] font-black text-gold uppercase tracking-widest items-center gap-2">
                  <ShieldCheck className="w-3 h-3" /> Secure ZORÉ Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
