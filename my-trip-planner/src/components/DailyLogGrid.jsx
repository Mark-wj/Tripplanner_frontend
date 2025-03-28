import React from 'react';

const statuses = [
  { name: "Off Duty", color: "bg-gray-300" },
  { name: "Sleeper Berth", color: "bg-blue-300" },
  { name: "Driving", color: "bg-green-300" },
  { name: "On Duty", color: "bg-yellow-300" }
];

const DailyLogGrid = ({ initialLog }) => {
  const defaultGrid = Array.from({ length: 4 }, () => Array(24).fill(0));
  const isValidGrid =
    Array.isArray(initialLog) &&
    initialLog.every(row => Array.isArray(row) && row.length === 24);

  const grid = isValidGrid ? initialLog : defaultGrid;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Daily ELD Log</h2>
      <div className="overflow-auto border border-gray-400">
        <div className="flex">
          <div className="w-12 h-12 border border-gray-300"></div>
          {Array.from({ length: 24 }).map((_, hour) => (
            <div
              key={hour}
              className="w-12 h-12 border border-gray-300 flex items-center justify-center text-xs font-bold"
            >
              {hour}
            </div>
          ))}
        </div>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            <div className="w-12 h-12 border border-gray-300 flex items-center justify-center text-xs font-bold">
              {statuses[rowIndex].name}
            </div>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`w-12 h-12 border border-gray-300 flex items-center justify-center ${statuses[cell].color}`}
                title={`Row: ${rowIndex + 1}, Hour: ${colIndex} - ${statuses[cell].name}`}
              >
                <span className="text-xs">
                  {statuses[cell].name.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        Pre-generated ELD logs from the backend.
      </div>
    </div>
  );
};

export default DailyLogGrid;
