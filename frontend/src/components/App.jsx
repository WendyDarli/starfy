import { useState } from 'react';

//COMPONENTS
import GlobalHeader from './GlobalHeader/GlobalHeader.jsx';
import LibrarySidebar from './LibrarySidebar/LibrarySidebar.jsx';
import MainSection from './MainSection/MainSection.jsx';
import PlayerFooter from './PlayerFooter/PlayerFooter.jsx';
import LoginModal from './LoginModal/LoginModal.jsx';

//HOOKS
import useAuth from '../hooks/useAuth.js';
import useDisplaySection from '../hooks/useDisplaySection.js';
import useFetchUserLibrary from '../hooks/useFetchUserLibrary.js';

export default function App() {
    const { isAuthenticated, user } = useAuth();
    const { displaySection, setDisplaySection, ActiveComponent } = useDisplaySection();
    
    const library = useFetchUserLibrary();
    const [activeId, setActiveId] = useState(null);

    return (
        <>
            <GlobalHeader setDisplaySection={setDisplaySection} user={user}/>
            {!isAuthenticated && <LoginModal />}
            
            <div id='appLayout'>
                <LibrarySidebar library={library} setDisplaySection={setDisplaySection} activeId={activeId} setActiveId={setActiveId} />
                <MainSection  >
                    <ActiveComponent key={displaySection} user={user} activeId={activeId} setActiveId={setActiveId} setDisplaySection={setDisplaySection} />
                </MainSection>  
            </div>

            <PlayerFooter />        
        </>

    );
}