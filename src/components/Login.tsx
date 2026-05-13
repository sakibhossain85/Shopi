import { Mail, Lock, ArrowRight, UserCheck, Globe } from 'lucide-react';

interface LoginProps {
  onSwitchToSignUp: () => void;
  onLoginSuccess: (credentials: { identifier: string; password: any }) => void;
}

const Login = ({ onSwitchToSignUp, onLoginSuccess }: LoginProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const identifier = formData.get('identifier') as string;
    const password = formData.get('password') as string;
    onLoginSuccess({ identifier, password });
  };

  return (
    <div className="bg-ivory py-12 sm:py-16 px-6 sm:px-10 border border-gold/10 rounded-[2rem] sm:rounded-[3rem] text-left">
      <div className="text-center mb-10 sm:mb-12">
        <span className="text-4xl font-serif font-black text-gold block mb-4 tracking-tighter">ZORÉ</span>
        <h2 className="text-2xl font-serif text-deep-brown tracking-tight">Sign in to ZORÉ</h2>
        <p className="mt-2 text-muted-brown italic text-sm">Welcome back to our fashion community.</p>
      </div>

      <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
        <div>
          <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3">Email or Phone</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gold/40" />
            </div>
            <input
              name="identifier"
              type="text"
              required
              className="block w-full pl-12 pr-6 py-4 bg-cream/40 border border-gold/10 rounded-2xl focus:ring-1 focus:ring-gold focus:border-gold transition-all outline-none text-deep-brown font-bold"
              placeholder="Email or Phone"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em]">Password</label>
            <a href="#" className="text-[10px] font-black text-gold/60 uppercase tracking-widest hover:text-gold italic">Forgot?</a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gold/40" />
            </div>
            <input
              name="password"
              type="password"
              required
              className="block w-full pl-12 pr-6 py-4 bg-cream/40 border border-gold/10 rounded-2xl focus:ring-1 focus:ring-gold focus:border-gold transition-all outline-none text-deep-brown font-bold"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-4 py-5 px-6 border border-gold/20 rounded-2xl shadow-2xl text-[10px] font-black uppercase tracking-[0.3em] text-ivory bg-deep-brown hover:bg-muted-brown transition-all"
        >
          Sign In
          <ArrowRight className="w-4 h-4 text-gold" />
        </button>
      </form>

      <div className="mt-10 sm:mt-12">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gold/10"></div>
          </div>
          <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.3em]">
            <span className="px-4 bg-ivory text-gold/40">Quick Access</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
          <button className="flex justify-center items-center py-4 px-4 border border-gold/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-deep-brown bg-cream/20 hover:bg-cream/40 transition-all">
            <Globe className="w-4 h-4 mr-3 text-gold" />
            Google
          </button>
          <button className="flex justify-center items-center py-4 px-4 border border-gold/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-deep-brown bg-cream/20 hover:bg-cream/40 transition-all">
            <UserCheck className="w-4 h-4 mr-3 text-gold" />
            Apple
          </button>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gold/5 flex flex-col gap-4">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-brown">
          New here?{' '}
          <button
            onClick={onSwitchToSignUp}
            className="text-gold hover:text-deep-brown transition-colors underline"
          >
            Create ZORÉ Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
