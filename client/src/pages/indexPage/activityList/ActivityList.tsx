import { TodaysActivity } from "@/interfaces";
import { displayMsInFractionalHourFormat } from "@/utils";
import { useNavigate } from "react-router-dom";

import styles from './ActivityList.module.css';

interface props {
    activities: TodaysActivity[]
}

const ActivityList: React.FC<props> = ({ activities }) => {
    const navigate = useNavigate();
    return <>
        {activities.map(activity => {
            return <div
                className={styles.activity}
                onClick={() => {
                    navigate(`/task/${activity._id}`);
                }}>
                <span><>{activity.title} - {displayMsInFractionalHourFormat(activity.totalTimeToday)}</></span>
            </div>
        })}
    </>;
}

export default ActivityList;