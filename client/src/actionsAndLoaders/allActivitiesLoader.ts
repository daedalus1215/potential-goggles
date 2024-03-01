import { LoaderFunctionArgs } from "react-router-dom";
import { fetchAllDayTasks, fetchAllMonthTasks, fetchTags, fetchTodaysActivities } from "./loaders";

export const allActivitiesLoader = async ({ request }: LoaderFunctionArgs): Promise<any> => {
    const url = new URL(request.url)
    const params = {
        date: url.searchParams.get('date') ?? undefined,
        includeTags: url.searchParams.get('includeTags') ?? undefined,
        excludeTags: url.searchParams.get('excludeTags') ?? undefined,

    }

    const todaysActivities = await fetchTodaysActivities(params);

    const mobile = url.searchParams.get('isMobile') ?? false;

    const allActivities = mobile ? [] : await fetchAllDayTasks(params)
    const monthActivities = mobile ? [] : await fetchAllMonthTasks(params);

    const tags = await fetchTags();
    const options = tags.map(tag => tag.name);

    return {
        allActivities,
        todaysActivities,
        monthActivities,
        tags,
        options,
        queryDate: params.date,
        queryIncludeTags: params.includeTags,
        queryExcludeTags: params.excludeTags
    };
}



