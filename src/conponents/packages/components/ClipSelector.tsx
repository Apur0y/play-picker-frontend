import React, { useEffect, useState } from "react";
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";

interface ClipSelectorProps {
  clipOption: "10-15" | "20-25" | "35-40" | "custom";
  customClipCount: number;
  onUpdate: (
    option: "10-15" | "20-25" | "35-40" | "custom",
    customCount: number,
  ) => void;
}

export function ClipSelector({
  clipOption,
  customClipCount,
  onUpdate,
}: ClipSelectorProps) {
  const [customClips, setCustomClips] = useState(0);
  const [customGames, setCustomGames] = useState(0);
  useEffect(() => {
    if (clipOption === "custom") {
      const totalClips = customClips + customGames * 25;

      onUpdate("custom", totalClips);
    }
  }, [customClips, customGames]);

  const options = [
    { value: "10-15" as const, label: "10–15 Clips" },
    { value: "20-25" as const, label: "20–25 Clips" },
    { value: "35-40" as const, label: "35–40 Clips" },
    { value: "custom" as const, label: "Custom" },
  ];

  return (
    <section className="p-8 text-black">
      <div className="mb-6">
        <h2 className="font-bold text-slate-900 mb-2">Number of Clips</h2>
        <p className="text-slate-600 text-sm">
          Select the number of clips you need edited
        </p>
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onUpdate(option.value, customClipCount)}
            className={`flex items-center gap-3 border p-3 transition-all ${
              clipOption === option.value
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 bg-white hover:border-slate-300"
            }`}
          >
            {clipOption === option.value ? (
              <MdOutlineRadioButtonChecked />
            ) : (
              <MdOutlineRadioButtonUnchecked />
            )}
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {/* Custom Inputs */}
      {clipOption === "custom" && (
        <div className="flex gap-4 mt-6">
          {/* Custom Clips */}
          <div className="flex-1 p-5   border">
            <label
              htmlFor="custom-clips"
              className="block text-sm font-semibold mb-2"
            >
              Enter number of <span className="text-primary">Clips</span>
            </label>

            <input
              type="number"
              min="0"
              max={1000} // max clips
              value={customClips}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length > 4) return; // max 4 characters
                let num = Number(value);
                if (num > 1000) num = 1000; // enforce max
                setCustomClips(num);
              }}
              className="w-full px-4 py-3 rounded-lg border-2 focus:border-orange-500 focus:outline-none"
              placeholder="Max 1000"
            />
          </div>

          {/* Custom Games */}
          <div className="flex-1 p-5 bg-slate-50  border">
            <label
              htmlFor="custom-games"
              className="block text-sm font-semibold mb-2"
            >
              Enter number of <span className="text-primary">Games</span>
            </label>

            <input
              type="number"
              min="0"
              max={100} // max value
              value={customGames}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length > 3) return; // strict 3 characters max
                let num = Number(value);
                if (num > 100) num = 100; // enforce max
                setCustomGames(num);
              }}
              className="w-full px-4 py-3 rounded-lg border-2 focus:border-orange-500 focus:outline-none"
              placeholder="Max 100"
            />

            <p className="text-xs bg-green-200 text-cyan-800  mt-2 p-1 px-2 rounded-2xl w-fit">
              1 game = +$25
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
