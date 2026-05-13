import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminPanel from './components/AdminPanel';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import OrderConfirm from './components/OrderConfirm';
import CustomerDashboard from './components/CustomerDashboard';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, Heart, Phone, X, Mail } from 'lucide-react';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: "Premium Designer Kurti - Maroon",
    price: "৳2,450",
    category: "Kurti",
    location: "Dhanmondi, Dhaka",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Silk Embroidered 1-Piece",
    price: "৳4,899",
    category: "1-Piece",
    location: "Gulshan, Dhaka",
    time: "5 hours ago",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=2026&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Floral Print Cotton Kurti",
    price: "৳1,500",
    category: "Kurti",
    location: "Chattogram",
    time: "1 hour ago",
    image: "https://images.unsplash.com/photo-1598511028591-47029a8ba104?q=80&w=2080&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Cotton Comfort Panjabi",
    price: "৳1,200",
    category: "Others",
    location: "Banani, Dhaka",
    time: "3 hours ago",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1964&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Exclusive Party Wear Kurti",
    price: "৳5,210",
    category: "Kurti",
    location: "Sylhet",
    time: "10 mins ago",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Georgette 1-Piece Collection",
    price: "৳2,650",
    category: "1-Piece",
    location: "Uttara, Dhaka",
    time: "7 hours ago",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Premium Leather Purse",
    price: "৳1,100",
    category: "Others",
    location: "Rajshahi",
    time: "12 hours ago",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Handcrafted Attar Set",
    price: "৳850",
    category: "Others",
    location: "Khulna",
    time: "1 day ago",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2070&auto=format&fit=crop"
  }
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modal, setModal] = useState<'login' | 'signup' | 'admin' | 'checkout' | 'confirm' | 'details' | 'wishlist' | 'call' | 'dashboard' | 'about' | 'privacy' | 'terms' | 'contact' | null>(null);
  
  // Data Persistence with localStorage
  const [registeredUsers, setRegisteredUsers] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('zore_users');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  const [user, setUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('zore_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const { user: authUser, login: authLogin, signup: authSignup, logout: authLogout } = useAuth();
  const currentUser = authUser || user;


  const [orders, setOrders] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('zore_orders');
      const parsed = saved ? JSON.parse(saved) : [
        { id: 'ORD-7721', customer: 'Rahim Ahmed', email: 'customer@example.com', phone: '+880 1712-345678', total: 1250, status: 'Pending', date: '2024-03-20', payment: 'Unverified', address: 'House 12, Road 5, Dhanmondi, Dhaka', items: [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[1]] },
      ];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('zore_wishlist');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [buyNowProduct, setBuyNowProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('home');

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem('zore_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('zore_current_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('zore_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('zore_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') setModal(null);
    if (tab === 'cart') setModal('dashboard');
    if (tab === 'user') setModal(currentUser ? 'dashboard' : 'login');
    if (tab === 'wishlist') setModal('wishlist');
    if (tab === 'call') setModal('contact');
  };

  const handleLogin = (credentials: { identifier: string; password: any }) => {
    const identifier = credentials.identifier?.trim().toLowerCase();

    if (identifier === 'fashionzore@gmail.com' && credentials.password === 'sakibh9089') {
      const adminUser = { name: 'ZORÉ Admin', email: 'fashionzore@gmail.com', isAdmin: true };
      setUser(adminUser);
      setModal('admin');
      return Promise.resolve(true);
    }

    if (identifier.includes('@')) {
      return authLogin(identifier, credentials.password)
        .then((firebaseUser) => {
          const foundUser = registeredUsers.find(u => u.email?.trim().toLowerCase() === identifier);
          if (foundUser) {
            setUser(foundUser);
          } else {
            setUser({ name: firebaseUser.email, email: firebaseUser.email });
          }
          setModal(null);
          return true;
        })
        .catch(() => false);
    }

    const foundUser = registeredUsers.find(u => {
      const uEmail = u.email?.trim().toLowerCase();
      const uPhone = u.phone?.trim();
      return (uEmail === identifier || uPhone === identifier) && u.password === credentials.password;
    });

    if (foundUser) {
      setUser(foundUser);
      setModal(null);
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  };

  const handleSignUp = (userData: any) => {
    const email = userData.email?.trim().toLowerCase();
    const phone = userData.phone?.trim();

    if (!email || !phone) return { success: false, message: 'Email and Phone are required' };

    const exists = registeredUsers.some(u => {
      if (!u) return false;
      const uEmail = u.email?.trim().toLowerCase();
      const uPhone = u.phone?.trim();
      return (email && uEmail === email) || (phone && uPhone === phone);
    });

    if (exists) return { success: false, message: 'Email or Phone already registered' };

    return authSignup(email, userData.password)
      .then((firebaseUser) => {
        const newUser = {
          ...userData,
          email,
          phone,
          id: firebaseUser.uid,
          isAdmin: false,
        };
        setRegisteredUsers(prev => [...prev, newUser]);
        setUser(newUser);
        setModal(null);
        return { success: true };
      })
      .catch((error) => ({ success: false, message: error?.message || 'Sign up failed' }));
  };

  const handleLogout = () => {
    authLogout().catch(() => null);
    setUser(null);
    setModal(null);
    setActiveTab('home');
  };

  const handleAddProduct = (newProduct: any) => {
    const product = {
      ...newProduct,
      id: Math.max(...products.map(p => p.id), 0) + 1,
      time: 'Just now'
    };
    setProducts([product, ...products]);
  };

  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleUpdateProduct = (updatedProduct: any) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleAddToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setModal('checkout');
  };

  const handleBuyNow = (product: any) => {
    setBuyNowProduct({ ...product, quantity: 1 });
    setModal('checkout');
  };

  const handleUpdateCartQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleToggleWishlist = (product: any) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const notifyOrder = async (order: any) => {
    try {
      const notificationUrl = import.meta.env.VITE_NOTIFICATION_URL || 'http://localhost:4000/api/notify-order';
      const response = await fetch(notificationUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        const body = await response.text();
        console.error('Order notification failed:', response.status, body);
      }
    } catch (error) {
      console.error('Order notification request failed:', error);
    }
  };

  const handlePlaceOrder = (customerData: any) => {
    const orderItems = buyNowProduct ? [buyNowProduct] : [...cart];
    const orderEmail = currentUser?.email || customerData.email || currentUser?.phone || `guest_${Date.now()}@zore.com`;

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: customerData.name,
      email: orderEmail,
      phone: customerData.phone,
      address: customerData.address,
      items: orderItems,
      total: customerData.total,
      status: 'Pending',
      date: new Date().toLocaleDateString(),
      payment: 'Unverified'
    };

    // Auto-account creation for guests
    if (!currentUser) {
      const phone = customerData.phone?.trim();
      const existingAccount = registeredUsers.find(u => u.phone?.trim() === phone);
      if (!existingAccount) {
        const autoAccount = {
          name: customerData.name,
          phone: phone,
          email: customerData.email || orderEmail,
          password: 'zore' + phone.slice(-4),
          isAutoCreated: true
        };
        setRegisteredUsers(prev => [...prev, autoAccount]);
        setUser(autoAccount);
      } else {
        setUser(existingAccount);
      }
    }

    setOrders(prev => [newOrder, ...prev]);
    setBuyNowProduct(null);
    setModal('confirm');
    void notifyOrder(newOrder);
  };

  const isAdmin = currentUser?.isAdmin;

  if (modal === 'admin' && isAdmin) {
    return (
      <AdminPanel 
        products={products}
        orders={orders}
        onUpdateOrders={setOrders}
        onAddProduct={handleAddProduct}
        onRemoveProduct={handleRemoveProduct}
        onUpdateProduct={handleUpdateProduct}
        onBack={() => { setModal(null); setActiveTab('home'); }}
      />
    );
  }

  if (selectedProduct) {
    return (
      <ProductDetails 
        product={selectedProduct} 
        onBuyNow={handleBuyNow}
        onClose={() => { setSelectedProduct(null); setActiveTab('home'); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-ivory selection:bg-gold selection:text-white relative text-left">
      <Navbar 
        onLoginClick={() => setModal('login')}
        onSignUpClick={() => setModal('signup')}
        onMenuClick={() => setIsSidebarOpen(true)}
        isLoggedIn={!!currentUser}
        userEmail={currentUser?.name || currentUser?.email || null}
        onLogout={handleLogout}
        onProfileClick={() => setModal(isAdmin ? 'admin' : 'dashboard')}
        isAdmin={isAdmin}
        onAdminClick={() => setModal('admin')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <section id="products" className="py-12 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-deep-brown mb-2 tracking-tight">
                ZORÉ Selection
              </h2>
              <p className="text-muted-brown text-sm font-medium tracking-wide">
                Handpicked premium Bangladeshi fashion for you.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {cart.length > 0 && (
                <button 
                  onClick={() => setModal('checkout')}
                  className="flex items-center gap-2 bg-deep-brown text-ivory px-6 py-3 rounded-xl font-bold hover:bg-muted-brown transition-all shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5 text-gold" />
                  Bag ({cart.reduce((acc, i) => acc + i.quantity, 0)})
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {products
              .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
              .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((product) => (
                <div key={product.id} onClick={() => { setSelectedProduct(product); setActiveTab('product'); }} className="cursor-pointer">
                  <ProductCard 
                    product={product} 
                    isAdmin={isAdmin}
                    isWishlisted={wishlist.some(item => item.id === product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onDelete={handleRemoveProduct}
                    onBuyNow={handleBuyNow}
                  />
                </div>
              ))}
          </div>
          
          {products.filter(p => (selectedCategory === 'All' || p.category === selectedCategory) && p.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-brown text-lg italic">No products found matching your criteria.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-4 text-gold font-bold hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      <section className="py-24 bg-cream border-t border-gold/10 text-left">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-ivory rounded-[3rem] p-12 lg:p-20 shadow-xl shadow-deep-brown/5 flex flex-col lg:flex-row items-center gap-12 border border-gold/20">
            <div className="lg:flex-1">
              <h2 className="text-4xl md:text-5xl font-serif text-deep-brown mb-6 uppercase tracking-tighter">Stay Inspired</h2>
              <p className="text-lg text-muted-brown mb-0 font-medium tracking-wide">
                Join the ZORÉ inner circle for exclusive seasonal reveals and offers.
              </p>
            </div>
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="px-6 py-4 bg-cream border border-gold/20 rounded-2xl focus:outline-none focus:ring-1 focus:ring-gold w-full sm:w-80 text-deep-brown placeholder:text-muted-brown/50 text-sm font-bold tracking-widest outline-none"
              />
              <button className="px-8 py-4 bg-deep-brown text-ivory font-black rounded-2xl hover:bg-muted-brown transition-all shadow-xl uppercase text-xs tracking-widest">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer onPageClick={(page) => setModal(page as any)} />
      <div className="h-20 lg:hidden"></div>
      
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
      />

      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setModal(null); setActiveTab('home'); }}
              className="absolute inset-0 bg-deep-brown/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-ivory rounded-[3rem] shadow-2xl border border-gold/20"
            >
              {modal === 'login' && (
                <Login 
                  onSwitchToSignUp={() => setModal('signup')} 
                  onLoginSuccess={(credentials) => {
                    handleLogin(credentials).then((success) => {
                      if (!success) alert('Invalid identification or key.');
                    });
                  }}
                  onBack={() => { setModal(null); setActiveTab('home'); }}
                />
              )}
              {modal === 'signup' && (
                <SignUp 
                  onSwitchToLogin={() => setModal('login')} 
                  onSignUpSuccess={(data) => {
                    const result = handleSignUp(data);
                    if (result instanceof Promise) {
                      result.then((res) => {
                        if (!res.success) alert(res.message);
                      });
                    } else if (!result.success) {
                      alert(result.message);
                    }
                  }}
                  onBack={() => { setModal(null); setActiveTab('home'); }}
                />
              )}

              {modal === 'checkout' && (
                <Checkout 
                  cart={buyNowProduct ? [] : cart}
                  directProduct={buyNowProduct}
                  user={currentUser}
                  onRemove={removeFromCart}
                  onUpdateQuantity={handleUpdateCartQuantity}
                  onConfirm={handlePlaceOrder}
                  onBack={() => { setModal(null); setActiveTab('home'); setBuyNowProduct(null); }}
                />
              )}
              {modal === 'confirm' && (
                <OrderConfirm 
                  onBackToHome={() => {
                    setCart([]);
                    setModal('dashboard');
                    setActiveTab('orders');
                  }}
                />
              )}
              {modal === 'dashboard' && (
                <CustomerDashboard 
                  cart={cart}
                  orders={orders}
                    userEmail={currentUser?.email || currentUser?.phone || 'Guest'}
                  onRemoveFromCart={removeFromCart}
                  onUpdateCartQuantity={handleUpdateCartQuantity}
                  onCheckout={() => setModal('checkout')}
                  onBack={() => { setModal(null); setActiveTab('home'); }}
                />
              )}
              {modal === 'wishlist' && (
                <div className="p-8 text-left">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-serif text-deep-brown">Wishlist</h2>
                    <button onClick={() => { setModal(null); setActiveTab('home'); }} className="p-2 hover:bg-cream rounded-full transition-colors"><X className="w-6 h-6 text-muted-brown" /></button>
                  </div>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-20">
                      <Heart className="w-16 h-16 text-gold/20 mx-auto mb-4" />
                      <p className="text-muted-brown font-medium text-lg italic">Your list is currently empty.</p>
                      <button onClick={() => { setModal(null); setActiveTab('home'); }} className="mt-4 text-gold font-bold uppercase text-xs tracking-widest">Explore Collection</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {wishlist.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-cream/30 rounded-2xl border border-gold/10">
                          <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                          <div className="flex-1">
                            <h3 className="font-bold text-deep-brown">{item.title}</h3>
                            <p className="text-gold font-black">{item.price}</p>
                          </div>
                          <button onClick={() => handleToggleWishlist(item)} className="text-gold font-bold text-sm">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {modal === 'contact' && (
                <div className="p-12 text-left bg-wine text-ivory">
                   <div className="flex justify-between items-start mb-10">
                      <div className="w-20 h-20 bg-ivory text-wine rounded-full flex items-center justify-center border border-gold/10 shadow-xl">
                        <Phone className="w-10 h-10" />
                      </div>
                      <button onClick={() => { setModal(null); setActiveTab('home'); }} className="p-2 hover:bg-white/10 rounded-full transition-colors text-ivory"><X className="w-6 h-6" /></button>
                   </div>
                   <h2 className="text-4xl font-serif font-black mb-4 uppercase tracking-tighter">Support</h2>
                   <p className="text-ivory/70 text-lg mb-10 leading-relaxed font-medium">
                     Our team is available to assist you with your orders and inquiries.
                   </p>
                   <div className="space-y-6 mb-12">
                     <div className="flex items-center gap-4">
                        <Mail className="w-6 h-6 text-gold" />
                        <a href="mailto:fashionzore@gmail.com" className="text-xl font-bold hover:text-gold transition-colors">fashionzore@gmail.com</a>
                     </div>
                     <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <Phone className="w-6 h-6 text-gold" />
                          <a href="tel:01601729558" className="text-xl font-bold hover:text-gold transition-colors tracking-widest">+880 1601-729558</a>
                        </div>
                        <div className="flex items-center gap-4">
                          <Phone className="w-6 h-6 text-gold" />
                          <a href="tel:01879567000" className="text-xl font-bold hover:text-gold transition-colors tracking-widest">+880 1879-567000</a>
                        </div>
                     </div>
                   </div>

                   <div className="flex gap-4">
                      <a href="https://www.facebook.com/share/1Hk5EALGB7/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-ivory text-wine rounded-xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-xl">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.856.925-1.856 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        Facebook
                      </a>
                      <a href="https://www.instagram.com/zore.style?igsh=MXR3OW91ODNrdzV6cg==" target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-ivory text-wine rounded-xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-xl">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.774 4.919 4.851.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.075-1.664 4.703-4.919 4.85-.127.059-3.51.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.851-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.075 1.664-4.704 4.919-4.851 1.266-.058 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-5.838 2.435-5.838 5.838s2.435 5.838 5.838 5.838 5.838-2.435 5.838-5.838-2.435-5.838-5.838-5.838zm0 9.513c-2.03 0-3.675-1.645-3.675-3.675 0-2.03 1.645-3.675 3.675-3.675 2.03 0 3.675 1.645 3.675 3.675 0 2.03-1.645 3.675-3.675 3.675zm5.844-10.461c0 .73-.593 1.322-1.322 1.322-.731 0-1.322-.592-1.322-1.322 0-.73.591-1.322 1.322-1.322.729 0 1.322.592 1.322 1.322z"/></svg>
                        Instagram
                      </a>
                      <a href="https://www.tiktok.com/@zore.style?_r=1&_t=ZS-96BACfDmf4r" target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-ivory text-wine rounded-xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-xl">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31 0 2.591.214 3.75.606V5.32c-1.027-.308-2.127-.466-3.25-.466-1.999 0-3.854.512-5.463 1.404l1.164 4.03c1.246-.594 2.637-.934 4.108-.934 3.958 0 7.301 2.49 8.784 5.945l-4.108.934c-1.027-.308-2.127-.466-3.25-.466-1.999 0-3.854.512-5.463 1.404l1.164 4.03c1.246-.594 2.637-.934 4.108-.934 4.542 0 8.353 3.284 9.208 7.643h-4.385c-.754-2.158-2.658-3.712-4.932-3.712-1.217 0-2.348.412-3.245 1.104l-1.164-4.03c-1.246.594-2.637.934-4.108.934-3.958 0-7.301-2.49-8.784-5.945l4.108-.934c1.027.308 2.127.466 3.25.466 1.999 0 3.854-.512 5.463-1.404L.012 12.525V8.14c.754 2.158 2.658 3.712 4.932 3.712 1.217 0 2.348-.412 3.245-1.104l1.164 4.03c1.246-.594 2.637-.934 4.108-.934 3.958 0 7.301 2.49 8.784 5.945l-4.108.934c-1.027-.308-2.127-.466-3.25-.466-1.999 0-3.854.512-5.463 1.404l1.164 4.03c1.246-.594 2.637-.934 4.108-.934 4.542 0 8.353 3.284 9.208 7.643H.012V0h12.513z"/></svg>
                        TikTok
                      </a>
                   </div>
                </div>
              )}
              {modal === 'privacy' && (
                <div className="p-12 text-left bg-ivory">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-serif font-black text-deep-brown uppercase tracking-tighter">Privacy Policy</h2>
                    <button onClick={() => { setModal(null); setActiveTab('home'); }} className="p-2 hover:bg-cream rounded-full transition-colors"><X className="w-6 h-6 text-muted-brown" /></button>
                  </div>
                  <div className="space-y-6 text-muted-brown font-medium leading-relaxed">
                    <p>At ZORÉ, we respect your privacy. This policy outlines how we handle your data.</p>
                    <ul className="list-disc pl-6 space-y-4">
                      <li>We collect customer name, phone number, address, email, and order details only to process orders and provide support.</li>
                      <li>We do not sell or share customer personal information with third parties except for delivery, payment, and order fulfillment needs.</li>
                      <li>All customer data is kept secure within our private systems.</li>
                      <li>For any questions regarding your data, please contact us at <span className="text-gold font-bold">fashionzore@gmail.com</span>.</li>
                    </ul>
                  </div>
                </div>
              )}
              {modal === 'terms' && (
                <div className="p-12 text-left bg-ivory">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-serif font-black text-deep-brown uppercase tracking-tighter">Terms of Service</h2>
                    <button onClick={() => { setModal(null); setActiveTab('home'); }} className="p-2 hover:bg-cream rounded-full transition-colors"><X className="w-6 h-6 text-muted-brown" /></button>
                  </div>
                  <div className="space-y-6 text-muted-brown font-medium leading-relaxed">
                    <p>By using ZORÉ, you agree to the following terms:</p>
                    <ul className="list-disc pl-6 space-y-4">
                      <li>Customers agree to provide accurate order and contact information.</li>
                      <li>Product colors may slightly vary due to screen differences and photography lighting.</li>
                      <li>Orders depend on stock availability. We will notify you if an item is out of stock.</li>
                      <li>Prices are subject to change without prior notice.</li>
                      <li>ZORÉ reserves the right to cancel suspicious or incorrect orders.</li>
                      <li>For assistance, please contact us at <span className="text-gold font-bold">fashionzore@gmail.com</span> or our provided mobile numbers.</li>
                    </ul>
                  </div>
                </div>
              )}
              {modal === 'about' && (
                <div className="p-12 text-left bg-ivory">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-serif font-black text-deep-brown uppercase tracking-tighter">About ZORÉ</h2>
                    <button onClick={() => { setModal(null); setActiveTab('home'); }} className="p-2 hover:bg-cream rounded-full transition-colors"><X className="w-6 h-6 text-muted-brown" /></button>
                  </div>
                  <div className="space-y-8 text-muted-brown font-medium leading-relaxed">
                    <div className="bg-cream/30 p-8 rounded-[2rem] border border-gold/10 italic text-lg text-deep-brown">
                      “We offer trendy and comfortable fashion wear including Kurti and 1-piece collections for girls and women. Our goal is to provide stylish outfits at affordable prices with quality you can trust.”
                    </div>
                    <p className="text-lg">
                      New collections are updated regularly. Limited stock available — grab your favorite style before it’s gone!
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                       <div className="p-6 bg-wine text-ivory rounded-2xl border border-gold/20">
                          <h4 className="font-serif text-xl mb-2 text-gold">Our Vision</h4>
                          <p className="text-sm opacity-80">To become Bangladesh's most loved fashion brand for everyday elegance.</p>
                       </div>
                       <div className="p-6 bg-deep-brown text-ivory rounded-2xl border border-gold/20">
                          <h4 className="font-serif text-xl mb-2 text-gold">Our Promise</h4>
                          <p className="text-sm opacity-80">Quality materials and reliable service delivered to your doorstep.</p>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
