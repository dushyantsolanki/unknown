import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the previous chart instance
    }

    const ctx = chartContainer.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "September",
          "Octomber",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Sample Data",
            data: [65, 59, 80, 81, 56],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.3,
          },
        ],
      },
      options: {
        // Add chart options here (e.g., title, legend, etc.)
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Cleanup on unmount
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={chartContainer} width="400" height="400" />
    </div>
  );
};

export default LineChart;
