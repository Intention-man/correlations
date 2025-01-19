"use client";
import React, { useEffect, useRef } from "react";
import functionPlot from "function-plot";
import { MoodChartProps } from "../lib/types";

const MoodChart: React.FC<MoodChartProps> = ({ data }) => {
  const plotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const plotContainer = plotRef.current;
    if (!plotContainer) return;

    if (!data || data.length === 0) {
      plotContainer.innerHTML = "<p>No data available.</p>";
      return;
    }
    plotContainer.innerHTML = ""; // Очищаем старый график

    const points = data.map((item) => [
      new Date(item.date).getTime(),
      item.mood,
    ]);

    functionPlot({
      target: plotContainer,
      yAxis: { domain: [1, 5] },
      xAxis: {
        label: "Date",
      },
      grid: true,
      data: [
        {
          fnType: "points",
          points,
          color: "#8884d8",
          graphType: "scatter",
        },
      ],
    });
    return () => {
      plotContainer.innerHTML = ""; // Очищаем при демонтировании
    };
  }, [data]);

  return <div ref={plotRef} />;
};
export default MoodChart;
