import { Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../utils/cn';

interface FooterProps {
  onPageClick: (page: string) => void;
}

const Footer = ({ onPageClick }: FooterProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const socialLinks = {
    facebook: "https://www.facebook.com/share/1Hk5EALGB7/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/zore.style?igsh=MXR3OW91ODNrdzV6cg==",
    tiktok: "https://www.tiktok.com/@zore.style?_r=1&_t=ZS-96BACfDmf4r"
  };

  const sections = [
    {
      title: "Quick Links",
      id: "quick",
      links: [
        { label: "Search", action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: "All Products", action: () => onPageClick('home') },
        { label: "All Collections", action: () => onPageClick('home') },
        { label: "Contact Us", action: () => onPageClick('contact') },
        { label: "About Us", action: () => onPageClick('about') },
      ]
    },
    {
      title: "Our Policies",
      id: "policies",
      links: [
        { label: "Privacy Policy", action: () => onPageClick('privacy') },
        { label: "Terms of Service", action: () => onPageClick('terms') },
        { label: "Return & Exchange Policy", action: () => onPageClick('terms') },
      ]
    }
  ];

  return (
    <footer className="bg-wine text-ivory pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo and Info */}
          <div className="text-left">
            <span className="text-4xl font-serif font-black tracking-tighter text-gold mb-6 block">ZORÉ</span>
            <p className="text-ivory/70 text-sm leading-relaxed mb-8 max-w-xs">
              Bangladesh's premium fashion destination for girls and women. Trendy Kurti and 1-piece collections.
            </p>
            <div className="flex gap-4">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-ivory text-wine rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all shadow-lg">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.856.925-1.856 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-ivory text-wine rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all shadow-lg">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.774 4.919 4.851.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.075-1.664 4.703-4.919 4.85-.127.059-3.51.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.851-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.075 1.664-4.704 4.919-4.851 1.266-.058 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-5.838 2.435-5.838 5.838s2.435 5.838 5.838 5.838 5.838-2.435 5.838-5.838-2.435-5.838-5.838-5.838zm0 9.513c-2.03 0-3.675-1.645-3.675-3.675 0-2.03 1.645-3.675 3.675-3.675 2.03 0 3.675 1.645 3.675 3.675 0 2.03-1.645 3.675-3.675 3.675zm5.844-10.461c0 .73-.593 1.322-1.322 1.322-.731 0-1.322-.592-1.322-1.322 0-.73.591-1.322 1.322-1.322.729 0 1.322.592 1.322 1.322z"/></svg>
              </a>
              <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-ivory text-wine rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all shadow-lg">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31 0 2.591.214 3.75.606V5.32c-1.027-.308-2.127-.466-3.25-.466-1.999 0-3.854.512-5.463 1.404l1.164 4.03c1.246-.594 2.637-.934 4.108-.934 3.958 0 7.301 2.49 8.784 5.945l-4.108.934c-1.027-.308-2.127-.466-3.25-.466-1.999 0-3.854.512-5.463 1.404l1.164 4.03c1.246-.594 2.637-.934 4.108-.934 4.542 0 8.353 3.284 9.208 7.643h-4.385c-.754-2.158-2.658-3.712-4.932-3.712-1.217 0-2.348.412-3.245 1.104l-1.164-4.03c-1.246.594-2.637.934-4.108.934-3.958 0-7.301-2.49-8.784-5.945l4.108-.934c1.027.308 2.127.466 3.25.466 1.999 0 3.854-.512 5.463-1.404L.012 12.525V8.14c.754 2.158 2.658 3.712 4.932 3.712 1.217 0 2.348-.412 3.245-1.104l1.164 4.03c1.246-.594 2.637-.934 4.108-.934 3.958 0 7.301 2.49 8.784 5.945l-4.108.934c-1.027-.308-2.127-.466-3.25-.466-1.999 0-3.854.512-5.463 1.404l1.164 4.03c1.246-.594 2.637-.934 4.108-.934 4.542 0 8.353 3.284 9.208 7.643H.012V0h12.513z"/></svg>
              </a>
            </div>
          </div>

          {/* Desktop Links / Mobile Accordion */}
          {sections.map((section) => (
            <div key={section.id} className="text-left border-b border-ivory/10 md:border-none pb-4 md:pb-0">
              <button 
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full md:cursor-default py-4 md:py-0"
              >
                <h4 className="font-serif text-xl font-bold md:mb-6">{section.title}</h4>
                <div className="md:hidden">
                  {openSection === section.id ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4 text-gold" />}
                </div>
              </button>
              <ul className={cn(
                "space-y-4 overflow-hidden transition-all md:h-auto md:opacity-100",
                openSection === section.id ? "h-auto opacity-100 mb-6" : "h-0 opacity-0 md:h-auto"
              )}>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button 
                      onClick={link.action}
                      className="text-ivory/60 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="text-left">
            <h4 className="font-serif text-xl font-bold mb-6">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-ivory/60 text-sm">
                <Mail className="w-5 h-5 text-gold" />
                <a href="mailto:fashionzore@gmail.com" className="hover:text-gold transition-colors font-medium">fashionzore@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-ivory/60 text-sm">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <div className="flex flex-col gap-1 font-medium">
                  <a href="tel:01601729558" className="hover:text-gold transition-colors tracking-widest">+880 1601-729558</a>
                  <a href="tel:01879567000" className="hover:text-gold transition-colors tracking-widest">+880 1879-567000</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-ivory/40">
            ©️ ZORÉ 2026 All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-ivory/40">
            <button onClick={() => onPageClick('privacy')} className="hover:text-gold transition-colors">Privacy</button>
            <button onClick={() => onPageClick('terms')} className="hover:text-gold transition-colors">Terms</button>
            <button onClick={() => onPageClick('terms')} className="hover:text-gold transition-colors">Refund</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
