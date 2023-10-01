import { getDatesOfPastWeek } from "../../../../utils/getDate.mjs";

export const FetchWeeksTaskForStats = () => {
    const dates = getDatesOfPastWeek(new Date());
    
};

export default FetchWeeksTaskForStats;