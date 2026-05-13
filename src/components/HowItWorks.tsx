import { PlusCircle, Search, MessageSquare, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    title: 'Post Your Ad',
    desc: 'Snap some photos, write a description, and set your price. It takes less than 2 minutes!',
    icon: PlusCircle,
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    title: 'Find What You Need',
    desc: 'Browse millions of items. Use filters to find exactly what you want in your area.',
    icon: Search,
    color: 'text-indigo-600',
    bg: 'bg-indigo-100'
  },
  {
    title: 'Chat & Negotiate',
    desc: 'Communicate securely through our built-in chat. No need to share personal details.',
    icon: MessageSquare,
    color: 'text-emerald-600',
    bg: 'bg-emerald-100'
  },
  {
    title: 'Close the Deal',
    desc: 'Meet up safely or use our secure payment and shipping options to finish the trade.',
    icon: CheckCircle2,
    color: 'text-orange-600',
    bg: 'bg-orange-100'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How TradeHub Works</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Trading has never been this easy. Follow these simple steps to start buying or selling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          <div className="hidden lg:block absolute top-12 left-24 right-24 h-0.5 border-t-2 border-dashed border-slate-200 -z-10"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-lg`}>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-indigo-600 rounded-[2.5rem] p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-bold text-white mb-2">Ready to start selling?</h3>
              <p className="text-indigo-100 text-lg">Turn your unused items into cash today.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-colors shadow-xl">
                Start Selling Now
              </button>
              <button className="px-8 py-4 bg-indigo-700 text-white font-bold rounded-2xl border border-indigo-400 hover:bg-indigo-800 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
