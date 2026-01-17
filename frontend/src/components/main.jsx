import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App.jsx';
import Home from './Home/Home.jsx';
import UserProfile from './UserProfile/UserProfile.jsx';
import CollectionDisplay from './CollectionDisplay/CollectionDisplay.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'profile', element: <UserProfile /> },
      //add index for collection and playlist
      { path: 'playlist/:id', element: <CollectionDisplay key='playlist'/> },
      { path: 'collection/:id', element: <CollectionDisplay key='collection'/> },
      { path: 'artist/:id', element: <CollectionDisplay key='artist'/> },
      { path: 'album/:id', element: <CollectionDisplay key='album'/> },
      { path: 'show/:id', element: <CollectionDisplay key='show'/> },
      { path: 'song/:id', element: <CollectionDisplay key='song'/> },
      { path: 'episode/:id', element: <CollectionDisplay key='episode'/> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
)
