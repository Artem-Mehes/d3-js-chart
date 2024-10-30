import * as d3 from "d3";
import { useMemo } from "react";

export const XAxis = ({
  domain = [0, 100],
  range = [10, 290],
  boundedHeight,
}) => {
  const ticks = useMemo(() => {
    // Creates scale. The domain is the numbers of the scale. The range is the pixels of the scale.
    const xScale = d3.scaleLinear().domain(domain).range(range);

    const width = range[1] - range[0];
    // Pixels per tick is the distance between each tick.
    const pixelsPerTick = 30;
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));

    console.log("numberOfTicksTarget", numberOfTicksTarget);

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [domain, range]);

  const formatDate = d3.timeFormat("%d/%m");

  return (
    <g transform={`translate(0, ${boundedHeight})`}>
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 5)`}>
          <text
            fill="#FBFBFB"
            fillOpacity="0.5"
            style={{
              fontSize: "12px",
              textAnchor: "middle",
              transform: "translateY(20px)",
            }}
          >
            {formatDate(value)}
          </text>
        </g>
      ))}
    </g>
  );
};
