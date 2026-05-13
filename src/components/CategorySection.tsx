import { Smartphone, Grid, User, Zap } from 'lucide-react';

const categories = [
  { name: 'Panjabi', icon: User, color: 'bg-blue-50 text-blue-600' },
  { name: 'Three Piece', icon: Smartphone, color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Koti', icon: Zap, color: 'bg-orange-50 text-orange-600' },
  { name: 'Others', icon: Grid, color: 'bg-emerald-50 text-emerald-600' },
];

interface CategorySectionProps {
  onSelectCategory: (name: string) => void;
  selectedCategory: string;
}

const CategorySection = ({ onSelectCategory, selectedCategory }: CategorySectionProps) => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Explore Categories</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Find exactly what you're looking for by browsing through our most popular categories.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          <button
            onClick={() => onSelectCategory('All')}
            className={`group flex flex-col items-center p-6 bg-white rounded-2xl border transition-all ${selectedCategory === 'All' ? 'border-indigo-600 shadow-xl' : 'border-transparent hover:border-indigo-200'}`}
          >
            <div className={`w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <Grid className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-slate-700">All</span>
          </button>
          
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onSelectCategory(category.name)}
              className={`group flex flex-col items-center p-6 bg-white rounded-2xl border transition-all ${selectedCategory === category.name ? 'border-indigo-600 shadow-xl' : 'border-transparent hover:border-indigo-200'}`}
            >
              <div className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold text-slate-700">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
