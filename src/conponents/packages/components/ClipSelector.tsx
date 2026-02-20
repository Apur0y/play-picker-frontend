import React from 'react';
import { Sparkles } from 'lucide-react';
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from 'react-icons/md';

interface ClipSelectorProps {
  clipOption: '10-15' | '20-25' | '35-40' | 'custom';
  customClipCount: number;
  onUpdate: (option: '10-15' | '20-25' | '35-40' | 'custom', customCount: number) => void;
}

export function ClipSelector({ clipOption, customClipCount, onUpdate }: ClipSelectorProps) {
  const options = [
    { value: '10-15' as const, label: '10–15 Clips', description: 'Small project',extra:"$" },
    { value: '20-25' as const, label: '20–25 Clips', description: 'Medium scope',extra:"$"},
    { value: '35-40' as const, label: '35–40 Clips', description: 'Large project', extra:"$" },

  ];

  return (
    <section className=" p-8   ">
      <div className="mb-6">
        <h2 className=" font-bold text-slate-900 mb-2">Number of Clips</h2>
          <p className="text-slate-600 text-sm">Select the number of clips you need edited</p>
    
      </div>

      <div className="gap-4 space-y-3">
        {options.map((option) => (
          <div key={option.value} className="relative">
         
            <button
              onClick={() => onUpdate(option.value, customClipCount)}
              className={` transition-all duration-200 text-left flex items-center gap-2 border cursor-pointer p-1 ${
                clipOption === option.value
                  ? 'border-orange-500 bg-orange-50 shadow-lg  shadow-orange-100'
                  : 'border-gray-100 bg-white hover:border-slate-300 hover:shadow-md'
              }`}
            >
              { clipOption === option.value?<MdOutlineRadioButtonChecked className='text-black' />: <MdOutlineRadioButtonUnchecked /> }
              {/* {option.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )} */}
              <div className=" w-20 text-slate-900 mb-1">{option.label}</div>
              {option.extra && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      clipOption === option.value
                        ? 'bg-green-200 text-cyan-800'
                        :"bg-slate-100 text-slate-600"}`}
                  >
                    {option.extra}
                  </span>
                )}
            </button>
          </div>
        ))}
      </div>

      {/* Custom Clip Input */}
      {clipOption === 'custom' && (
        <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
          <label htmlFor="custom-clips" className="block text-sm font-semibold text-slate-700 mb-2">
            Enter number of clips
          </label>
          <input
            id="custom-clips"
            type="number"
            min="1"
            value={customClipCount}
            onChange={(e) => onUpdate('custom', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 transition-all text-slate-900"
            placeholder="e.g., 50"
          />
        </div>
      )}
    </section>
  );
}
