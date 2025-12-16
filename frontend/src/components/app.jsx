//COMPONENTS
import GlobalHeader from './GlobalHeader/GlobalHeader.jsx';
import LibrarySidebar from './LibrarySidebar/LibrarySidebar.jsx';
import MainSection from './MainSection/MainSection.jsx';
import PlayerFooter from './PlayerFooter/PlayerFooter.jsx';
import LoginModal from './LoginModal/LoginModal.jsx';

//HOOKS
import useIsAuthenticated from '../hooks/useIsAuthenticated.js';
import { useDisplaySection } from '../hooks/useDisplaySection.js';

export default function App() {
    const isAuthenticated = useIsAuthenticated();
    const { displaySection, setDisplaySection, ActiveComponent } = useDisplaySection();

    return (
        <>
            <GlobalHeader setDisplaySection={setDisplaySection}/>
            {!isAuthenticated && <LoginModal />}
            
            <div id='appLayout'>
                <LibrarySidebar />
                <MainSection >
                    <ActiveComponent key={displaySection} />
                </MainSection>  
            </div>

            <PlayerFooter />        
        </>

    );
}