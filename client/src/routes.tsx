import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import TaskForm from './pages/taskPage/TaskForm';
import ContactPage, { contactLoader } from './pages/contactPage/ContactPage';
import MainPage, { action as mainAction, mainLoader } from "./pages/MainPage";
import EditContactPage, { action as editAction } from './pages/EditContactPage';
import { action as favoriteAction } from './pages/contactPage/Favorite';
import { destroy } from './actions';
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
                  element: <TaskForm />,
                  loader: async (request) => {
                    window.console.log('request', request.params.taskId)
                    return await fetch(`http://localhost:3001/api/task/${request.params.taskId}`)
                  },
                  errorElement: <div>Oops! There was an error.</div>,
                  action: async ({ request, params }) => {
                    window.console.log('request.action', request)
                    window.console.log('method.action', params)

                    const data = Object.fromEntries(await request.formData());
                    window.console.log('formData', data);
                    let description = data.description;
                    window.console.log('description', description);

                    switch (request.method) {
                      case "PUT": {
                        return {};
                      }
                    }
                  }
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
