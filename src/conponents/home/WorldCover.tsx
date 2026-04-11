"use client";

import { useState, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface CountryData {
  orders: number;
  earnings: number;
}

// Maps geo.properties.name (from the topojson) → ISO 3166-1 alpha-2
const NAME_TO_ISO: Record<string, string> = {
  Afghanistan: "AF",
  Albania: "AL",
  Algeria: "DZ",
  Angola: "AO",
  Argentina: "AR",
  Armenia: "AM",
  Australia: "AU",
  Austria: "AT",
  Azerbaijan: "AZ",
  Bangladesh: "BD",
  Belarus: "BY",
  Belgium: "BE",
  Benin: "BJ",
  Bolivia: "BO",
  "Bosnia and Herz.": "BA",
  Botswana: "BW",
  Brazil: "BR",
  Bulgaria: "BG",
  "Burkina Faso": "BF",
  Burundi: "BI",
  Cambodia: "KH",
  Cameroon: "CM",
  Canada: "CA",
  "Central African Rep.": "CF",
  Chad: "TD",
  Chile: "CL",
  China: "CN",
  Colombia: "CO",
  Congo: "CG",
  "Dem. Rep. Congo": "CD",
  "Costa Rica": "CR",
  Croatia: "HR",
  Cuba: "CU",
  "Czech Rep.": "CZ",
  Czechia: "CZ",
  Denmark: "DK",
  "Dominican Rep.": "DO",
  Ecuador: "EC",
  Egypt: "EG",
  "El Salvador": "SV",
  Eritrea: "ER",
  Estonia: "EE",
  Ethiopia: "ET",
  Finland: "FI",
  France: "FR",
  Gabon: "GA",
  Germany: "DE",
  Ghana: "GH",
  Greece: "GR",
  Guatemala: "GT",
  Guinea: "GN",
  "Guinea-Bissau": "GW",
  Haiti: "HT",
  Honduras: "HN",
  Hungary: "HU",
  India: "IN",
  Indonesia: "ID",
  Iran: "IR",
  Iraq: "IQ",
  Ireland: "IE",
  Israel: "IL",
  Italy: "IT",
  "Ivory Coast": "CI",
  "Côte d'Ivoire": "CI",
  Jamaica: "JM",
  Japan: "JP",
  Jordan: "JO",
  Kazakhstan: "KZ",
  Kenya: "KE",
  Kosovo: "XK",
  Kuwait: "KW",
  Kyrgyzstan: "KG",
  Laos: "LA",
  Latvia: "LV",
  Lebanon: "LB",
  Lesotho: "LS",
  Liberia: "LR",
  Libya: "LY",
  Lithuania: "LT",
  Luxembourg: "LU",
  Macedonia: "MK",
  "North Macedonia": "MK",
  Madagascar: "MG",
  Malawi: "MW",
  Malaysia: "MY",
  Mali: "ML",
  Mauritania: "MR",
  Mexico: "MX",
  Moldova: "MD",
  Mongolia: "MN",
  Montenegro: "ME",
  Morocco: "MA",
  Mozambique: "MZ",
  Myanmar: "MM",
  Namibia: "NA",
  Nepal: "NP",
  Netherlands: "NL",
  "New Zealand": "NZ",
  Nicaragua: "NI",
  Niger: "NE",
  Nigeria: "NG",
  "North Korea": "KP",
  Norway: "NO",
  Oman: "OM",
  Pakistan: "PK",
  Panama: "PA",
  "Papua New Guinea": "PG",
  Paraguay: "PY",
  Peru: "PE",
  Philippines: "PH",
  Poland: "PL",
  Portugal: "PT",
  "Puerto Rico": "PR",
  Qatar: "QA",
  Romania: "RO",
  Russia: "RU",
  Rwanda: "RW",
  "Saudi Arabia": "SA",
  Senegal: "SN",
  Serbia: "RS",
  "Sierra Leone": "SL",
  Slovakia: "SK",
  Slovenia: "SI",
  Somalia: "SO",
  Somaliland: "SO",
  "South Africa": "ZA",
  "South Korea": "KR",
  "South Sudan": "SS",
  Spain: "ES",
  "Sri Lanka": "LK",
  Sudan: "SD",
  Suriname: "SR",
  Swaziland: "SZ",
  eSwatini: "SZ",
  Sweden: "SE",
  Switzerland: "CH",
  Syria: "SY",
  Taiwan: "TW",
  Tajikistan: "TJ",
  Tanzania: "TZ",
  Thailand: "TH",
  "Timor-Leste": "TL",
  Togo: "TG",
  "Trinidad and Tobago": "TT",
  Tunisia: "TN",
  Turkey: "TR",
  Turkmenistan: "TM",
  Uganda: "UG",
  Ukraine: "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States of America": "US",
  "United States": "US",
  Uruguay: "UY",
  Uzbekistan: "UZ",
  Venezuela: "VE",
  Vietnam: "VN",
  "W. Sahara": "EH",
  Yemen: "YE",
  Zambia: "ZM",
  Zimbabwe: "ZW",
};
// ---------------------------------------------------------------------------
// Sample data — replace with your real data
// ---------------------------------------------------------------------------
const CLIENT_DATA: Record<string, CountryData> = {
  US: { orders: 551, earnings: 3840 },
  GB: { orders: 21, earnings: 1680 },
  CA: { orders: 29, earnings: 0 },
  AU: { orders: 26, earnings: 960 },
  DE: { orders: 9, earnings: 720 },
  IN: { orders: 7, earnings: 560 },
  FR: { orders: 6, earnings: 480 },
  NL: { orders: 5, earnings: 400 },
  SG: { orders: 4, earnings: 320 },
  AE: { orders: 3, earnings: 240 },
  BR: { orders: 3, earnings: 240 },
  ZA: { orders: 2, earnings: 160 },
  NG: { orders: 2, earnings: 160 },
  NO: { orders: 4, earnings: 160 },
  PL: { orders: 4, earnings: 160 },
  IT: { orders: 3, earnings: 160 },
  ES: { orders: 2, earnings: 160 },
  CH: { orders: 4, earnings: 160 }, 
  SA: { orders: 2, earnings: 160 }, 
  KE: { orders: 4, earnings: 160 }, 
  CO: { orders: 2, earnings: 160 }, 
  EC: { orders: 1, earnings: 160 }, 
  MA: { orders: 1, earnings: 160 }, 
  SE: { orders: 1, earnings: 160 }, 
  NZ: { orders: 2, earnings: 160 }, 
  DO: { orders: 1, earnings: 160 }, 
  LT: { orders: 1, earnings: 160 }, 
  RO: { orders: 1, earnings: 160 }, 
  VN: { orders: 1, earnings: 160 }, 
  ID: { orders: 1, earnings: 160 }, 
  FI: { orders: 1, earnings: 160 }, 
  TH: { orders: 1, earnings: 160 }, 
  PK: { orders: 2, earnings: 160 }, 
  AL: { orders: 1, earnings: 160 }, 
  HU: { orders: 2, earnings: 160 }, 
  KZ: { orders: 2, earnings: 160 }, 
  IL: { orders: 4, earnings: 160 }, 
  
  
};

const TOTAL_COUNTRIES_IN_WORLD = 195;
const activeCountries = Object.keys(CLIENT_DATA).length;
const dominationPct = Math.round(
  (activeCountries / TOTAL_COUNTRIES_IN_WORLD) * 100,
);

// ---------------------------------------------------------------------------
// Tooltip component
// ---------------------------------------------------------------------------
interface TooltipProps {
  x: number;
  y: number;
  countryName: string;
  data: CountryData | null;
}

function Tooltip({ x, y, countryName, data }: TooltipProps) {
  return (
    <div
      className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full"
      style={{ left: x, top: y - 12 }}
    >
      <div className="rounded-xl border border-white/10 bg-[#0f1623]/95 px-4 py-3 shadow-2xl backdrop-blur-md">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          {countryName}
        </p>
        {data ? (
          <>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-primary">
                {data.orders}
              </span>
              <span className="text-xs text-slate-400">orders</span>
            </div>
            {/* <p className="mt-0.5 text-xs text-emerald-400">
              ${data.earnings.toLocaleString()} earned
            </p> */}
          </>
        ) : (
          <p className="text-xs text-slate-500">No orders yet</p>
        )}
        {/* arrow */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#0f1623]/95" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat card
// ---------------------------------------------------------------------------
function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl border border-white/8 bg-white/5 px-4 py-3 backdrop-blur-sm">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className={`text-xl font-black ${accent ?? "text-white"}`}>{value}</p>
      {sub && <p className="text-[11px] text-slate-500">{sub}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldClientMap() {
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    name: string;
    data: CountryData | null;
  } | null>(null);

  const totalOrders = Object.values(CLIENT_DATA).reduce(
    (s, d) => s + d.orders,
    0,
  );
  const totalEarnings = Object.values(CLIENT_DATA).reduce(
    (s, d) => s + d.earnings,
    0,
  );


  const handleMouseMove = (
    e: React.MouseEvent<SVGPathElement>,
    name: string,
    iso: string | undefined,
  ) => {
    const rect = (
      e.currentTarget.closest("svg") as SVGSVGElement
    )?.parentElement?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      name,
      // Look up by iso, but also try matching by name directly from CLIENT_DATA
      data: iso ? (CLIENT_DATA[iso] ?? null) : null,
    });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080d14] p-6 ">
      {/* ── Header ── */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              Client Reach
            </p>
          </div>
          <h2 className="mt-1 text-3xl font-black text-white">
            World Domination{" "}
            <span className="text-emerald-400">{dominationPct}%</span>
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Clients across {activeCountries} countries
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3">
          <StatCard
            label="Total Orders"
            value={totalOrders}
            sub="all countries"
            accent="text-white"
          />
          {/* <StatCard
            label="Total Earned"
            value={`$${totalEarnings.toLocaleString()}`}
            sub="lifetime"
            accent="text-emerald-400"
          /> */}
          <StatCard
            label="Countries"
            value={activeCountries}
            sub={`of ${TOTAL_COUNTRIES_IN_WORLD}`}
            accent="text-sky-400"
          />
        </div>
      </div>

      {/* ── Map ── */}
      <div className="relative w-full overflow-hidden rounded-xl bg-white">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 140, center: [10, 20] }}
          style={{ width: "100%", height: "auto" }}
          viewBox="0 0 800 420"
        >
          <ZoomableGroup zoom={1} minZoom={1} maxZoom={6}>
            <Geographies geography={GEO_URL}>
              {({ geographies }: any) =>
                geographies.map((geo: any) => {
                  const name: string = geo.properties?.name ?? "Unknown";

                  // ✅ Look up ISO by name instead of relying on missing property
                  const iso2: string | undefined = NAME_TO_ISO[name];
                  const data = iso2 ? CLIENT_DATA[iso2] : undefined;
                  const hasData = Boolean(data && data.orders > 0);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseMove={(e: any) => handleMouseMove(e, name, iso2)}
                      onMouseLeave={() => setTooltip(null)}
                      style={{
                        default: {
                          fill: hasData ? "#5e5e5e" : "#f5f5f5",
                          stroke: "#0f172a",
                          strokeWidth: 0.4,
                          outline: "none",
                          transition: "fill 0.15s ease",
                        },
                        hover: {
                          fill: hasData ? "#2e2e2e" : "#a6a6a6",
                          stroke: "#0f172a",
                          strokeWidth: 0.4,
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: hasData ? "#86efac" : "#fde047",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-lg border border-white/8 bg-[#080d14]/80 px-3 py-2 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-teal-400" />
            <span className="text-[10px] text-slate-400">Has clients</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-slate-700" />
            <span className="text-[10px] text-slate-400">No clients yet</span>
          </div>
          <div className="ml-1 border-l border-white/10 pl-3 text-[10px] text-slate-500">
            Scroll to zoom · Drag to pan
          </div>
        </div>
      </div>

      {/* ── Tooltip ── */}
      {tooltip && (
        <Tooltip
          x={tooltip.x}
          y={tooltip.y}
          countryName={tooltip.name}
          data={tooltip.data}
        />
      )}

      {/* ── Top countries table ── */}
      {/* <div className="mt-5">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Top Markets
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Object.entries(CLIENT_DATA)
            .sort((a, b) => b[1].orders - a[1].orders)
            .slice(0, 10)
            .map(([iso, data]) => {
              const pct = Math.round((data.orders / totalOrders) * 100);
              return (
                <div
                  key={iso}
                  className="group flex flex-col gap-1 rounded-lg border border-white/8 bg-white/4 p-3 transition-colors hover:border-teal-500/30 hover:bg-teal-500/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{iso}</span>
                    <span className="text-[10px] text-slate-500">{pct}%</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-teal-400 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {data.orders} orders · ${data.earnings}
                  </span>
                </div>
              );
            })}
        </div>
      </div> */}
    </div>
  );
}
