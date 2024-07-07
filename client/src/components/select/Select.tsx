import cn from 'classnames';

import styles from './Select.module.css';
import { useSmallScreenSize } from '@/hooks';
import React, { useState } from 'react';

type SelectProps = {
    name: string;
    options: any[];
}

export const Select: React.FC<SelectProps> = ({ name, options }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [showOptions, setShowOptions] = useState(false);
    const isSmallScreen = useSmallScreenSize();

    const handleOptionSelect = (option:any) => {
        setSelectedOption(option);
    };

    //@TODO: We need to abstract taskId so we can make this more agnostic.
    return <div className={styles.customSelect}>
        <select name={name}
            className={cn(styles.select, {
                [styles.smallSelect]: isSmallScreen,
                [styles.largeSelect]: !isSmallScreen
            })}>
            {options?.map((item: any) => <option
                key={item.taskId}
                id={item.name}
                value={item.name}
                selected={item.selected}
                className={styles.options}>
                {item.name}
            </option>)}
        </select>
    </div>


    return <div className="custom-select">
        <div className="select-selected" onClick={() => setShowOptions(!showOptions)}>
            {selectedOption}
        </div>
        {showOptions && (
            <div className="select-items">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={selectedOption === option ? "selected" : ""}
                        onClick={() => handleOptionSelect(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        )}
    </div>

}