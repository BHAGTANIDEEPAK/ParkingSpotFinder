import React from 'react';
import { FC } from 'react';

const LoadingSpinner: FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;