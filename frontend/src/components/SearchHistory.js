import React from "react";

const SearchHistory = ({ history, onSearchAgain }) => {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 w-full">
      <h2 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">
        🔍 Recent Searches
      </h2>
      <div className="space-y-3">
        {history.map((item, index) => (
          <div
            key={index}
            onClick={() => onSearchAgain(item.city)}
            className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-600 transition-all"
          >
            <div>
              <p className="font-medium">{item.city}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-blue-600">{item.temp}°C</p>
              <p className="text-xs text-gray-500">{item.condition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;