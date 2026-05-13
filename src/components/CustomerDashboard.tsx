import { ShoppingBag, Package, Clock, CheckCircle2, Truck, X, Trash2, Minus, Plus, Phone } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface Order {
  id: string;
  date: string;
  items: any[];
  total: number;
  payment: string;
  status: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface CustomerDashboardProps {
  cart: any[];
  orders: Order[];
  userEmail: string | null;
  onRemoveFromCart: (id: number) => void;
  onUpdateCartQuantity: (id: number, delta: number) => void;
  onCheckout: () => void;
  onBack: () => void;
}

const CustomerDashboard = ({ 
  cart, 
  orders, 
  userEmail, 
  onRemoveFromCart, 
  onUpdateCartQuantity, 
  onCheckout,
  onBack 
}: CustomerDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'cart' | 'orders'>('cart');

  const subtotal = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    return acc + (price * item.quantity);
  }, 0);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'text-gold border-gold/20 bg-gold/5';
      case 'processing': return 'text-deep-brown border-gold/30 bg-cream';
      case 'shipped': return 'text-gold border-gold/40 bg-deep-brown';
      case 'delivered': return 'text-ivory border-gold/50 bg-gold';
      default: return 'text-muted-brown border-gold/10 bg-cream/30';
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-ivory flex flex-col z-[150] overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-gold/10 flex items-center justify-between bg-ivory shrink-0">
        <div className="flex items-center gap-4 sm:gap-6 text-left">
          <div className="w-12 h-12 sm:w-14 h-14 bg-deep-brown rounded-[1rem] sm:rounded-[1.5rem] flex items-center justify-center shadow-2xl border border-gold/20">
            <ShoppingBag className="text-gold w-6 h-6 sm:w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-deep-brown tracking-tighter uppercase leading-tight">My Account</h1>
            <p className="text-[9px] sm:text-[10px] font-black text-gold uppercase tracking-[0.3em]">{userEmail}</p>
          </div>
        </div>
        <button onClick={onBack} className="p-3 hover:bg-cream rounded-full transition-all text-muted-brown border border-gold/10">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex px-4 sm:px-10 border-b border-gold/5 shrink-0 bg-cream/30">
        <button 
          onClick={() => setActiveTab('cart')}
          className={cn(
            "px-4 sm:px-8 py-4 sm:py-5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-all border-b-2",
            activeTab === 'cart' ? "border-gold text-gold" : "border-transparent text-muted-brown hover:text-deep-brown"
          )}
        >
          My Cart ({cart.length})
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={cn(
            "px-4 sm:px-8 py-4 sm:py-5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-all border-b-2",
            activeTab === 'orders' ? "border-gold text-gold" : "border-transparent text-muted-brown hover:text-deep-brown"
          )}
        >
          My Orders ({orders.filter(o => o.email === userEmail || o.phone === userEmail || o.email === 'guest@example.com').length})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-ivory p-4 sm:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'cart' ? (
            <motion.div 
              key="cart"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-5xl mx-auto"
            >
              {cart.length === 0 ? (
                <div className="text-center py-24 sm:py-32 bg-cream/20 rounded-[2rem] sm:rounded-[3.5rem] border border-gold/10">
                  <div className="w-20 h-20 sm:w-24 h-24 bg-ivory rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/5 text-left">
                    <ShoppingBag className="w-10 h-10 text-gold/30" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-deep-brown mb-4">Your cart is empty</h3>
                  <p className="text-sm sm:text-base text-muted-brown mb-10 italic max-w-xs mx-auto">Discover the ZORÉ collection and find your next favorite piece.</p>
                  <button onClick={onBack} className="px-10 sm:px-12 py-4 bg-deep-brown text-ivory font-black rounded-2xl hover:bg-muted-brown transition-all shadow-xl uppercase text-[10px] tracking-widest">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-8 sm:gap-10 pb-24">
                  <div className="lg:col-span-2 space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-white/40 p-4 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border border-gold/10 shadow-sm flex flex-col sm:flex-row gap-6 sm:gap-8 items-center backdrop-blur-sm text-left w-full">
                        <img src={item.image} className="w-full sm:w-40 h-48 sm:h-40 rounded-[1.5rem] sm:rounded-[2rem] object-cover shrink-0 border border-gold/5" />
                        <div className="flex-1 w-full text-left">
                          <h3 className="text-xl sm:text-2xl font-serif text-deep-brown mb-2">{item.title}</h3>
                          <p className="text-gold font-black text-xl sm:text-2xl mb-6">{item.price}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 bg-ivory/80 px-5 py-2.5 rounded-2xl border border-gold/10">
                              <button onClick={() => onUpdateCartQuantity(item.id, -1)} className="text-muted-brown hover:text-gold transition-colors"><Minus className="w-4 h-4" /></button>
                              <span className="font-black text-deep-brown text-base">{item.quantity}</span>
                              <button onClick={() => onUpdateCartQuantity(item.id, 1)} className="text-muted-brown hover:text-gold transition-colors"><Plus className="w-4 h-4" /></button>
                            </div>
                            <button onClick={() => onRemoveFromCart(item.id)} className="text-gold/40 hover:text-gold p-3 rounded-xl transition-all">
                              <Trash2 className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="lg:col-span-1">
                    <div className="bg-deep-brown rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-10 text-ivory sticky top-0 border border-gold/20 shadow-2xl overflow-hidden text-left">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full -mr-24 -mt-24"></div>
                      <h3 className="text-2xl font-serif font-black mb-10 border-b border-white/5 pb-6 tracking-tight">Summary</h3>
                      <div className="space-y-5 mb-12 relative z-10">
                        <div className="flex justify-between text-gold/60 text-[10px] font-black uppercase tracking-widest">
                          <span>Subtotal</span>
                          <span className="text-ivory font-black">৳{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gold/60 text-[10px] font-black uppercase tracking-widest">
                          <span>Delivery</span>
                          <span className="text-gold italic">Calculated next</span>
                        </div>
                        <div className="pt-8 border-t border-white/5 flex justify-between items-end">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold/40">Total</span>
                          <span className="text-4xl sm:text-5xl font-black tracking-tighter">৳{subtotal.toLocaleString()}</span>
                        </div>
                      </div>
                      <button onClick={onCheckout} className="w-full py-5 bg-gold text-deep-brown font-black rounded-2xl hover:bg-ivory transition-all shadow-2xl text-xs tracking-widest uppercase">
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-5xl mx-auto"
            >
              {orders.filter(o => o.email === userEmail || o.email === 'guest@example.com').length === 0 ? (
                <div className="text-center py-24 sm:py-32 bg-cream/20 rounded-[2rem] sm:rounded-[3.5rem] border border-gold/10 text-left">
                   <div className="w-20 h-20 sm:w-24 h-24 bg-ivory rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/5">
                    <Package className="w-10 h-10 text-gold/20" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-deep-brown mb-4 text-center">No orders yet</h3>
                  <p className="text-sm sm:text-base text-muted-brown italic max-w-xs mx-auto text-center">Your order history will appear here once you place an order.</p>
                </div>
              ) : (
                <div className="space-y-8 sm:space-y-10 pb-24 text-left">
                  {orders.filter(o => o.email === userEmail || o.email === 'guest@example.com').map((order) => (
                    <div key={order.id} className="bg-white/50 rounded-[2.5rem] sm:rounded-[3rem] border border-gold/10 shadow-sm overflow-hidden backdrop-blur-sm">
                      <div className="p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-gold/5">
                        <div className="flex items-center gap-6 sm:gap-8">
                          <div className="w-16 h-16 sm:w-20 h-20 bg-cream rounded-[1.2rem] sm:rounded-[1.8rem] flex items-center justify-center text-gold border border-gold/10">
                             <Package className="w-8 h-8 sm:w-10 sm:h-10" />
                          </div>
                          <div className="grid grid-cols-2 sm:flex sm:gap-12 gap-4">
                            <div>
                              <p className="text-[9px] sm:text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-2">Order ID</p>
                              <h4 className="text-lg sm:text-xl font-black text-deep-brown tracking-tighter">#{order.id}</h4>
                            </div>
                            <div>
                              <p className="text-[9px] sm:text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-2">Placed On</p>
                              <h4 className="text-[10px] sm:text-xs font-bold text-muted-brown uppercase tracking-widest">{order.date}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 text-left md:text-right min-w-[150px]">
                           <div className="flex items-center md:justify-end gap-1 text-[10px] font-bold text-indigo-600">
                             <Phone className="w-3 h-3" /> {order.phone || 'N/A'}
                           </div>
                           <div className="text-[10px] text-muted-brown line-clamp-1 italic">{order.address}</div>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                           <span className={cn("px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm", getStatusColor(order.status))}>
                             {order.status}
                           </span>
                           <div className="text-right">
                              <p className="text-[9px] sm:text-[10px] font-black text-gold/40 uppercase tracking-[0.2em] mb-1 italic">Payment</p>
                              <p className={cn("text-[9px] sm:text-[10px] font-black uppercase tracking-widest", order.payment === 'Verified' ? 'text-gold underline' : 'text-muted-brown')}>{order.payment}</p>
                           </div>
                        </div>
                      </div>
                      
                      <div className="p-6 sm:p-10 bg-cream/10">
                        <div className="grid md:grid-cols-2 gap-10 sm:gap-12">
                          <div className="text-left w-full">
                            <p className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-6">Ordered Items</p>
                            <div className="space-y-4">
                              {order.items?.map((item: any) => (
                                <div key={item.id} className="flex items-center gap-4 sm:gap-6 bg-white/60 p-4 rounded-[1.5rem] border border-gold/5">
                                  <img src={item.image} className="w-14 h-14 sm:w-16 sm:h-16 rounded-[0.8rem] sm:rounded-[1rem] object-cover border border-gold/10" />
                                  <div className="flex-1">
                                    <p className="text-sm sm:text-base font-serif text-deep-brown leading-tight">{item.title}</p>
                                    <p className="text-[9px] sm:text-[10px] text-gold font-black uppercase tracking-widest mt-1">{item.price} • Qty {item.quantity}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col justify-end">
                            <div className="bg-deep-brown p-8 rounded-[2.5rem] text-ivory border border-gold/10 shadow-2xl relative overflow-hidden text-left">
                               <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16"></div>
                               <div className="flex justify-between items-center mb-2 relative z-10">
                                 <span className="text-[9px] sm:text-[10px] font-black text-gold uppercase tracking-[0.2em]">Grand Total</span>
                                 <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter">৳{order.total?.toLocaleString()}</span>
                               </div>
                               <p className="text-[9px] sm:text-[10px] text-gold/40 font-medium tracking-widest uppercase italic">Inclusive of Delivery</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Status Timeline Progress */}
                        <div className="mt-16 flex justify-between relative px-2 sm:px-4">
                           <div className="absolute top-4 sm:top-5 left-0 right-0 h-[1px] bg-gold/10 -z-10 mx-10 sm:mx-14"></div>
                           <div className="absolute top-4 sm:top-5 left-0 h-[1px] bg-gold -z-10 mx-10 sm:mx-14 transition-all duration-1000 shadow-[0_0_10px_rgba(167,122,54,0.5)]" style={{width: order.status === 'Delivered' ? '100%' : order.status === 'Shipped' ? '66%' : order.status === 'Processing' ? '33%' : '0%'}}></div>
                           
                           {[
                             { label: 'Pending', icon: Clock },
                             { label: 'Processing', icon: CheckCircle2 },
                             { label: 'Shipped', icon: Truck },
                             { label: 'Delivered', icon: CheckCircle2 }
                           ].map((step, i) => {
                             const stepOrder = ['Pending', 'Processing', 'Shipped', 'Delivered'];
                             const currentStepIndex = stepOrder.indexOf(order.status);
                             const isCompleted = i <= currentStepIndex;
                             
                             return (
                               <div key={i} className="flex flex-col items-center gap-2 sm:gap-3">
                                 <div className={cn(
                                   "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 sm:border-4 border-ivory shadow-lg z-10 transition-all duration-500",
                                   isCompleted ? "bg-gold text-deep-brown scale-110" : "bg-cream text-gold/20"
                                 )}>
                                   <step.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                                 </div>
                                 <span className={cn("text-[8px] sm:text-[9px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]", isCompleted ? "text-gold" : "text-gold/20")}>
                                   {step.label}
                                 </span>
                               </div>
                             );
                           })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomerDashboard;
