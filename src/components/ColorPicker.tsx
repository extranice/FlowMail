
import React, { useState, useRef, useEffect } from 'react';

interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
}

const COLORS = [
    '#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#14b8a6', 
    '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#ec4899', '#78716c'
];

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={pickerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-8 h-8 rounded-full border-2 border-border-light dark:border-border-dark"
                style={{ backgroundColor: color }}
                aria-label="Select color"
            />
            {isOpen && (
                <div className="absolute z-10 p-2 mt-2 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-md shadow-lg grid grid-cols-6 gap-2">
                    {COLORS.map(c => (
                        <button
                            key={c}
                            onClick={() => {
                                onChange(c);
                                setIsOpen(false);
                            }}
                            className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${c === color ? 'ring-2 ring-primary ring-offset-2 ring-offset-card-light dark:ring-offset-card-dark' : ''}`}
                            style={{ backgroundColor: c }}
                            aria-label={`Color ${c}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorPicker;