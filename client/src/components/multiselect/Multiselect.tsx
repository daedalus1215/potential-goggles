import React, { useState } from 'react';

interface MultiSelectProps {
  options: string[];
}


const MultiSelect: React.FC<MultiSelectProps> = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <div>
      <h2>Select Options:</h2>
      <ul>
        {options.map((option) => (
          <li
            key={option}
            onClick={() => (option: string) => {
                if (selectedOptions.includes(option)) {
                  // If the option is already selected, remove it
                  setSelectedOptions(selectedOptions.filter((item) => item !== option));
                } else {
                  // If the option is not selected, add it
                  setSelectedOptions([...selectedOptions, option]);
                }
              }}
            style={{
              cursor: 'pointer',
              fontWeight: selectedOptions.includes(option) ? 'bold' : 'normal',
            }}
          >
            {option}
          </li>
        ))}
      </ul>
      <h2>Selected Options:</h2>
      <ul>
        {selectedOptions.map((selectedOption) => (
          <li key={selectedOption}>{selectedOption}</li>
        ))}
      </ul>
    </div>
  );
}

export default MultiSelect;
