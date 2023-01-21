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
        action: mainAction,
        children: [
          { index: true, element: <IndexPage /> },
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
        ],
      }])} />
  </React.StrictMode>,
)
