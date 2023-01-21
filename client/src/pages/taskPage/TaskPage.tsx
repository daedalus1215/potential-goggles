import { QueryClient, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

const TaskPage = () => {
    console.log('ouch')
    // const {data}:any = useQuery(tasksQuery());
    const { items: tasks } = useLoaderData();
    window.console.log('data', tasks);
    return <div>
        {tasks?.map((dad: any) => <div key={dad.id}>{dad.title}</div>)}
    </div>
};

export default TaskPage;