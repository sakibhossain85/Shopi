import { Mail, Lock, ArrowRight, Phone } from 'lucide-react';

interface SignUpProps {
  onSwitchToLogin: () => void;
  onSignUpSuccess: (userData: any) => void;
  onBack: () => void;
}

const SignUp = ({ onSwitchToLogin, onSignUpSuccess }: SignUpProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onSignUpSuccess(data);
  };

  return (
    <div className="bg-ivory py-12 sm:py-16 px-6 sm:px-10 border border-gold/10 rounded-[2rem] sm:rounded-[3rem] text-left">
      <div className="text-center mb-10 sm:mb-12">
        <span className="text-4xl font-serif font-black text-gold block mb-4 tracking-tighter">ZORÉ</span>
        <h2 className="text-2xl font-serif text-deep-brown tracking-tight">Create Your ZORÉ Account</h2>
        <p className="mt-2 text-muted-brown italic text-sm">Join our elite fashion circle.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3">First Name</label>
            <input
              name="firstName"
              type="text"
              required
              className="block w-full px-5 py-4 bg-cream/40 border border-gold/10 rounded-2xl focus:ring-1 focus:ring-gold outline-none text-deep-brown font-bold text-sm"
              placeholder="RAHIM"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3">Last Name</label>
            <input
              name="lastName"
              type="text"
              required
              className="block w-full px-5 py-4 bg-cream/40 border border-gold/10 rounded-2xl focus:ring-1 focus:ring-gold outline-none text-deep-brown font-bold text-sm"
              placeholder="AHMED"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3">Mobile Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-gold/40" />
            </div>
            <input
              name="phone"
              type="tel"
              required
              className="block w-full pl-12 pr-6 py-4 bg-cream/40 border border-gold/10 rounded-2xl focus:ring-1 focus:ring-gold focus:border-gold transition-all outline-none text-deep-brown font-bold text-sm"
              placeholder="+880 17XX-XXXXXX"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gold/40" />
            </div>
            <input
              name="email"
              type="email"
              required
              className="block w-full pl-12 pr-6 py-4 bg-cream/40 border border-gold/10 rounded-2xl focus:ring-1 focus:ring-gold focus:border-gold transition-all outline-none text-deep-brown font-bold text-sm"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gold/40" />
            </div>
            <input
              name="password"
              type="password"
              required
              className="block w-full pl-12 pr-6 py-4 bg-cream/40 border border-gold/10 rounded-2xl focus:ring-1 focus:ring-gold focus:border-gold transition-all outline-none text-deep-brown font-bold text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex items-start gap-4 py-2">
          <div className="flex items-center h-6">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-gold border-gold/30 rounded focus:ring-gold bg-cream"
            />
          </div>
          <label htmlFor="terms" className="text-[10px] font-medium text-muted-brown uppercase tracking-widest leading-relaxed">
            I agree to the <a href="#" className="font-black text-gold">Terms of Service</a> and <a href="#" className="font-black text-gold">Privacy Policy</a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-4 py-5 px-6 border border-gold/20 rounded-2xl shadow-2xl text-[10px] font-black uppercase tracking-[0.3em] text-ivory bg-deep-brown hover:bg-muted-brown transition-all"
        >
          Sign Up
          <ArrowRight className="w-4 h-4 text-gold" />
        </button>
      </form>

      <p className="mt-10 sm:mt-12 text-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-brown">
        Already have an account?{' '}
        <button 
          onClick={onSwitchToLogin}
          className="text-gold hover:text-deep-brown transition-colors"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUp;
