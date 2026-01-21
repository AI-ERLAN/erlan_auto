
import React, { useState } from 'react';
import { Translation } from '../types';

interface MainFormProps {
  t: Translation;
}

const MainForm: React.FC<MainFormProps> = ({ t }) => {
  const [clientType, setClientType] = useState<'individual' | 'company'>('individual');

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold mb-8 text-slate-900 flex items-center gap-3">
        <i className="fa-solid fa-file-signature text-indigo-900"></i>
        {t.mainFormTitle}
      </h2>

      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.clientType}</label>
            <div className="flex p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setClientType('individual')}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${clientType === 'individual' ? 'bg-white shadow-sm text-indigo-900' : 'text-slate-500'}`}
              >
                {t.clientIndividual}
              </button>
              <button
                type="button"
                onClick={() => setClientType('company')}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${clientType === 'company' ? 'bg-white shadow-sm text-indigo-900' : 'text-slate-500'}`}
              >
                {t.clientCompany}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.fullName}</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Full Name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.carData}</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="VIN Number, Brand, Model"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.origin}</label>
            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
              <option>Georgia (GE)</option>
              <option>UAE (AE)</option>
              <option>Turkey (TR)</option>
              <option>USA (US)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.destination}</label>
            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
              <option>Kyrgyzstan (KG)</option>
              <option>Kazakhstan (KZ)</option>
              <option>Uzbekistan (UZ)</option>
            </select>
          </div>
        </div>

        <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-900 transition-all flex items-center justify-center gap-3 shadow-xl">
          <i className="fa-solid fa-paper-plane"></i>
          {t.submitBtn}
        </button>
      </form>
    </div>
  );
};

export default MainForm;
