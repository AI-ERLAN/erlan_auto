
import React, { useState } from 'react';
import { Translation } from '../types';
import { TRANSLATIONS } from '../constants';
import { GoogleGenAI } from '@google/genai';

interface ServiceCardsProps {
  t: Translation;
}

const ServiceCards: React.FC<ServiceCardsProps> = ({ t }) => {
  const [activeForm, setActiveForm] = useState<'owner' | 'driver' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Состояния для формы Владельца
  const [ownerData, setOwnerData] = useState({
    carData: '',
    fullName: '',
    passport: '',
    address: '',
    phone: '',
  });

  // Состояния для формы Водителя
  const [driverData, setDriverData] = useState({
    carData: '',
    receiverName: '',
    receiverPassport: '',
    receiverAddress: '',
    receiverPhone: '',
    driverName: '',
    driverPassport: '',
    driverAddress: '',
    driverPhone: '',
  });

  const handlePay = async () => {
    const currentData = activeForm === 'owner' ? ownerData : driverData;
    const hasData = Object.values(currentData).some(v => v.trim() !== '');
    if (!hasData || isProcessing) return;

    setIsProcessing(true);
    const whatsappNumber = "995551075065";
    const trRu = TRANSLATIONS.ru;

    try {
      // 1. Формируем структурированный черновик на русском языке (лейблы уже на русском)
      // Это поможет ИИ понять контекст каждого поля.
      let rawDraft = "";
      if (activeForm === 'owner') {
        rawDraft = `
Данные авто: ${ownerData.carData}
ФИО Владельца: ${ownerData.fullName}
Паспорт: ${ownerData.passport}
Адрес: ${ownerData.address}
Телефон: ${ownerData.phone}
        `.trim();
      } else {
        rawDraft = `
Данные авто: ${driverData.carData}

ПОЛУЧАТЕЛЬ:
ФИО: ${driverData.receiverName}
Паспорт: ${driverData.receiverPassport}
Адрес: ${driverData.receiverAddress}
Телефон: ${driverData.receiverPhone}

ВОДИТЕЛЬ:
ФИО: ${driverData.driverName}
Паспорт: ${driverData.driverPassport}
Адрес: ${driverData.driverAddress}
Телефон: ${driverData.driverPhone}
        `.trim();
      }

      // 2. Используем ИИ для перевода пользовательского ввода на русский
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Ты — эксперт-переводчик в логистической компании. 
        ТЕБЕ НУЖНО ПЕРЕВЕСТИ ВЕСЬ ТЕКСТ НИЖЕ НА РУССКИЙ ЯЗЫК.
        
        ПРАВИЛА:
        1. Весь текст, который не на русском (имена, города, марки машин, адреса), должен стать русским.
        2. Номера телефонов и серии паспортов (цифры и латинские буквы в ID) ОСТАВЛЯЙ КАК ЕСТЬ.
        3. Сохраняй структуру (заголовки ПОЛУЧАТЕЛЬ/ВОДИТЕЛЬ и переносы строк).
        4. Не добавляй никаких своих комментариев или нумерации.
        5. Используй профессиональную терминологию (например, "ТС" или "автомобиль").

        ТЕКСТ ДЛЯ ПЕРЕВОДА:
        ${rawDraft}`,
      });

      const translatedBody = response.text || rawDraft;

      // 3. Сборка финального сообщения по спецификации
      let finalMessage = `*НОВАЯ ЗАЯВКА от ERLAN AUTO: №*\n`;
      finalMessage += `==========================\n`;
      finalMessage += `${translatedBody}\n`;
      finalMessage += `Локация: ${trRu.bishkekCode}\n`;
      finalMessage += `==========================\n`;
      finalMessage += `Пожалуйста, обработайте данную заявку.`;

      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMessage)}`;
      window.open(url, '_blank');
    } catch (e) {
      console.error("WhatsApp sending error:", e);
      alert("Ошибка при подготовке сообщения. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsProcessing(false);
    }
  };

  const InputField = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) => (
    <div className="w-full">
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</label>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || ""} 
        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 transition-all focus:bg-white text-slate-800 font-medium"
      />
    </div>
  );

  const PhotoSection = () => (
    <div className="relative group">
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
      />
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600 text-3xl mb-4 group-hover:scale-110 transition-transform">
          <i className="fa-solid fa-camera"></i>
        </div>
        <p className="font-bold text-slate-700">{t.photoBtn}</p>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-tighter">Нажмите, чтобы сделать фото</p>
      </div>
    </div>
  );

  const StaticCodeField = () => (
    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Локация / Location</label>
      <div className="w-full px-5 py-4 rounded-2xl border border-indigo-100 bg-indigo-50/50 text-indigo-900 font-bold flex items-center justify-between">
        <span>{t.bishkekCode}</span>
        <i className="fa-solid fa-location-crosshairs opacity-50"></i>
      </div>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Карточка владельца */}
      <div className={`p-1 bg-gradient-to-br transition-all duration-500 rounded-[2.5rem] ${activeForm === 'owner' ? 'from-indigo-500 to-emerald-500 shadow-2xl' : 'from-slate-200 to-slate-100'}`}>
        <div className="bg-white p-8 md:p-10 rounded-[2.4rem] h-full flex flex-col">
          <div className="flex items-center gap-6 mb-8">
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-lg transition-colors ${activeForm === 'owner' ? 'bg-indigo-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
              👤
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">{t.ownerBtn}</h3>
              <p className="text-slate-500 font-medium">{t.ownerSub}</p>
            </div>
          </div>
          
          {activeForm !== 'owner' ? (
            <button 
              onClick={() => setActiveForm('owner')}
              className="mt-auto w-full border-2 border-slate-100 text-slate-900 py-5 rounded-[1.5rem] font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
            >
              Выбрать этот вариант
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <InputField label={t.carDataSpec} value={ownerData.carData} onChange={(v) => setOwnerData({...ownerData, carData: v})} placeholder="Марка, модель, год" />
              <InputField label={t.fullName} value={ownerData.fullName} onChange={(v) => setOwnerData({...ownerData, fullName: v})} />
              <InputField label={t.passportNum} value={ownerData.passport} onChange={(v) => setOwnerData({...ownerData, passport: v})} />
              <InputField label={t.address} value={ownerData.address} onChange={(v) => setOwnerData({...ownerData, address: v})} />
              <InputField label={t.phone} value={ownerData.phone} onChange={(v) => setOwnerData({...ownerData, phone: v})} />
              <StaticCodeField />
              <PhotoSection />
              <button 
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full bg-indigo-900 text-white py-5 rounded-[1.5rem] font-black text-xl hover:bg-emerald-600 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <i className="fa-solid fa-circle-notch animate-spin text-2xl"></i>
                ) : (
                  <>
                    <i className="fa-brands fa-whatsapp text-2xl"></i>
                    {t.payBtn}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Карточка водителя */}
      <div className={`p-1 bg-gradient-to-br transition-all duration-500 rounded-[2.5rem] ${activeForm === 'driver' ? 'from-emerald-500 to-indigo-500 shadow-2xl' : 'from-slate-200 to-slate-100'}`}>
        <div className="bg-white p-8 md:p-10 rounded-[2.4rem] h-full flex flex-col">
          <div className="flex items-center gap-6 mb-8">
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-lg transition-colors ${activeForm === 'driver' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
              🚗
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">{t.driverBtn}</h3>
              <p className="text-slate-500 font-medium">{t.driverSub}</p>
            </div>
          </div>
          
          {activeForm !== 'driver' ? (
            <button 
              onClick={() => setActiveForm('driver')}
              className="mt-auto w-full border-2 border-slate-100 text-slate-900 py-5 rounded-[1.5rem] font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
            >
              Выбрать этот вариант
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <InputField label={t.carDataSpec} value={driverData.carData} onChange={(v) => setDriverData({...driverData, carData: v})} placeholder="Марка, модель, год" />
              
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 border-b border-indigo-100 pb-2">Данные Получателя / Receiver</p>
                <InputField label={t.receiverFullName} value={driverData.receiverName} onChange={(v) => setDriverData({...driverData, receiverName: v})} />
                <InputField label={t.receiverPassport} value={driverData.receiverPassport} onChange={(v) => setDriverData({...driverData, receiverPassport: v})} />
                <InputField label={t.receiverAddress} value={driverData.receiverAddress} onChange={(v) => setDriverData({...driverData, receiverAddress: v})} />
                <InputField label={t.receiverPhone} value={driverData.receiverPhone} onChange={(v) => setDriverData({...driverData, receiverPhone: v})} />
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 border-b border-emerald-100 pb-2">Данные Водителя / Driver</p>
                <InputField label={t.driverFullName} value={driverData.driverName} onChange={(v) => setDriverData({...driverData, driverName: v})} />
                <InputField label={t.driverPassport} value={driverData.driverPassport} onChange={(v) => setDriverData({...driverData, driverPassport: v})} />
                <InputField label={t.driverAddress} value={driverData.driverAddress} onChange={(v) => setDriverData({...driverData, driverAddress: v})} />
                <InputField label={t.driverPhone} value={driverData.driverPhone} onChange={(v) => setDriverData({...driverData, driverPhone: v})} />
              </div>

              <StaticCodeField />
              <PhotoSection />
              
              <button 
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full bg-emerald-600 text-white py-5 rounded-[1.5rem] font-black text-xl hover:bg-indigo-900 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <i className="fa-solid fa-circle-notch animate-spin text-2xl"></i>
                ) : (
                  <>
                    <i className="fa-brands fa-whatsapp text-2xl"></i>
                    {t.payBtn}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;
