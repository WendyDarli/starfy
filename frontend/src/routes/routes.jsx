import App from '../components/App.jsx';
import Home from '../components/Home/Home.jsx';
import ErrorPage from '../components/ErrorPage/ErrorPage.jsx';
import UserProfile from '../components/UserProfile/UserProfile.jsx';
import CollectionDisplay from '../components/CollectionDisplay/CollectionDisplay.jsx';
import SearchResults from '../components/SearchResults/SearchResults.jsx';


const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'playlist/:id', element: <CollectionDisplay key='playlist'/> },
      { path: 'collection/:id', element: <CollectionDisplay key='collection'/> },
      { path: 'artist/:id', element: <CollectionDisplay key='artist'/> },
      { path: 'album/:id', element: <CollectionDisplay key='album'/> },
      { path: 'show/:id', element: <CollectionDisplay key='show'/> },
      { path: 'song/:id', element: <CollectionDisplay key='song'/> },
      { path: 'episode/:id', element: <CollectionDisplay key='episode'/> },
      { path: 'search/:query', element: <SearchResults key='search'/> },
    ],
  },
];

export default routes;