import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


//COMPONENTS
import GlobalHeader from './components/GlobalHeader/GlobalHeader.jsx'
import LibrarySidebar from './components/LibrarySidebar/LibrarySidebar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalHeader />
    <div id='appLayout'>
      <LibrarySidebar />
    </div>
  </StrictMode>
)
