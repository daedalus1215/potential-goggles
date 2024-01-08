import { LoaderFunctionArgs } from "react-router-dom";
import { fetchAllDayTasks, fetchAllMonthTasksAction, fetchTags, fetchTodaysActivities } from "./loaders";

export const allActivitiesLoader = async ({ request }: LoaderFunctionArgs): Promise<any> => {
    const url = new URL(request.url)
    const date: string | null = url.searchParams.get('date');
    const includeTags: string | null = url.searchParams.get('includeTags');
    const excludeTags: string | null = url.searchParams.get('excludeTags');

    const allActivities = await fetchAllDayTasks(includeTags, excludeTags)
    const todaysActivities = await fetchTodaysActivities(date, includeTags, excludeTags);
    const monthActivities = await fetchAllMonthTasksAction(includeTags, excludeTags);

    const tags = await fetchTags();
    const options = tags.map(tag => tag.name);
    return {
        allActivities,
        todaysActivities,
        monthActivities,
        tags,
        options,
        queryDate: date,
        queryIncludeTags: includeTags,
        queryExcludeTags: excludeTags
    };
}