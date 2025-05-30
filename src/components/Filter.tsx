import { useState } from 'react';

export type FilterProps = {
  title: string;
  options: string[];
  selected: string[];
  onChange: (title: string, option: string, isChecked: boolean) => void;
};

export function Filter({ title, options, selected, onChange }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        {title}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div>
          {options.map((option) => (
            <div key={option}>
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={(e) => onChange(title, option, e.target.checked)}
              />
              <label key={option}>{option}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
