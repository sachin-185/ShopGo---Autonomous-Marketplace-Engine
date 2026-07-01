import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;