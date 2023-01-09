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
            element: <ContactPage />,
            loader: contactLoader
          },
        ],
      }])} />
  </React.StrictMode>,
)
