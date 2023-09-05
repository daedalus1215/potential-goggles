import Tooltip from '@/components/toolTip/Tooltip';
import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './YearMonthActivityGrid.module.css';
import MultiSelect from '@/components/multiselect/Multiselect';

interface props {
    allActivities: any;
    options: string[];
}

const YearMonthActivityGrid: React.FC<props> = ({ allActivities, options }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const hover = (date: string, time: number, titles: string[]) => {
        return (<div className={styles.hoverTitle}>
            <div>Date: {date}</div>
            <div>Hours: {(time / 1000 / 60 / 60).toFixed(4)}</div>
            <ul >{titles.map((title: string) => <li key={title}>{title}</li>)}</ul>
        </div>)
    }
    return <div className={styles.gridContainer}>
        <MultiSelect
            options={options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
        />
        <div className={styles.grid}>
            {allActivities.map((activity: any) => (
                <Tooltip key={activity.date} hover={hover(activity.date, activity.time, activity.titles)}>
                    <span className={classNames(styles.contentOutline, {
                        [styles.darkestGreen]: (activity.time / 1000 / 60 / 60).toFixed(4) > '4',
                        [styles.darkGreen]: (activity.time / 1000 / 60 / 60).toFixed(4) > '3' && (activity.time / 1000 / 60 / 60).toFixed(4) < '4',
                        [styles.medGreen]: (activity.time / 1000 / 60 / 60).toFixed(4) > "2" && (activity.time / 1000 / 60 / 60).toFixed(4) < '3',
                        [styles.red]: (activity.time / 1000 / 60 / 60).toFixed(4) > "1" && (activity.time / 1000 / 60 / 60).toFixed(4) < '2',
                    })}>

                    </span>
                </Tooltip>
            )
            )}
        </div>
        <div className={styles.underline}></div>
    </div>;
}

export default YearMonthActivityGrid;