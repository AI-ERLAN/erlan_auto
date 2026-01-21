
import React from 'react';
import { Translation } from '../types';

interface MapSectionProps {
  t: Translation;
}

const MapSection: React.FC<MapSectionProps> = ({ t }) => {
  // Координаты заправки Wisey на авторынке Autopapa: 41.538740, 44.977465
  // Используем детальный спутниковый вид
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d373.05141021448275!2d44.977465!3d41.53874!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4044038a8f118749%3A0xc6c78a0f055a4e32!2sAUTOPAPA!5e1!3m2!1sru!2sge!4v1711285500000!5m2!1sru!2sge&maptype=satellite";

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 mb-4">{t.officeTitle}</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">{t.officeAddress}</p>
        </div>

        <div className="w-full">
          {/* Контейнер карты */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 relative h-[650px] w-full group">
            <iframe 
              src={mapUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0, display: 'block' }} 
              allowFullScreen 
              loading="lazy"
              title="Google Map - ERLAN AUTO at Autopapa near Wisey Gas Station"
            ></iframe>
            
            {/* Плавающая панель с информацией */}
            <div className="absolute top-6 left-6 right-6 md:top-8 md:left-8 pointer-events-none flex justify-start">
              <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-200 pointer-events-auto max-w-md w-full ring-4 ring-indigo-900/5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-indigo-900 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-900/30">
                    <i className="fa-solid fa-gas-pump text-2xl"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm tracking-widest uppercase">
                        У ЗАПРАВКИ WISEY
                      </span>
                      <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm tracking-widest uppercase">
                        KARTING AREA
                      </span>
                    </div>
                    <p className="text-lg font-black text-slate-900 leading-tight mb-1">ERLAN AUTO (ЮРТА)</p>
                    <p className="text-sm font-bold text-slate-500 leading-relaxed">
                      Авторынок AUTOPAPA, прямо у заправки Wisey. Ищите Кыргызскую Юрту!
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-3">
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=41.538740,44.977465"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-indigo-900 text-white py-4 rounded-xl text-sm font-black hover:bg-orange-600 transition-all text-center flex items-center justify-center gap-2 active:scale-95 shadow-xl shadow-indigo-900/20"
                  >
                    <i className="fa-solid fa-location-arrow text-lg"></i>
                    {t.routeBtn}
                  </a>
                  <a 
                    href="tel:+995551075065"
                    className="flex-1 bg-slate-100 text-slate-900 py-4 rounded-xl text-sm font-black hover:bg-slate-200 transition-all text-center flex items-center justify-center gap-2 active:scale-95 border border-slate-200"
                  >
                    <i className="fa-solid fa-phone"></i>
                    {t.callBtn}
                  </a>
                </div>
              </div>
            </div>

            {/* Маркер Wisey для наглядности */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="flex flex-col items-center">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-slate-200 mb-2 animate-bounce">
                        <span className="text-[10px] font-black text-indigo-900 uppercase whitespace-nowrap">МЫ ЗДЕСЬ (ЮРТА)</span>
                    </div>
                    <div className="w-6 h-6 bg-indigo-900 rounded-full border-4 border-white shadow-xl"></div>
                </div>
            </div>

            {/* Индикатор спутникового режима */}
            <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] pointer-events-none border border-white/20 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              Autopapa Wisey Area
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
