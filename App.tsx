
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import ServiceCards from './components/ServiceCards';
import { Language } from './types';
import { TRANSLATIONS } from './constants';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ru');
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen flex flex-col text-slate-800">
      <Header currentLang={lang} onLangChange={setLang} t={t} />
      
      <main className="flex-grow">
        <Hero t={t} />
        
        <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 pb-16">
          <ServiceCards t={t} />
        </div>
        
        <Features t={t} />
      </main>

      <Footer t={t} />
      <ChatBot t={t} currentLang={lang} />
    </div>
  );
};

export default App;
