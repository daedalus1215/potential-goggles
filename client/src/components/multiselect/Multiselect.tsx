import React, { useState } from 'react';

import styles from './Multiselect.module.css';
import cn from 'classnames';

interface MultiSelectProps {
    options: string[];
    selectedOptions: string[];
    setSelectedOptions: (options: string[]) => void;
    classNames?:string;
}

const MultiSelect = ({ options, selectedOptions, setSelectedOptions, classNames }: MultiSelectProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const handleOptionClick = (option: string) => {
        if (selectedOptions.includes(option)) {
            // If the option is already selected, remove it
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            // If the option is not selected, add it
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const text = (selectedOptions.length > 0 && selectedOptions?.join)
    ? selectedOptions?.join(', ')
    : selectedOptions

    return (
        <div className={cn(styles.multiSelect, classNames)}>
            <div
                className={cn(styles.dropdown, { [styles.open]: isDropdownOpen})}
                onClick={toggleDropdown}>
                <div className={styles.selectedOptions}>
                    {text}
                </div>
                <div className={cn(styles.options, { [styles.visible]: isDropdownOpen })}>
                    {options.map((option) => (
                        <div key={option}
                            onClick={() => handleOptionClick(option)}
                            className={cn(styles.option, {
                                [styles.selected]: selectedOptions.includes(option)
                            })}>
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default MultiSelect;
