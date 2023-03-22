import { AggregateActivity, TodaysActivity } from "@/interfaces";
import { displayMsInFractionalHourFormat } from "@/utils";
import { useNavigate } from "react-router-dom";

import styles from './ActivityList.module.css';

interface props {
    aggregate: AggregateActivity
}

const ActivityList: React.FC<props> = ({ aggregate }) => {
    const navigate = useNavigate();
    return <>
        {aggregate.activities.map((activity: TodaysActivity) => {
            return <div
                key={activity._id}
                className={styles.activity}
                onClick={() => {
                    navigate(`/task/${activity._id}`);
                }}>
                <span><>{activity.title} - {displayMsInFractionalHourFormat(activity.totalTimeToday)}</></span>
            </div>
        })}
        <div>Total: {displayMsInFractionalHourFormat(aggregate.total)}</div>
    </>;
}

export default ActivityList;