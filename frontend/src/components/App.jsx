//COMPONENTS
import GlobalHeader from './GlobalHeader/GlobalHeader.jsx';
import LibrarySidebar from './LibrarySidebar/LibrarySidebar.jsx';
import MainSection from './MainSection/MainSection.jsx';
import PlayerFooter from './PlayerFooter/PlayerFooter.jsx';
import LoginModal from './LoginModal/LoginModal.jsx';

//HOOKS
import useAuth from '../hooks/useAuth.js';
import useFetchUserLibrary from '../hooks/useFetchUserLibrary.js';
import { Outlet } from 'react-router';
import useCurrentSong from '../hooks/useCurrentSong.js';

export default function App() {
    const { isAuthenticated, user } = useAuth();
    const library = useFetchUserLibrary();
    const { currentSong, setCurrentSong, isPlaying, setIsPlaying } = useCurrentSong();
    

    return (
        <>
            <GlobalHeader user={user}/>
            {!isAuthenticated && <LoginModal />}
            
            <div id='appLayout'>
                <LibrarySidebar library={library}/>
                <MainSection>
                    <Outlet context={{user, currentSong, setCurrentSong, isPlaying, setIsPlaying }}/>
                </MainSection>  
            </div>

            <PlayerFooter />        
        </>

    );
}