import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import ContactPage, { contactLoader } from './pages/contactPage/ContactPage';
import MainPage, { action as mainAction, mainLoader } from "./pages/MainPage";
import EditContactPage, { action as editAction } from './pages/EditContactPage';
import { action as favoriteAction } from './pages/contactPage/Favorite';
import { destroy } from './actions';
import IndexPage from './pages/IndexPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TaskPage from './pages/taskPage/TaskPage';

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
          loader: async (request) => await fetch('http://localhost:3001/api/tasks', {
            tasks: request.request
          }),
          errorElement: <ErrorPage />,
          children: [
            {
              errorElement: <ErrorPage />,
              children: [
                { index: true, element: <IndexPage /> },
                {
                  path: "tasks",
                  element: <TaskPage />,
                  // Can we just piggy back off of the Mainpage's work? Maybe need to use useQuery
                  loader: async (request) => await fetch('http://localhost:3001/api/tasks', {
                    tasks: request.request
                  }),
                  errorElement: <div>Oops! There was an error.</div>,
                },
                {
                  path: "contacts/:contactId",
                  loader: contactLoader,
                  element: <ContactPage />,
                  action: favoriteAction
                },
                {
                  path: "contacts/:contactId/edit",
                  element: <EditContactPage />,
                  loader: contactLoader,
                  action: editAction
                },
                {
                  path: "contacts/:contactId/destroy",
                  action: destroy,
                  errorElement: <div>Oops! There was an error.</div>,
                },
              ]
            }
          ],
        }])} />
    </QueryClientProvider>
  </React.StrictMode>,
)
