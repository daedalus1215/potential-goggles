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
import { updateTaskForm } from './actions/actions';
import IndexPage from './pages/IndexPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


//@TODO: Having an issue with catching form stuff
import './index.css'
import './App.css';
import DateTimePage from './pages/taskPage/dateTimePage/page/DateTimePage';
import { searchLoader, taskLoader } from './actions/loaders';

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
                { index: true, element: <IndexPage /> },
                {
                  path: "task/:taskId",
                  loader: taskLoader,
                  element: <TaskPage />,
                  action: updateTaskForm,
                },
                {
                  path: "date-time/:taskId",
                  loader: taskLoader,
                  element: <DateTimePage />,
                  action: updateTaskForm,
                },
              ]
            }
          ],
        }])} />
    </QueryClientProvider>
  </React.StrictMode>,
)
