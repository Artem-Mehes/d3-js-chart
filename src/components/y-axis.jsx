import { useMemo } from "react";
import * as d3 from "d3";

export const YAxis = ({ range, domain, formatTick }) => {
  const ticks = useMemo(() => {
    const yScale = d3.scaleLinear().domain(domain).range(range);

    const height = range[0] - range[1];
    const pixelsPerTick = 30;
    const numberOfTicksTarget = Math.max(1, Math.floor(height / pixelsPerTick));

    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [domain, range]);

  return (
    <g>
      {ticks.map(({ value, yOffset }) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          <text
            fill="#FBFBFB"
            fillOpacity="0.5"
            style={{
              fontSize: "12px",
              textAnchor: "end",
              transform: "translateX(-10px)",
            }}
          >
            {formatTick(value)}
          </text>
        </g>
      ))}
    </g>
  );
};
