import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import TaskForm from './pages/taskPage/TaskForm';
import TaskPage, { contactLoader } from './pages/taskPage/TaskPage';
import MainPage, { action as mainAction, mainLoader } from "./pages/MainPage";
// import EditContactPage, { action as editAction } from './pages/EditContactPage';
import { destroyContact, updateTaskForm } from './actions';
import IndexPage from './pages/IndexPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


//@TODO: Having an issue with catching form stuff
import './index.css'
import './App.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={createBrowserRouter([
        {
          path: "/",
          element: <MainPage />,
          loader: mainLoader,
          errorElement: <ErrorPage />,
          children: [
            {
              errorElement: <ErrorPage />,
              children: [
                { index: true, element: <IndexPage /> },
                {
                  path: "task/:taskId",
                  loader: contactLoader,
                  element: <TaskPage />,
                  action: updateTaskForm,
                },
                {
                  path: "task/:taskId/destroy",
                  action: destroyContact,
                  errorElement: <div>Oops! There was an error.</div>,
                },
              ]
            }
          ],
        }])} />
    </QueryClientProvider>
  </React.StrictMode>,
)
