import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import routes from '../routes/routes.jsx';
const router = createBrowserRouter(routes);

// TANSTACK QUERY CLIENT
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />   
      <ReactQueryDevtools initialIsOpen={false} />   
    </QueryClientProvider>

  </StrictMode>
)
