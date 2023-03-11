import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import TaskPage from './pages/taskPage/TaskPage';
import MainPage from "./pages/mainPage/MainPage";
import { createDateTime, createTag, newTaskAction, updateDateTime, updateTagAction, updateTaskAction as updateTaskAction } from './actions/actions';
import IndexPage from './pages/indexPage/IndexPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DateTimePage from './pages/dateTimePage/page/DateTimePage';
import { dateTimeLoader, searchLoader, tagLoader, tagsLoader, taskLoader, tasksLoader } from './actions/loaders';
import EditDateTimeForm from './pages/EditDateTimeForm/EditDateTimeForm';

import './index.css'
import './App.css';
import TagPage from './pages/tagPage/TagPage';
import EditTagPage from './pages/tagPage/EditTagPage';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={createBrowserRouter([
        {
          path: "/",
          element: <MainPage />,
          loader: searchLoader,
          errorElement: <ErrorPage />,
          children: [
            {
              errorElement: <ErrorPage />,
              children: [
                {
                  index: true,
                  element: <IndexPage />,
                  action: newTaskAction,
                },
                {
                  path: "task/:taskId",
                  loader: taskLoader,
                  element: <TaskPage />,
                  action: updateTaskAction,
                },
                {
                  path: "date-time/:taskId",
                  loader: taskLoader,
                  element: <DateTimePage />,
                  action: createDateTime
                },
                {
                  path: "date-time/:taskId/edit/:dateTimeId",
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
              ]
            }
          ],
        }])} />
    </QueryClientProvider>
  </React.StrictMode>,
)
