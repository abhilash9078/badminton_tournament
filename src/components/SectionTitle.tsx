import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{children}</h2>
      <div className="mt-4 mx-auto w-24 h-1 bg-blue-600 rounded-full"></div>
    </div>
  );
};

export default SectionTitle;