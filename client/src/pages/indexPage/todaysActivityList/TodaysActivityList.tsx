import { AggregateActivity, TodaysActivity } from "@/interfaces";
import { displayMsInFractionalHourFormat } from "@/utils";
import { useNavigate } from "react-router-dom";

import styles from './TodaysActivityList.module.css';

interface props {
    aggregate: AggregateActivity
}

const TodaysActivityList: React.FC<props> = ({ aggregate }) => {
    const navigate = useNavigate();
    return <><div className={styles.TodaysActivityList}>
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
    </div>
        <div>Total: {displayMsInFractionalHourFormat(aggregate.total)}</div>
    </>;
}

export default TodaysActivityList;