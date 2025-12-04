import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


//COMPONENTS
import GlobalHeader from './components/GlobalHeader/GlobalHeader.jsx'
import LibrarySidebar from './components/LibrarySidebar/LibrarySidebar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalHeader />
    <LibrarySidebar />
    <main>
      {/* decides which component to render based in the route */}
      <p>Main Content</p>
    </main>
  </StrictMode>
)
