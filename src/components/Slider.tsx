
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
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id}>{label}</label>
        <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
          {value}{unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  );
};

export default Slider;