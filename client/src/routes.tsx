import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import TaskPage from './pages/taskPage/TaskPage';
import MainPage from "./pages/MainPage";
// import EditContactPage, { action as editAction } from './pages/EditContactPage';
import { newTaskAction, updateDateTime, updateTaskAction as updateTaskAction } from './actions/actions';
import IndexPage from './pages/IndexPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


//@TODO: Having an issue with catching form stuff
import './index.css'
import './App.css';
import DateTimePage from './pages/dateTimePage/page/DateTimePage';
import { dateTimeLoader, searchLoader, taskLoader } from './actions/loaders';
import EditDateTimeForm from './pages/EditDateTimeForm/EditDateTimeForm';

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
          action: newTaskAction,
          children: [
            {
              errorElement: <ErrorPage />,
              children: [
                { index: true, element: <IndexPage /> },
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
                },
                {
                  path: "date-time/:taskId/edit/:dateTimeId",
                  loader: dateTimeLoader,
                  element: <EditDateTimeForm />,
                  action: updateDateTime,
                },
              ]
            }
          ],
        }])} />
    </QueryClientProvider>
  </React.StrictMode>,
)
