
import React from 'react';
import { Translation } from '../types';

interface FeaturesProps {
  t: Translation;
}

const Features: React.FC<FeaturesProps> = ({ t }) => {
  const items = [
    { icon: 'fa-earth-americas', title: t.feat1, sub: t.feat1Sub, color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: 'fa-bolt', title: t.feat2, sub: t.feat2Sub, color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: 'fa-headset', title: t.feat4, sub: t.feat4Sub, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-slate-900 uppercase tracking-widest text-sm">
          {t.featuresTitle}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group">
              <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
