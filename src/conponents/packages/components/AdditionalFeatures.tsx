import React from 'react';
import { Film, Shuffle, Music, Check } from 'lucide-react';

interface AdditionalFeaturesProps {
  selectedFeatures: string[];
  onToggle: (feature: string) => void;
}

const features = [
  {
    id: 'intro',
    name: 'Intro Page',
    description: 'Professional branded intro sequence',
    icon: Film,
  },
  {
    id: 'transitions',
    name: 'Smooth Transitions',
    description: 'Seamless flow between clips',
    icon: Shuffle,
    recommended: true,
  },
  {
    id: 'music',
    name: 'Background Music',
    description: 'Curated audio tracks',
    icon: Music,
  },
];

export function AdditionalFeatures({ selectedFeatures, onToggle }: AdditionalFeaturesProps) {
  return (
    <section className="bg-white rounded-2xl p-8 ">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Additional Features</h2>
        <p className="text-slate-600">Enhance your package with premium add-ons</p>
      </div>

      <div className=" flex gap-3 flex-col">
        {features.map((feature) => {
          // const Icon = feature.icon;
          const isSelected = selectedFeatures.includes(feature.id);

          return (
            <button
              key={feature.id}
              onClick={() => onToggle(feature.id)}
              className={`w-full p-1 cursor-pointer border-2 transition-all duration-200 text-left ${
                isSelected
                  ? 'border-orange-500 bg-orange-50 shadow-lg  shadow-orange-100'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Custom Checkbox */}
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'bg-primary border-orange-500'
                      : 'bg-white border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>

                {/* Icon */}
                {/* <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isSelected
                      ? 'bg-cyan-500 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div> */}

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className=" text-sm md:text-base text-slate-900">
                      {feature.name}
                    </span>
                  
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
