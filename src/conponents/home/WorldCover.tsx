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

// ---------------------------------------------------------------------------
// Sample data — replace with your real data
// ---------------------------------------------------------------------------
const CLIENT_DATA: Record<string, CountryData> = {
  US: { orders: 48, earnings: 3840 },
  GB: { orders: 21, earnings: 1680 },
  CA: { orders: 0, earnings: 0 },
  AU: { orders: 12, earnings: 960 },
  DE: { orders: 9, earnings: 720 },
  IN: { orders: 7, earnings: 560 },
  FR: { orders: 6, earnings: 480 },
  NL: { orders: 5, earnings: 400 },
  SG: { orders: 4, earnings: 320 },
  AE: { orders: 3, earnings: 240 },
  BR: { orders: 3, earnings: 240 },
  ZA: { orders: 2, earnings: 160 },
  NG: { orders: 2, earnings: 160 },
};

const TOTAL_COUNTRIES_IN_WORLD = 195;
const activeCountries = Object.keys(CLIENT_DATA).length;
const dominationPct = Math.round(
  (activeCountries / TOTAL_COUNTRIES_IN_WORLD) * 100
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
              <span className="text-2xl font-black text-white">{data.orders}</span>
              <span className="text-xs text-slate-400">orders</span>
            </div>
            <p className="mt-0.5 text-xs text-emerald-400">
              ${data.earnings.toLocaleString()} earned
            </p>
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
    <div className="flex flex-col gap-0.5 rounded-xl border border-white/8 bg-white px-4 py-3 backdrop-blur-sm">
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
    0
  );
  const totalEarnings = Object.values(CLIENT_DATA).reduce(
    (s, d) => s + d.earnings,
    0
  );
  console.log("Her ius tootip", tooltip)

  const handleMouseMove = useCallback(
    (
      e: React.MouseEvent<SVGPathElement>,
      name: string,
      iso: string | undefined
    ) => {
      const rect = (e.currentTarget.closest("svg") as SVGSVGElement)
        ?.parentElement?.getBoundingClientRect();
      if (!rect) return;
      setTooltip({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        name,
        data: iso ? CLIENT_DATA[iso] ?? null : null,
      });
    },
    []
  );

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080d14] p-6 shadow-2xl">
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
          <StatCard
            label="Total Earned"
            value={`$${totalEarnings.toLocaleString()}`}
            sub="lifetime"
            accent="text-emerald-400"
          />
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
              {({ geographies }:any) =>
                geographies.map((geo:any) => {
                  // react-simple-maps v3 uses geo.properties.name; ISO is not
                  // always available in 110m topojson by default — we store a
                  // small lookup. For simplicity we match by name prefix for
                  // the demo; replace with a proper ISO lookup in production.
                  const name: string =
                    geo.properties?.name ?? "Unknown";
                  // Attempt to grab the 2-letter ISO from properties
                  const iso2: string | undefined =
                    geo.properties?.ISO_A2 ??
                    geo.properties?.iso_a2 ??
                    undefined;
                    console.log("This is the iso23",iso2)
                    const hasData = iso2 ? Boolean(CLIENT_DATA[iso2]) : false;
                    console.log("This is the dta",hasData)

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseMove={(e:any) => handleMouseMove(e, name, iso2)}
                      onMouseLeave={() => setTooltip(null)}
                      style={{
                        default: {
                          fill: hasData ? "#2dd4bf" : "#00ad5c",
                          stroke: "#0f172a",
                          strokeWidth: 0.4,
                          outline: "none",
                          transition: "fill 0.15s ease",
                        },
                        hover: {
                          fill: hasData ? "#5eead4" : "#334155",
                          stroke: "#0f172a",
                          strokeWidth: 0.4,
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: hasData ? "#99f6e4" : "#475569",
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
      <div className="mt-5">
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
      </div>
    </div>
  );
}