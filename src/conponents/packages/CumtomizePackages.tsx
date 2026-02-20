'use client'
import React, { useState } from 'react';
import { ClipSelector } from './components/ClipSelector';
import { DeliverySelector } from './components/DeliverySelector';
import { RevisionSelector } from './components/RevisionSelector';
import { EffectSelector } from './components/EffectSelector';
import { AdditionalFeatures } from './components/AdditionalFeatures';
import { PackageSummary } from './components/PackageSummary';

export interface Effect {
  id: string;
  name: string;
  price: number;
}

export interface ConfigState {
  clipOption: '10-15' | '20-25' | '35-40' | 'custom';
  customClipCount: number;
  deliveryDays: 5 | 2 | 1;
  revisions: 1 | 3 | 5;
  selectedEffects: Effect[];
  additionalFeatures: string[];
}

export default function CustomizePackage() {
  const [config, setConfig] = useState<ConfigState>({
    clipOption: '35-40',
    customClipCount: 50,
    deliveryDays: 5,
    revisions: 1,
    selectedEffects: [{ id: 'circle', name: 'Circle Highlight', price: 2 }],
    additionalFeatures: [],
  });

  const updateConfig = (updates: Partial<ConfigState>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-350 mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Build Your Video Editing Package
          </h1>
          <p className="text-lg text-slate-600">
            Customize your perfect video editing solution with real-time pricing
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Configuration Sections */}
          <div className="flex-1 flex lg:w-[70%] space-y-8 flex-col">
            <div className='bg-white flex flex-col md:flex-row w-full '>

              <ClipSelector
                clipOption={config.clipOption}
                customClipCount={config.customClipCount}
                onUpdate={(clipOption, customClipCount) =>
                  updateConfig({ clipOption, customClipCount })
                }
              />

              <DeliverySelector
                selectedDays={config.deliveryDays}
                onSelect={(days) => updateConfig({ deliveryDays: days })}
              />

              <RevisionSelector
                selectedRevisions={config.revisions}
                onSelect={(revisions) => updateConfig({ revisions })}
              />

              

            </div>


            <EffectSelector
              selectedEffects={config.selectedEffects}
              onToggle={(effect) => {
                const isSelected = config.selectedEffects[0]?.id === effect.id;

                updateConfig({
                  selectedEffects: isSelected ? [] : [effect], 
                });
              }}
            />



            <AdditionalFeatures
              selectedFeatures={config.additionalFeatures}
              onToggle={(feature) => {
                const isSelected = config.additionalFeatures.includes(feature);
                const newFeatures = isSelected
                  ? config.additionalFeatures.filter((f) => f !== feature)
                  : [...config.additionalFeatures, feature];
                updateConfig({ additionalFeatures: newFeatures });
              }}
            />
          </div>


          {/* Right Column - Package Summary */}
          <div className="lg:w-[30%]">
            <div className="lg:sticky lg:top-20">
              <PackageSummary config={config} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
