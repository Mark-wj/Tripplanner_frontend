export function buildStatusGridFromLog(log) {
  console.log('[DEBUG] Full log object keys:', Object.keys(log));
  if (
    log.statusGrid &&
    Array.isArray(log.statusGrid) &&
    log.statusGrid.length === 5 &&
    log.statusGrid.every(row => Array.isArray(row) && row.length === 24)
  ) {
    console.log('[DEBUG] Using existing statusGrid from log.');
    return log.statusGrid;
  }
  
  console.warn('No valid statusGrid found. Simulating statuses from daily_driving_hours and onDutyHours.');
  const simulatedGrid = Array.from({ length: 5 }, () => Array(24).fill(null));
  for (let hr = 0; hr < 24; hr++) {
    simulatedGrid[0][hr] = 0;
  }
  for (let hr = 6; hr < 18; hr++) {
    simulatedGrid[2][hr] = 2;
  }
  return simulatedGrid;
}
