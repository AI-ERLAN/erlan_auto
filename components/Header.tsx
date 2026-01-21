
import React, { useState } from 'react';
import { Language, Translation } from '../types';
import { LANGUAGES } from '../constants';

interface HeaderProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  t: Translation;
}

const Header: React.FC<HeaderProps> = ({ currentLang, onLangChange, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);

  const contactLinks = [
    {
      name: 'WhatsApp',
      icon: 'fa-whatsapp',
      url: 'https://wa.me/995551075065',
      color: 'bg-emerald-500',
      hover: 'hover:bg-emerald-600'
    },
    {
      name: 'Telegram',
      icon: 'fa-telegram',
      url: 'https://t.me/+995551075065',
      color: 'bg-sky-500',
      hover: 'hover:bg-sky-600'
    }
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-900 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-900/20">
            EA
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-indigo-900 leading-none">ERLAN AUTO</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Logistics</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => onLangChange(l.code as Language)}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 group ${
                  currentLang === l.code 
                    ? 'bg-white text-indigo-900 shadow-md ring-1 ring-slate-200' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                }`}
                title={l.label}
              >
                <img 
                  src={`https://flagcdn.com/w40/${l.country}.png`} 
                  alt={l.label}
                  className="w-6 h-4 object-cover rounded shadow-sm border border-slate-200 group-hover:scale-110 transition-transform"
                />
                <span className={`text-xs font-bold uppercase tracking-tighter ${currentLang === l.code ? 'opacity-100' : 'opacity-60'}`}>
                  {l.code}
                </span>
              </button>
            ))}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowContactOptions(!showContactOptions)}
              className="bg-indigo-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-800 transition-all shadow-xl shadow-indigo-900/20 flex items-center gap-2"
            >
              <i className={`fa-solid ${showContactOptions ? 'fa-xmark' : 'fa-headset'} text-sm`}></i>
              {t.contactUs}
              <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${showContactOptions ? 'rotate-180' : ''}`}></i>
            </button>

            {showContactOptions && (
              <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 animate-in fade-in zoom-in-95 duration-200">
                {contactLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className={`w-8 h-8 ${link.color} text-white rounded-lg flex items-center justify-center text-sm group-hover:scale-110 transition-transform`}>
                      <i className={`fa-brands ${link.icon}`}></i>
                    </div>
                    <span className="font-bold text-slate-700">{link.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2.5 text-slate-600 bg-slate-100 rounded-xl border border-slate-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-2xl`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-6 absolute top-20 left-0 w-full shadow-2xl animate-in slide-in-from-top-4 duration-300 z-[100]">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Выберите язык / Select Language</p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  onLangChange(l.code as Language);
                  setIsMenuOpen(false);
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                  currentLang === l.code 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-inner' 
                    : 'border-slate-100 bg-slate-50 text-slate-600'
                }`}
              >
                <img 
                  src={`https://flagcdn.com/w80/${l.country}.png`} 
                  alt={l.label}
                  className="w-12 h-8 object-cover rounded-md shadow-sm border border-slate-200"
                />
                <span className="text-sm font-bold">{l.label}</span>
              </button>
            ))}
          </div>

          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t.contactUs}</p>
          <div className="grid grid-cols-2 gap-4">
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl ${link.color} text-white font-bold shadow-lg shadow-indigo-900/10 active:scale-95 transition-all`}
              >
                <i className={`fa-brands ${link.icon} text-3xl`}></i>
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
