import React from 'react';
import styles from './YearActivityGrid.module.css';

interface props {
    allActivities: any;
}
const YearActivityGrid: React.FC<props> = ({ allActivities }) => {
    console.log('allActivities', allActivities)
    return <div className={styles.grid}>
        {allActivities.map((index: number, activity: any) => (<div key={activity.date} className={styles.content}>
            <span>{activity.date}</span>
        </div>)
        )}
    </div>;
}

export default YearActivityGrid;