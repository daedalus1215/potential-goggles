import { AggregateActivity, TodaysActivity } from "@/interfaces";
import { displayMsInFractionalHourFormat } from "@/utils";
import { useNavigate } from "react-router-dom";

import styles from './TodaysActivityList.module.css';
import MultiSelect from "@/components/multiselect/Multiselect";
import { useState } from "react";

interface props {
    aggregate: AggregateActivity;
    options: string[];
}

const TodaysActivityList: React.FC<props> = ({ aggregate, options }) => {
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    return <>
        <div>Total: {displayMsInFractionalHourFormat(aggregate.total)}</div>
        <div className={styles.underline}></div>
        <MultiSelect
            options={options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
        />
        <div className={styles.TodaysActivityList}>
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
        <div className={styles.underline}></div>
    </>;
}

export default TodaysActivityList;