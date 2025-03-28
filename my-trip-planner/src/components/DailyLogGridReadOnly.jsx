import React from 'react';

const statusLabels = ["Off Duty", "Sleeper Berth", "Driving", "Break", "On Duty"];

function DailyLogGridReadOnly({ statusGrid }) {
  if (!Array.isArray(statusGrid) || statusGrid.length !== 5) {
    return <p>Invalid status grid data.</p>;
  }

  const hourStatuses = [];
  for (let hour = 0; hour < 24; hour++) {
    let activeRow = 0;
    for (let row = 0; row < 5; row++) {
      if (statusGrid[row][hour] === row) {
        activeRow = row;
      }
    }
    hourStatuses.push(activeRow);
  }

  const leftMargin = 50;
  const bottomMargin = 20;
  const gridWidth = 600;
  const gridHeight = 250; 
  const hourWidth = gridWidth / 24;
  const rowHeight = gridHeight / 5;
  const svgWidth = leftMargin + gridWidth;
  const svgHeight = gridHeight + bottomMargin;

  const points = hourStatuses
    .map((rowIdx, hour) => {
      const x = leftMargin + hour * hourWidth;
      const y = rowIdx * rowHeight + rowHeight / 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="overflow-x-auto mb-6">
      <svg
        width={svgWidth}
        height={svgHeight}
        className="border border-black bg-white dark:bg-gray-800"
      >
        {Array.from({ length: 6 }).map((_, i) => {
          const y = i * rowHeight;
          return (
            <line
              key={`hline-${i}`}
              x1={leftMargin}
              y1={y}
              x2={svgWidth}
              y2={y}
              className="stroke-black dark:stroke-gray-300"
              strokeWidth={1}
            />
          );
        })}
        {Array.from({ length: 25 }).map((_, i) => {
          const x = leftMargin + i * hourWidth;
          return (
            <line
              key={`vline-${i}`}
              x1={x}
              y1={0}
              x2={x}
              y2={gridHeight}
              className="stroke-black dark:stroke-gray-300"
              strokeWidth={1}
            />
          );
        })}
        <polyline
          className="fill-none stroke-red-500 dark:stroke-red-300"
          strokeWidth={2}
          points={points}
        />
        {Array.from({ length: 24 }).map((_, i) => {
          const x = leftMargin + i * hourWidth + hourWidth * 0.5;
          return (
            <text
              key={`hour-label-${i}`}
              x={x}
              y={gridHeight + bottomMargin - 5}
              fontSize={10}
              textAnchor="middle"
              className="fill-black dark:fill-gray-200"
            >
              {i}
            </text>
          );
        })}
        {statusLabels.map((label, idx) => {
          const y = idx * rowHeight + rowHeight / 2;
          return (
            <text
              key={`status-label-${idx}`}
              x={leftMargin - 5}
              y={y}
              fontSize={10}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-black dark:fill-gray-200"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default DailyLogGridReadOnly;
