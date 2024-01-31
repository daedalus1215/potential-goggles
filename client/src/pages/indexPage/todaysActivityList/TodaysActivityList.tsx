import { AggregateActivity, TodaysActivity } from "@/interfaces";
import { displayMsInFractionalHourFormat } from "@/utils";
import { useNavigate } from "react-router-dom";

import styles from './TodaysActivityList.module.css';

interface props {
    aggregate: AggregateActivity;
}

const TodaysActivityList: React.FC<props> = ({ aggregate }) => {
    const navigate = useNavigate();
    return <>
        <div>Total: {displayMsInFractionalHourFormat(aggregate.total)}</div>
        <div className={styles.underline}></div>
        <div className={styles.TodaysActivityList}>
            {aggregate.activities.map((activity: TodaysActivity) => {
                return <div
                    key={activity.taskId}
                    className={styles.activity}
                    onClick={() => {
                        navigate(`/task/${activity.taskId}`);
                    }}>
                    <span><>{activity.title} - {displayMsInFractionalHourFormat(activity.totalTimeToday)}</></span>
                </div>
            })}
        </div>
        <div className={styles.underline}></div>
    </>;
}

export default TodaysActivityList;