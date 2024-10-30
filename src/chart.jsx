import { XAxis } from "./components/x-axis.jsx";
import { useChartDimensions } from "./use-chart-dimensions.js";
import { useMemo } from "react";
import * as d3 from "d3";
import { YAxis } from "./components/y-axis.jsx";

const data = [
  { date: "2023-01-01", amount: 100 },
  { date: "2023-02-01", amount: 150 },
  { date: "2023-03-01", amount: 200 },
  { date: "2023-04-01", amount: 170 },
  { date: "2023-05-01", amount: 210 },
];

export const Chart = () => {
  const [ref, dimensions] = useChartDimensions({});

  const xScale = useMemo(() => {
    const dates = data.map((d) => new Date(d.date));

    return d3
      .scaleTime()
      .domain([d3.min(dates), d3.max(dates)])
      .range([0, dimensions.boundedWidth]);
  }, [dimensions.boundedWidth]);

  const yScale = useMemo(() => {
    const amounts = data.map((d) => d.amount);

    return d3
      .scaleLinear()
      .domain([0, d3.max(amounts)])
      .range([dimensions.boundedHeight, 0]);
  }, [dimensions.boundedHeight]);

  return (
    <div ref={ref} className="container">
      <svg width={dimensions.width} height={dimensions.height}>
        <g
          transform={`translate(${[dimensions.marginLeft, dimensions.marginTop].join(",")})`}
        >
          <XAxis
            domain={xScale.domain()}
            range={xScale.range()}
            boundedHeight={dimensions.boundedHeight}
          />
          <YAxis
            domain={yScale.domain()}
            range={yScale.range()}
            formatTick={(value) => `${value} ATOM`}
          />
        </g>
      </svg>
    </div>
  );
};
