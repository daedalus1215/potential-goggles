import { TodaysActivity } from "@/interfaces";
import { displayMsInFractionalHourFormat } from "@/utils";

interface props {
    activities: TodaysActivity[]
}
const ActivityList: React.FC<props> = ({ activities }) => {
    return <>
        {activities.map(activity => {
            return <div>
                <span><>{activity.title} - {displayMsInFractionalHourFormat(activity.totalTimeToday)}</></span>
            </div>
        })}
    </>;
}

export default ActivityList;