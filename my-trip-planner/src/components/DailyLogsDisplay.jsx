import React, { useRef } from 'react';
import DailyLogSheet from './DailyLogSheet';
import { buildStatusGridFromLog } from '../helpers/eldTransform';
import html2pdf from 'html2pdf.js';

const DailyLogsDisplay = ({ dailyLogs }) => {
  const logsRef = useRef(null);

  const handleDownload = () => {
    const element = logsRef.current;
    const opt = {
      margin: 0.5,
      filename: 'daily_logs.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded p-4 sm:p-6 mb-6 sm:mb-8 dark:text-gray-200">
      <div className="flex flex-col sm:flex-row justify-end mb-4 gap-2">
        <button
          onClick={handleDownload}
          className="bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Download PDF
        </button>
        <button
          onClick={handlePrint}
          className="bg-green-500 dark:bg-green-700 hover:bg-green-600 dark:hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
        >
          Print Logs
        </button>
      </div>
      <div ref={logsRef}>
        {dailyLogs?.length > 0 &&
          dailyLogs.map((log, idx) => (
            <DailyLogSheet
              key={idx}
              logDate={log.date}
              driverName={log.driver_name}
              carrierName={log.carrier}               
              truckNumber={log.truck_number}            
              homeTerminalAddress={log.home_terminal_address}  
              dailyMiles={log.daily_distance}
              dailyMileage={log.daily_distance}
              remarks={log.remarks}
              shippingDocs={log.shipping_docs}
              statusGrid={buildStatusGridFromLog(log)}
              fromLocation={log.current_location}
              toLocation={log.dropoff_location}
              onDutyHours={log.onDutyHours}
              seventyHrEightDay={log.seventyHrEightDay}
              sixtyHrSevenDay={log.sixtyHrSevenDay}
              driverSignature={log.driver_signature}    
            />
          ))}
      </div>
    </div>
  );
};

export default DailyLogsDisplay;
