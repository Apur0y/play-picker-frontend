import ComponentHeader from "../Reuseable/Header";
import HeaderMain from "../Reuseable/HeaderMain";

interface Point {
  x: number;
  y: number;
}

interface Step {
  number: number;
  title: string;
  description: string;
}

const wrapText = (text: string, maxChars = 24) => {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if ((current + " " + word).trim().length <= maxChars) {
      current = (current + " " + word).trim();
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
};

export default function ProcessSection() {
  const steps: Step[] = [
    {
      number: 1,
      title: "Get in Touch",
      description: "Start with a quick conversation to discuss your goals and expectations."
    },
    {
      number: 2,
      title: "Upload Your Footage",
      description: "Share all match clips, highlights, and raw footage securely."
    },
    {
      number: 3,
      title: "Share Player Details",
      description: "Provide player names, numbers, and key moments for accurate identification."
    },
    {
      number: 4,
      title: "Editing in Progress",
      description: "Relax while we craft a professional, high-impact highlight video."
    },
    {
      number: 5,
      title: "Receive Final Video",
      description: "Download your polished, game-ready video and share it anywhere."
    }
  ];

  const createUniformArcPath = (count: number, svgW: number, svgH: number, padding = 40) => {
    if (count < 1) return { d: "", positions: [] as Point[], radius: 0 };

    const maxPossibleR = Math.floor((svgH - padding * 2) / (2 * count));
    const r = Math.max(16, Math.min(80, maxPossibleR));

    const totalHeight = 2 * r * count;
    const startY = Math.round((svgH - totalHeight) / 2);
    const xMid = Math.round(svgW / 2);

    let d = `M ${xMid} ${startY}`;
    const positions: Point[] = [];

    for (let i = 0; i < count; i++) {
      const targetY = startY + (i + 1) * 2 * r;
      const sweep = i % 2 === 0 ? 1 : 0;
      d += ` A ${r} ${r} 0 0 ${sweep} ${xMid} ${targetY}`;

      const centerY = startY + (2 * i + 1) * r;
      const centerX = xMid + (i % 2 === 0 ? r : -r);
      positions.push({ x: centerX, y: centerY });
    }

    return { d, positions, radius: r };
  };

  return (
    <div className="min-h-full py-6 sm:py-8 md:py-12 px-4 sm:px-6">
              {/* <ComponentHeader title=" How It Works" /> */}
              <HeaderMain title=" How It" subtitle="Works" center />
      
      <div className="max-w-4xl mx-auto">
       

        <div className="bg-white rounded-xl  p-4 sm:p-6 md:p-8">
          <div className="relative w-full overflow-x-auto">
            <svg 
              viewBox="0 0 800 650" 
              className="w-full h-auto mx-auto"
              preserveAspectRatio="xMidYMid meet"
              style={{ maxWidth: '800px', minWidth: '320px' }}
            >
              {(() => {
                const svgW = 800;
                const svgH = 650;
                const padding = 40;
                const { d, positions, radius } = createUniformArcPath(steps.length, svgW, svgH, padding);

                return (
                  <>
                    <path d={d} fill="none" stroke="#e5e7eb" strokeWidth="8" strokeLinecap="round" />

                    <defs>
                      <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>

                    <path d={d} fill="none" stroke="url(#pathGradient)" strokeWidth="6" strokeLinecap="round" />

                    {steps.map((step, index) => {
                      const pos = positions[index] || { x: 0, y: 0 };
                      const outerR = Math.round(radius * 0.9);
                      const mainR = Math.round(radius * 0.65);
                      const strokeColor = index === 0 ? '#10b981' : index === steps.length - 1 ? '#8b5cf6' : '#3b82f6';
                      const sideOffsetX = Math.max(60, Math.round(radius * 1.6));

                      return (
                        <g key={step.number}>
                          <circle cx={pos.x} cy={pos.y} r={outerR} fill="#eff6ff" opacity="0.5" />

                          <circle cx={pos.x} cy={pos.y} r={mainR} fill="white" stroke={strokeColor} strokeWidth="4" />

                          <text 
                            x={pos.x} 
                            y={pos.y + 6} 
                            textAnchor="middle" 
                            fontSize="14" 
                            fontWeight="600"
                            fill={strokeColor}
                          >
                            Step {step.number}
                          </text>

                          {(() => {
                            const isRight = index % 2 === 0;
                            const labelX = pos.x + (isRight ? sideOffsetX : -sideOffsetX);
                            const anchor = isRight ? "start" : "end";

                            const titleLines = wrapText(step.title, 25);
                            const descLines = wrapText(step.description, 30);

                            return (
                              <>
                                <text
                                  x={labelX}
                                  y={pos.y - 18}
                                  textAnchor={anchor}
                                  fontSize="20"
                                  fontWeight="600"
                                  fill="#1f2937"
                                >
                                  {titleLines.map((line, i) => (
                                    <tspan key={i} x={labelX} dy={i === 0 ? 0 : 26}>
                                      {line}
                                    </tspan>
                                  ))}
                                </text>

                                <text
                                  x={labelX}
                                  y={pos.y + 14}
                                  textAnchor={anchor}
                                  fontSize="12"
                                  fill="#6b7280"
                                >
                                  {descLines.map((line, i) => (
                                    <tspan key={i} x={labelX} dy={i === 0 ? 0 : 14}>
                                      {line}
                                    </tspan>
                                  ))}
                                </text>
                              </>
                            );
                          })()}

                          {(index === 0 || index === steps.length - 1) && (
                            <circle cx={pos.x} cy={pos.y} r={mainR} fill="none" stroke={strokeColor} strokeWidth="2" opacity="0.6">
                              <animate attributeName="r" values={`${mainR};${Math.round(mainR * 1.4)};${mainR}`} dur="2s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                            </circle>
                          )}
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}