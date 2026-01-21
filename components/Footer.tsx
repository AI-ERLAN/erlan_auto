
import React from 'react';
import { Translation } from '../types';

interface FooterProps {
  t: Translation;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">EA</div>
              <span className="text-xl font-bold">ERLAN AUTO</span>
            </div>
            <p className="text-slate-400">
              {t.footerAbout}
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/995551075065" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="https://t.me/+995551075065" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all"><i className="fa-brands fa-telegram"></i></a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{t.footerServicesTitle}</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-all">{t.footerService1}</a></li>
              <li><a href="#" className="hover:text-white transition-all">{t.footerService2}</a></li>
              <li><a href="#" className="hover:text-white transition-all">{t.footerService3}</a></li>
              <li><a href="#" className="hover:text-white transition-all">{t.footerService4}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{t.footerContactsTitle}</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-indigo-500"></i>
                <a href="tel:+995551075065" className="hover:text-white transition-all">+995 (551) 075-065</a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-envelope text-indigo-500"></i>
                info@erlanauto.com
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-map-pin text-indigo-500"></i>
                {t.footerBishkek}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} ERLAN AUTO. {t.footerRights}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
