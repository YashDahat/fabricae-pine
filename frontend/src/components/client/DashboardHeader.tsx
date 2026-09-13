import React from 'react';

interface DashboardHeaderProps {
  clientName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ clientName }) => {
  return (
    <div className="bg-white py-8 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#333333]">
          Welcome, <span className="text-[#D4AF37]">{clientName}</span>!
        </h1>
        <p className="mt-2 text-lg text-[#333333]">
          Here you can manage your dashboard and view your inquiry history.
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;