import React, { createContext, useState, useContext, ReactNode } from 'react';

interface HealthData {
  id: string;
  title: string;
  state: string;
  value: string;
}

interface HealthCardDetailsProps {
  healthData: HealthData[];
  updateHealthData: (id: string, value: string) => void;
}

const initialHealthData: HealthData[] = [
  { id: '1', title: 'Steps', state: 'No data', value: '—' },
  { id: '2', title: 'BMI', state: 'No data', value: '—' },
  { id: '3', title: 'Sleep', state: 'No data', value: '—' },
];

const HealthCardDetails = createContext<HealthCardDetailsProps | undefined>(
  undefined
);

export const HealthDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [healthData, setHealthData] = useState(initialHealthData);

  const updateHealthData = (id: string, value: string) => {
    setHealthData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, value, state: 'Updated' } : item
      )
    );
  };

  return (
    <HealthCardDetails.Provider value={{ healthData, updateHealthData }}>
      {children}
    </HealthCardDetails.Provider>
  );
};

export const useHealthData = () => {
  const context = useContext(HealthCardDetails);
  if (!context) {
    throw new Error('useHealthData must be used within a HealthDataProvider');
  }
  return context;
};
