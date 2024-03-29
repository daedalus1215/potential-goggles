import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import TaskPage from './pages/taskPage/TaskPage';
import MainPage from "./pages/mainPage/MainPage";
import { createDateTime, createTag, newTaskAction, updateDateTime, updateTagAction, updateTaskAction as updateTaskAction } from './actionsAndLoaders/actions';
import IndexPage from './pages/indexPage/IndexPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DateTimePage from './pages/dateTimePage/page/DateTimePage';
import { dateTimeLoader, searchLoader, tagLoader, tagsLoader, taskLoader, stackGraphLoaders } from './actionsAndLoaders/loaders';
import EditDateTimeForm from './pages/EditDateTimeForm/EditDateTimeForm';
import TagPage from './pages/tagPage/TagPage';
import { ExpandedContextProvider } from './ExpandedContext';
import EditTagPage from './pages/tagPage/EditTagPage';

import './index.css'
import StatPage from './pages/statPage/StatPage';
import { taskAndTagLoader } from './actionsAndLoaders/taskAndTagLoader';
import { allActivitiesLoader } from './actionsAndLoaders/allActivitiesLoader';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ExpandedContextProvider>
        <RouterProvider router={createBrowserRouter([
          {
            path: "/",
            element: <MainPage />,
            loader: searchLoader,
            errorElement: <ErrorPage />,
            action: newTaskAction,
            children: [
              {
                errorElement: <ErrorPage />,
                children: [
                  {
                    index: true,
                    element: <IndexPage />,
                    loader: allActivitiesLoader
                  },
                  {
                    path: "task/:taskId",
                    loader: taskAndTagLoader,
                    element: <TaskPage />,
                    
                    action: updateTaskAction
                  },
                  {
                    path: "task/:taskId/date-time",
                    loader: taskLoader,
                    element: <DateTimePage />,
                    action: createDateTime
                  },
                  {
                    path: "task/:taskId/date-time/edit/:dateTimeId",
                    loader: dateTimeLoader,
                    element: <EditDateTimeForm />,
                    action: updateDateTime,
                  },
                  {
                    path: "tags/",
                    loader: tagsLoader,
                    action: createTag,
                    element: <TagPage />,
                  },
                  {
                    path: "tag/:tagId",
                    loader: tagLoader,
                    action: updateTagAction,
                    element: <EditTagPage />,
                  },
                  {
                    path: "stats",
                    loader: stackGraphLoaders,
                    // action: updateTagAction,
                    element: <StatPage />,
                  },
                ]
              }
            ],
          }])} />
      </ExpandedContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
