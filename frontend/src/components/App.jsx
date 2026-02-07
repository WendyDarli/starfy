//COMPONENTS
import GlobalHeader from './GlobalHeader/GlobalHeader.jsx';
import LibrarySidebar from './LibrarySidebar/LibrarySidebar.jsx';
import MainSection from './MainSection/MainSection.jsx';
import PlayerFooter from './PlayerFooter/PlayerFooter.jsx';
import LoginModal from './LoginModal/LoginModal.jsx';

//HOOKS
import { useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import useFetchUserLibrary from '../hooks/useFetchUserLibrary.js';
import { Outlet } from 'react-router';
import useCurrentSong from '../hooks/useCurrentSong.js';
import useSongControls from '../hooks/useSongControls.js';


export default function App() {
    const [ songsList, setSongsList ] = useState(null);
    const { isAuthenticated, user } = useAuth();
    const library = useFetchUserLibrary();
    const { currentSong, setCurrentSong, isPlaying, setIsPlaying, lyrics} = useCurrentSong();
    const { nextSong, previousSong, randomSong } = useSongControls(currentSong, songsList);
    return (
        <>
            <GlobalHeader user={user}/>
            {!isAuthenticated && <LoginModal />}
            
            <div id='appLayout'>
                <LibrarySidebar library={library}/>
                <MainSection>
                    <Outlet context={{user, currentSong, setCurrentSong, isPlaying, setIsPlaying, lyrics, setSongsList }}/>
                </MainSection>  
            </div>

            <PlayerFooter 
                currentSong={currentSong} 
                setCurrentSong={setCurrentSong} 
                isPlaying={isPlaying} 
                setIsPlaying={setIsPlaying} 
                nextSong={nextSong} 
                previousSong={previousSong} 
                randomSong={randomSong} 
            />  
        </>

    );
}