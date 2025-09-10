
import React from 'react';

interface SliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ id, label, value, min, max, step = 1, unit = '', onChange }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="text-sm font-medium text-text-light dark:text-text-dark">{label}</label>
        <span className="text-sm font-medium bg-primary-subtle-DEFAULT text-primary dark:bg-primary-subtle-dark px-2 py-0.5 rounded-md">
          {value}{unit}
        </span>
      </div>
      <div className="relative h-5 flex items-center">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
          style={{
            background: `linear-gradient(to right, hsl(214, 89%, 52%) ${percentage}%, #d1d5db ${percentage}%)`
          }}
        />
      </div>
    </div>
  );
};

export default Slider;