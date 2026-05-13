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

/* ---------------- SAFE LOCALSTORAGE ---------------- */
const safeParse = (key: string, fallback: any) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

/* ---------------- INITIAL PRODUCTS ---------------- */
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
  }
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [modal, setModal] = useState<
    'login' | 'signup' | 'admin' | 'checkout' | 'confirm' |
    'details' | 'wishlist' | 'call' | 'dashboard' |
    'about' | 'privacy' | 'terms' | 'contact' | null
  >(null);

  /* ---------------- AUTH SAFE ---------------- */
  const auth = useAuth() || {};
  const authUser = auth.user;
  const authLogin = auth.login || (() => Promise.reject());
  const authSignup = auth.signup || (() => Promise.reject());
  const authLogout = auth.logout || (() => Promise.resolve());

  const [registeredUsers, setRegisteredUsers] = useState<any[]>(() =>
    safeParse('zore_users', [])
  );

  const [user, setUser] = useState<any>(() =>
    safeParse('zore_current_user', null)
  );

  const currentUser = authUser || user || null;

  const [orders, setOrders] = useState<any[]>(() =>
    safeParse('zore_orders', [])
  );

  const [wishlist, setWishlist] = useState<any[]>(() =>
    safeParse('zore_wishlist', [])
  );

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [buyNowProduct, setBuyNowProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('home');

  /* ---------------- SYNC LOCALSTORAGE ---------------- */
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

  /* ---------------- ADMIN CHECK ---------------- */
  const isAdmin = currentUser?.isAdmin;

  /* ---------------- LOGIN ---------------- */
  const handleLogin = (credentials: any) => {
    const identifier = credentials.identifier?.trim().toLowerCase();

    if (identifier === 'admin@gmail.com' && credentials.password === 'admin') {
      const adminUser = { name: 'Admin', email: identifier, isAdmin: true };
      setUser(adminUser);
      setModal('admin');
      return Promise.resolve(true);
    }

    return authLogin(identifier, credentials.password)
      .then(() => {
        setUser({ email: identifier });
        setModal(null);
        return true;
      })
      .catch(() => false);
  };

  /* ---------------- SIGNUP ---------------- */
  const handleSignUp = (data: any) => {
    return authSignup(data.email, data.password)
      .then((res: any) => {
        setUser({ email: data.email, id: res.uid });
        setModal(null);
        return { success: true };
      })
      .catch((e: any) => ({ success: false, message: e.message }));
  };

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    authLogout();
    setUser(null);
    setModal(null);
  };

  /* ---------------- RENDER GUARDS ---------------- */
  if (typeof window === 'undefined') return null;

  /* ---------------- ADMIN PANEL ---------------- */
  if (modal === 'admin' && isAdmin) {
    return (
      <AdminPanel
        products={products}
        orders={orders}
        onUpdateOrders={setOrders}
        onAddProduct={(p: any) => setProducts([p, ...products])}
        onRemoveProduct={(id: number) => setProducts(products.filter(p => p.id !== id))}
        onUpdateProduct={(p: any) =>
          setProducts(products.map(x => (x.id === p.id ? p : x)))
        }
        onBack={() => setModal(null)}
      />
    );
  }

  /* ---------------- PRODUCT DETAILS ---------------- */
  if (selectedProduct) {
    return (
      <ProductDetails
        product={selectedProduct}
        onBuyNow={() => {}}
        onClose={() => setSelectedProduct(null)}
      />
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <div className="min-h-screen bg-ivory relative text-left">

      <Navbar
        onLoginClick={() => setModal('login')}
        onSignUpClick={() => setModal('signup')}
        onMenuClick={() => setIsSidebarOpen(true)}
        isLoggedIn={!!currentUser}
        userEmail={currentUser?.email}
        onLogout={handleLogout}
        onProfileClick={() => setModal('dashboard')}
        isAdmin={isAdmin}
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

      <section className="py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {/* MODALS */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-[100]">
            <motion.div
              className="absolute inset-0 bg-black/50"
              onClick={() => setModal(null)}
            />
            <motion.div className="relative bg-white m-10 p-6 rounded-xl">
              {modal === 'login' && (
                <Login
                  onLoginSuccess={(c: any) =>
                    handleLogin(c).then(ok => !ok && alert('Invalid login'))
                  }
                  onSwitchToSignUp={() => setModal('signup')}
                  onBack={() => setModal(null)}
                />
              )}

              {modal === 'signup' && (
                <SignUp
                  onSignUpSuccess={(d: any) =>
                    handleSignUp(d).then(r => !r.success && alert(r.message))
                  }
                  onSwitchToLogin={() => setModal('login')}
                  onBack={() => setModal(null)}
                />
              )}

              {modal === 'dashboard' && (
                <CustomerDashboard
                  userEmail={currentUser?.email}
                  onBack={() => setModal(null)}
                />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;