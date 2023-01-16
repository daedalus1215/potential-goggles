import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import ContactPage, { contactLoader } from './pages/ContactPage';
import MainPage, { action, mainLoader } from "./pages/MainPage";

import './index.css'
import './App.css';
import EditContactPage from './pages/EditContactPage';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={createBrowserRouter([
      {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />,
        loader: mainLoader,
        action: action,
        children: [
          {
            path: "contacts/:contactId",
            loader: contactLoader,
            element: <ContactPage />
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContactPage />,
            loader: contactLoader,
          }
        ],
      }])} />
  </React.StrictMode>,
)
