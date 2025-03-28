import React from 'react';
import DailyLogGridReadOnly from './DailyLogGridReadOnly';

function DailyLogSheet({
  logDate,
  driverName,
  carrierName,               
  truckNumber,               
  homeTerminalAddress,       
  dailyMiles,
  dailyMileage,
  remarks,
  shippingDocs,
  statusGrid,
  fromLocation,              
  toLocation,                
  onDutyHours,               
  seventyHrEightDay,         
  sixtyHrSevenDay,           
  driverSignature            
}) {
  return (
    <div className="border border-gray-400 dark:border-gray-600 p-4 max-w-3xl mx-auto text-sm bg-white dark:bg-gray-800 dark:text-gray-200">
      <div className="text-center font-bold text-lg mb-2">
        Drivers Daily Log (24 hours)
      </div>
      <div className="flex flex-wrap justify-between mb-4">
        <div className="w-1/3 pr-2">
          <label className="block font-semibold">
            Month / Day / Year:
            <div className="border border-gray-300 dark:border-gray-600 p-1 mt-1 bg-white dark:bg-gray-700">
              {logDate}
            </div>
          </label>
        </div>
        <div className="w-1/3 px-2">
          <label className="block font-semibold">
            From:
            <div className="border border-gray-300 dark:border-gray-600 p-1 mt-1 bg-white dark:bg-gray-700">
              {fromLocation ?? '______'}
            </div>
          </label>
        </div>
        <div className="w-1/3 pl-2">
          <label className="block font-semibold">
            To:
            <div className="border border-gray-300 dark:border-gray-600 p-1 mt-1 bg-white dark:bg-gray-700">
              {toLocation ?? '______'}
            </div>
          </label>
        </div>
      </div>
      <div className="flex flex-wrap mb-4">
        <div className="w-1/2 pr-2 mb-2">
          <label className="block font-semibold">
            Total Miles Driving Today:
            <div className="border border-gray-300 dark:border-gray-600 p-1 mt-1 bg-white dark:bg-gray-700">
              {dailyMiles ?? ''}
            </div>
          </label>
        </div>
        <div className="w-1/2 pl-2 mb-2">
          <label className="block font-semibold">
            Total Mileage Today:
            <div className="border border-gray-300 dark:border-gray-600 p-1 mt-1 bg-white dark:bg-gray-700">
              {dailyMileage ?? ''}
            </div>
          </label>
        </div>
        <div className="w-1/2 pr-2 mb-2">
          <label className="block font-semibold">
            Name of Carrier or Carriers:
            <div className="border border-gray-300 dark:border-gray-600 p-1 mt-1 bg-white dark:bg-gray-700">
              {carrierName ?? ''}
            </div>
          </label>
        </div>
        <div className="w-1/2 pl-2 mb-2">
          <label className="block font-semibold">
            Home Terminal Address:
            <div className="border border-gray-300 dark:border-gray-600 p-1 mt-1 bg-white dark:bg-gray-700">
              {homeTerminalAddress ?? ''}
            </div>
          </label>
        </div>
        <div className="w-1/2 pr-2 mb-2">
          <label className="block font-semibold">
            Truck/Tractor &amp; Trailer #:
            <div className="border border-gray-300 dark:border-gray-600 p-1 mt-1 bg-white dark:bg-gray-700">
              {truckNumber ?? ''}
            </div>
          </label>
        </div>
        <div className="w-1/2 pl-2 mb-2">
          <label className="block font-semibold">
            Shipping Documents:
            <div className="border border-gray-300 dark:border-gray-600 p-1 mt-1 bg-white dark:bg-gray-700">
              {shippingDocs ?? ''}
            </div>
          </label>
        </div>
      </div>
      <div className="mb-4">
        <DailyLogGridReadOnly statusGrid={statusGrid} />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Remarks:</label>
        <div className="border border-gray-300 dark:border-gray-600 p-2 h-16 bg-white dark:bg-gray-700">
          {remarks ?? ''}
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">
          Shipping Documents (BOL/Manifest No., Shipper &amp; Commodity):
        </label>
        <div className="border border-gray-300 dark:border-gray-600 p-2 h-16 bg-white dark:bg-gray-700">
          {shippingDocs ?? ''}
        </div>
      </div>
      <div className="border border-gray-300 dark:border-gray-600 p-2 mb-4 bg-white dark:bg-gray-700">
        <div className="font-semibold mb-1">Recap: Complete at end of day</div>
        <div className="flex flex-wrap">
          <div className="w-1/3 pr-2">
            <label className="block font-semibold text-xs">
              On duty hours today:
              <div className="border border-gray-300 dark:border-gray-600 p-1 mt-1 bg-white dark:bg-gray-700">
                {onDutyHours ?? '______'}
              </div>
            </label>
          </div>
          <div className="w-1/3 px-2">
            <label className="block font-semibold text-xs">
              70 Hr/8 Day:
              <div className="border border-gray-300 dark:border-gray-600 p-1 mt-1 bg-white dark:bg-gray-700">
                {seventyHrEightDay ?? '______'}
              </div>
            </label>
          </div>
          <div className="w-1/3 pl-2">
            <label className="block font-semibold text-xs">
              60 Hr/7 Day:
              <div className="border border-gray-300 dark:border-gray-600 p-1 mt-1 bg-white dark:bg-gray-700">
                {sixtyHrSevenDay ?? '______'}
              </div>
            </label>
          </div>
        </div>
        <p className="text-xs mt-2">
          If you took 34 consecutive hours off duty, your 70 hour clock resets.
        </p>
      </div>
      <div className="flex flex-wrap mb-2">
        <div className="w-1/2 pr-2">
          <label className="block font-semibold">
            Driver Name:
            <div className="border border-gray-300 dark:border-gray-600 p-1 mt-1 bg-white dark:bg-gray-700">
              {driverName ?? ''}
            </div>
          </label>
        </div>
        <div className="w-1/2 pl-2">
          <label className="block font-semibold">
            Driver Signature:
            <div className="border border-gray-300 dark:border-gray-600 p-1 mt-1 h-8 bg-white dark:bg-gray-700">
              {driverSignature && (
                <img
                  src={driverSignature}
                  alt="Driver Signature"
                  className="object-contain h-full"
                />
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default DailyLogSheet;
