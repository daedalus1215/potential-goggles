import React, { useState } from 'react';

import styles from './Multiselect.module.css';
import classNames from 'classnames';

interface MultiSelectProps {
    options: string[];
    selectedOptions: string[];
    setSelectedOptions: (options: string[]) => void;
}

const MultiSelect = ({ options, selectedOptions, setSelectedOptions }: MultiSelectProps) => {
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
    const text = selectedOptions.length > 0
        ? selectedOptions.join(', ')
        : 'Select options...';

    return (
        <div className={styles.multiSelect}>
            <div
                className={classNames(styles.dropdown, { [styles.open]: isDropdownOpen })}
                onClick={toggleDropdown}>
                <div className={styles.selectedOptions}>
                    {text}
                </div>
                <div className={classNames(styles.options, { [styles.visible]: isDropdownOpen })}>
                    {options.map((option) => (
                        <div key={option}
                            onClick={() => handleOptionClick(option)}
                            className={classNames(styles.option, {
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
