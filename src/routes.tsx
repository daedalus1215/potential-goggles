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
import { destroy } from './actions';
import IndexPage from './pages/IndexPage';



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
          {index:  true, element: <IndexPage />},
          {
            path: "contacts/:contactId",
            loader: contactLoader,
            element: <ContactPage />
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContactPage />,
            loader: contactLoader,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroy,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      }])} />
  </React.StrictMode>,
)
