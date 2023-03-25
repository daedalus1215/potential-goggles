import React from 'react';
import styles from './YearActivityGrid.module.css';

interface props {
    allActivities: any;
}
const YearActivityGrid: React.FC<props> = ({ allActivities }) => {
    console.log('allActivities', allActivities)
    return <div className={styles.grid}>
        {allActivities.map((activity: any) => {
            (<div className={styles.content}>
                {activity.date}
            </div>)
        })}
    </div>;
}

export default YearActivityGrid;