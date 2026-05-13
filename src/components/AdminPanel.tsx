import { useState } from 'react';
import { Plus, Trash2, X, Tag, DollarSign, ShoppingBag, Users, Settings, Package, Truck, Edit3, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  location: string;
  time: string;
  image: string;
  stock?: number;
}

interface AdminPanelProps {
  products: Product[];
  orders: any[];
  onUpdateOrders: (orders: any[]) => void;
  onAddProduct: (product: any) => void;
  onRemoveProduct: (id: number) => void;
  onUpdateProduct: (product: any) => void;
  onBack: () => void;
}

const AdminPanel = ({ products, orders, onUpdateOrders, onAddProduct, onRemoveProduct, onUpdateProduct, onBack }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'settings'>('dashboard');
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [deliveryCharge, setDeliveryCharge] = useState(15);
  
  const [categories, setCategories] = useState(['Panjabi', 'Three Piece', 'Koti', 'Others']);
  const [newCategory, setNewCategory] = useState('');

  const [customers] = useState([
    { id: 1, name: 'Rahim Ahmed', email: 'rahim@example.com', orders: 5, totalSpent: '৳3,400' },
    { id: 2, name: 'Nusrat Jahan', email: 'nusrat@example.com', orders: 2, totalSpent: '৳850' },
    { id: 3, name: 'Tanvir Hasan', email: 'tanvir@example.com', orders: 12, totalSpent: '৳12,100' },
    { id: 4, name: 'Ayesha Siddika', email: 'ayesha@example.com', orders: 3, totalSpent: '৳4,500' },
  ]);

  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    category: 'Panjabi',
    location: '',
    image: 'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=2070&auto=format&fit=crop',
    stock: 10
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct({ ...newProduct, id: editingProduct.id });
    } else {
      onAddProduct(newProduct);
    }
    setIsAdding(false);
    setEditingProduct(null);
    setNewProduct({
      title: '',
      price: '',
      category: 'Panjabi',
      location: '',
      image: 'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=2070&auto=format&fit=crop',
      stock: 10
    });
  };

  const startEdit = (product: any) => {
    setEditingProduct(product);
    setNewProduct(product);
    setIsAdding(true);
  };

  const handleVerifyPayment = (orderId: string) => {
    onUpdateOrders(orders.map(o => o.id === orderId ? { ...o, payment: 'Verified' } : o));
  };

  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    onUpdateOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-ivory flex overflow-hidden z-[200]">
      {/* Mobile Header Tabs */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-deep-brown border-t border-gold/10 flex justify-around p-4 z-[90]">
        {[
          { id: 'dashboard', icon: Tag },
          { id: 'products', icon: Package },
          { id: 'orders', icon: ShoppingBag, badge: orders.length },
          { id: 'customers', icon: Users },
          { id: 'settings', icon: Settings },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`relative p-2 rounded-lg ${activeTab === item.id ? 'text-gold' : 'text-ivory/50'}`}
          >
            <item.icon className="w-6 h-6" />
            {item.badge && item.badge > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-deep-brown text-[10px] font-black rounded-full flex items-center justify-center border-2 border-deep-brown">
                {item.badge}
              </span>
            )}
          </button>
        ))}
        <button onClick={onBack} className="p-2 text-gold"><X className="w-6 h-6" /></button>
      </div>

      {/* Sidebar (Desktop) */}
      <div className="w-[260px] bg-deep-brown border-r border-gold/10 hidden lg:flex flex-col h-full z-20 shrink-0">
        <div className="p-10 text-left">
          <div className="flex items-center gap-2 mb-12">
            <span className="text-3xl font-serif font-black tracking-tighter text-gold">ZORÉ</span>
          </div>
          
          <div className="space-y-1.5">
            {[
              { id: 'dashboard', icon: Tag, label: 'Dashboard' },
              { id: 'products', icon: Package, label: 'Inventory' },
              { id: 'categories', icon: Tag, label: 'Categories' },
              { id: 'orders', icon: ShoppingBag, label: 'Orders', badge: orders.length },
              { id: 'customers', icon: Users, label: 'Customers' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === item.id ? 'bg-gold text-deep-brown shadow-xl' : 'text-ivory/40 hover:text-ivory hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" /> 
                  <span className="text-[11px] uppercase tracking-widest">{item.label}</span>
                </div>
                {item.badge && item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${activeTab === item.id ? 'bg-deep-brown text-gold' : 'bg-gold text-deep-brown'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-auto p-10">
          <button onClick={onBack} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gold/60 hover:text-gold transition-all text-[11px] uppercase tracking-widest">
            <X className="w-4 h-4" /> Exit Admin
          </button>
        </div>
      </div>

      <div className="flex-1 h-full overflow-y-auto p-8 sm:p-12 mb-20 lg:mb-0 text-left">
        <header className="mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-deep-brown capitalize tracking-tighter mb-2">{activeTab}</h1>
          <p className="text-muted-brown font-medium tracking-wide uppercase text-[10px]">ZORÉ Administrative Portal</p>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-cream/40 p-10 rounded-[3rem] border border-gold/10 shadow-sm relative overflow-hidden">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-2xl flex items-center justify-center mb-8">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div className="text-muted-brown font-bold text-[10px] uppercase tracking-widest mb-1">Total Revenue</div>
                <div className="text-3xl sm:text-4xl font-black text-deep-brown tracking-tighter">৳24,500</div>
              </div>
              <div className="bg-cream/40 p-10 rounded-[3rem] border border-gold/10 shadow-sm group hover:border-gold transition-all cursor-pointer" onClick={() => setActiveTab('orders')}>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 bg-gold/10 text-gold rounded-2xl flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-lg group-hover:bg-gold group-hover:text-deep-brown transition-all">
                    View All
                  </button>
                </div>
                <div className="text-muted-brown font-bold text-[10px] uppercase tracking-widest mb-1">Total Orders</div>
                <div className="text-3xl sm:text-4xl font-black text-deep-brown tracking-tighter">{orders.length + 142}</div>
              </div>
              <div className="bg-cream/40 p-10 rounded-[3rem] border border-gold/10 shadow-sm relative overflow-hidden">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-2xl flex items-center justify-center mb-8">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-muted-brown font-bold text-[10px] uppercase tracking-widest mb-1">Active Customers</div>
                <div className="text-3xl sm:text-4xl font-black text-deep-brown tracking-tighter">{customers.length + 890}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-deep-brown rounded-[3rem] p-12 text-ivory relative overflow-hidden border border-gold/20 shadow-2xl">
                <div className="relative z-10">
                  <h3 className="text-3xl font-serif font-black mb-4 tracking-tight">Low Stock</h3>
                  <p className="text-gold/60 mb-10 font-medium tracking-wide">Some items are running low. Update your inventory now.</p>
                  <button 
                    onClick={() => setActiveTab('products')}
                    className="bg-gold text-deep-brown px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-ivory transition-all shadow-xl"
                  >
                    Manage Inventory
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mr-32 -mt-32"></div>
              </div>

              <div className="bg-gold/10 rounded-[3rem] p-12 text-deep-brown relative overflow-hidden border border-gold/20">
                <div className="relative z-10">
                  <h3 className="text-3xl font-serif font-black mb-4 tracking-tight">Pending Orders</h3>
                  <p className="text-muted-brown mb-10 font-medium tracking-wide">You have {orders.length} orders requiring fulfillment.</p>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="bg-deep-brown text-ivory px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-muted-brown transition-all shadow-xl"
                  >
                    Manage Orders
                  </button>
                </div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/10 rounded-full -mr-32 -mb-32"></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-serif font-black text-deep-brown tracking-tight">Inventory</h2>
              <button 
                onClick={() => { setEditingProduct(null); setIsAdding(true); }}
                className="bg-deep-brown text-ivory px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-xl hover:bg-muted-brown transition-all"
              >
                <Plus className="w-4 h-4 text-gold" /> Add Product
              </button>
            </div>
            
            <div className="bg-white/50 rounded-[3rem] border border-gold/10 overflow-x-auto shadow-sm backdrop-blur-sm">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-cream/40 border-b border-gold/10">
                  <tr>
                    <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest">Product</th>
                    <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest">Category</th>
                    <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest">Stock</th>
                    <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest">Price</th>
                    <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/5">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-cream/20 transition-colors group">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-6">
                          <img src={product.image} className="w-16 h-16 rounded-[1.2rem] object-cover border border-gold/10 group-hover:scale-105 transition-transform" />
                          <span className="font-bold text-deep-brown tracking-tight text-lg">{product.title}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="px-4 py-1.5 bg-cream text-gold rounded-full text-[9px] font-black uppercase tracking-widest border border-gold/10">{product.category}</span>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`font-black tracking-widest text-[10px] uppercase ${ (product.stock || 10) < 5 ? 'text-gold underline' : 'text-muted-brown'}`}>
                          {product.stock || 10} units
                        </span>
                      </td>
                      <td className="px-10 py-6 font-black text-deep-brown text-xl tracking-tighter">{product.price}</td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button onClick={() => startEdit(product)} className="p-3 text-muted-brown hover:text-gold hover:bg-cream/50 rounded-xl transition-all"><Edit3 className="w-5 h-5" /></button>
                          <button onClick={() => onRemoveProduct(product.id)} className="p-3 text-gold/40 hover:text-gold hover:bg-cream/50 rounded-xl transition-all"><Trash2 className="w-5 h-5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-8">
            <div className="bg-white/50 rounded-[3rem] border border-gold/10 overflow-x-auto shadow-sm backdrop-blur-sm">
              <table className="w-full text-left min-w-[900px]">
                <thead className="bg-cream/40 border-b border-gold/10">
                  <tr>
                    <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest">Order ID</th>
                    <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest">Customer</th>
                    <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest">Items</th>
                    <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest">Payment</th>
                    <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest">Status</th>
                    <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/5">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-cream/20 transition-colors">
                      <td className="px-10 py-6 font-black text-gold tracking-widest text-[10px]">{order.id}</td>
                      <td className="px-10 py-6">
                        <div className="font-bold text-deep-brown tracking-tight mb-1 text-base">{order.customer}</div>
                        <div className="flex items-center gap-1 text-[10px] font-black text-gold uppercase tracking-tighter">
                          <Phone className="w-3 h-3" /> {order.phone || 'N/A'}
                        </div>
                        <div className="text-[9px] text-muted-brown mt-1 max-w-[150px] truncate">{order.address}</div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="space-y-1.5">
                          {order.items?.map((item: any) => (
                            <div key={item.id} className="text-[10px] font-bold text-muted-brown flex justify-between gap-4 uppercase tracking-tighter">
                              <span>{item.title}</span>
                              <span className="text-gold font-black">x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <button 
                          onClick={() => handleVerifyPayment(order.id)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${order.payment === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}
                        >
                          {order.payment}
                        </button>
                      </td>
                      <td className="px-10 py-6">
                        <select 
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="bg-transparent text-[10px] font-black text-gold uppercase tracking-[0.2em] focus:outline-none cursor-pointer"
                        >
                          <option>Pending</option>
                          <option>Processing</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                        </select>
                      </td>
                      <td className="px-10 py-6 text-right">
                         <div className="font-black text-deep-brown text-xl tracking-tighter">৳{order.total?.toLocaleString()}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-cream/40 p-12 rounded-[3rem] border border-gold/10 shadow-sm h-fit">
              <h3 className="text-2xl font-serif font-black mb-8 tracking-tight text-deep-brown">Add Category</h3>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="CATEGORY NAME..."
                  className="flex-1 px-6 py-4 bg-ivory border border-gold/20 rounded-2xl outline-none focus:ring-1 focus:ring-gold transition-all text-xs font-black uppercase tracking-widest text-deep-brown placeholder:text-muted-brown/30"
                />
                <button 
                  onClick={handleAddCategory}
                  className="bg-deep-brown text-ivory px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-muted-brown transition-all shadow-lg"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="bg-cream/40 p-12 rounded-[3rem] border border-gold/10 shadow-sm">
              <h3 className="text-2xl font-serif font-black mb-8 tracking-tight text-deep-brown">Active Categories</h3>
              <div className="flex flex-wrap gap-4">
                {categories.map(cat => (
                  <span key={cat} className="flex items-center gap-3 px-6 py-3 bg-ivory text-gold border border-gold/10 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm">
                    {cat}
                    <button className="hover:text-deep-brown"><X className="w-3.5 h-3.5" /></button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="bg-white/50 rounded-[3rem] border border-gold/10 overflow-x-auto shadow-sm backdrop-blur-sm">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-cream/40 border-b border-gold/10">
                <tr>
                  <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest">Customer</th>
                  <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest">Email</th>
                  <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest">Orders</th>
                  <th className="px-10 py-6 font-black text-gold uppercase text-[10px] tracking-widest text-right">Lifetime Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/5">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-cream/20 transition-colors">
                    <td className="px-10 py-6 font-bold text-deep-brown text-lg tracking-tight">{customer.name}</td>
                    <td className="px-10 py-6 text-muted-brown font-medium tracking-wide italic">{customer.email}</td>
                    <td className="px-10 py-6 font-black text-gold text-[11px] tracking-widest uppercase">{customer.orders} orders</td>
                    <td className="px-10 py-6 text-right font-black text-deep-brown text-xl tracking-tighter">{customer.totalSpent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-cream/40 p-16 rounded-[3.5rem] border border-gold/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mr-32 -mt-32"></div>
            <h3 className="text-3xl font-serif font-black mb-10 flex items-center gap-3 tracking-tight text-deep-brown">
              <Truck className="w-8 h-8 text-gold" /> Logistics Settings
            </h3>
            <div className="space-y-8 relative z-10">
              <div>
                <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-4">Standard Delivery Charge (৳)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gold font-black">৳</span>
                  <input 
                    type="number" 
                    value={deliveryCharge}
                    onChange={(e) => setDeliveryCharge(parseInt(e.target.value))}
                    className="w-full pl-12 pr-6 py-5 bg-ivory border border-gold/20 rounded-2xl outline-none focus:ring-1 focus:ring-gold transition-all font-black text-2xl text-deep-brown tracking-tighter"
                  />
                </div>
              </div>
              <button className="w-full bg-deep-brown text-ivory py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-muted-brown transition-all shadow-2xl border border-gold/10">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAdding(false)} className="absolute inset-0 bg-deep-brown/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-ivory w-full max-w-2xl rounded-[3.5rem] shadow-2xl p-16 overflow-hidden border border-gold/20 max-h-[90vh] overflow-y-auto">
              <button onClick={() => setIsAdding(false)} className="absolute top-10 right-10 p-2 text-muted-brown hover:bg-cream rounded-full transition-colors"><X className="w-6 h-6" /></button>
              <h2 className="text-4xl font-serif font-black text-deep-brown mb-10 tracking-tighter">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-3">Product Title</label>
                  <input type="text" required value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="w-full px-6 py-4 bg-cream border border-gold/10 rounded-2xl outline-none focus:ring-1 focus:ring-gold transition-all text-deep-brown font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-3">Price (৳)</label>
                    <input type="text" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value.startsWith('৳') ? e.target.value : `৳${e.target.value}`})} className="w-full px-6 py-4 bg-cream border border-gold/10 rounded-2xl outline-none focus:ring-1 focus:ring-gold transition-all text-deep-brown font-black" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-3">Current Stock</label>
                    <input type="number" required value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})} className="w-full px-6 py-4 bg-cream border border-gold/10 rounded-2xl outline-none focus:ring-1 focus:ring-gold transition-all text-deep-brown font-black" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-3">Category</label>
                  <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-6 py-4 bg-cream border border-gold/10 rounded-2xl outline-none focus:ring-1 focus:ring-gold transition-all text-deep-brown font-bold">
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-3">Image URL</label>
                  <input type="text" required value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="w-full px-6 py-4 bg-cream border border-gold/10 rounded-2xl outline-none focus:ring-1 focus:ring-gold transition-all text-deep-brown font-medium" />
                </div>
                <button type="submit" className="w-full bg-deep-brown text-ivory py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-muted-brown transition-all shadow-2xl border border-gold/10">
                  {editingProduct ? 'Save Changes' : 'Create Listing'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
