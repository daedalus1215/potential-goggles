import Tooltip from '@/components/toolTip/Tooltip';
import classNames from 'classnames';
import React from 'react';
import styles from './YearActivityGrid.module.css';

interface props {
    allActivities: any;
}

const YearActivityGrid: React.FC<props> = ({ allActivities }) => {
    console.log('allActivities', allActivities)

    const hover = (date:string, time:number, titles:string[]) => {
        return (<div className={styles.hoverTitle}>
            <div>Date: {date}</div>
            <div>Hours: {(time / 1000 / 60 / 60).toFixed(4)}</div>
            <ul >{titles.map((title: string) => <li>{title}</li>)}</ul>
        </div>)
    }
    return <div className={styles.grid}>
        {allActivities.map((activity: any) => (
            <Tooltip key={activity.date}
                hover={hover(activity.date, activity.time, activity.titles)}>
                <span className={classNames(styles.contentOutline, {
                    [styles.brightGold]: (activity.time / 1000 / 60) > 160,
                    [styles.gold]: (activity.time / 1000 / 60) < 160,
                    [styles.lightGold]: (activity.time / 1000 / 60) < 140,
                    [styles.darkestGreen]: (activity.time / 1000 / 60) < 120,
                    [styles.darkGreen]: (activity.time / 1000 / 60) < 100,
                    [styles.medGreen]: (activity.time / 1000 / 60) < 80,
                    [styles.lightGreen]: (activity.time / 1000 / 60) < 60,
                    [styles.yellow]: (activity.time / 1000 / 60) < 40,
                    [styles.red]: activity.time < 20,

                })}>

                </span>
            </Tooltip>
        )
        )}
    </div>;
}

export default YearActivityGrid;