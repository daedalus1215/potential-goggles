import { QueryClient } from "@tanstack/react-query";

export const tasksQuery = () => ({
    queryKey: ['tasks'],
    queryFn: async () => fetch('/api/tasks/').then(res => res.json()),
})

export const getTasks = (queryClient: QueryClient) => async () => {
    return queryClient.fetchQuery(tasksQuery())
}