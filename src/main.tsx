import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import ContactPage from './pages/ContactPage';
import MainPage, { loader } from "./pages/MainPage";

import './index.css'
import './App.css';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={createBrowserRouter([
      {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />,
        loader: loader,
        children: [
          {
            path: "contacts/:contactId",
            element: <ContactPage />,
          },
        ],
      }])} />
  </React.StrictMode>,
)
