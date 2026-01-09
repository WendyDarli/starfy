import './LibrarySidebar.css';
import { useState } from 'react';
import defaultCover from '../../assets/playlists_default_cover.png';
import likedSongsCover from '../../assets/liked_songs_cover.png'
import episodesCover from '../../assets/episodes_cover.png';

function LibrarySidebar({ library, setDisplaySection, activeId, setActiveId }) {
    const [isExpanded, setExpanded] = useState(false);

    function toggleSidebar(){
        setExpanded(prev => !prev);
        document.getElementById("appLayout").style.setProperty("--sb-width", isExpanded ? "75px" : "340px");
    };

    return(
        <aside className={`sidebarContainer ${isExpanded ? 'sb-expanded' : ''}`}>
            <div id='libraryHeader'>
                <button onClick={toggleSidebar} className='sidebarOpener noBgBttn'></button>
                <p>Your Library</p>                
            </div>

            <button className='createBttn circularBttn'><span className='bttnText'>Create</span></button>
            <nav>

                {library.episodes.total > 0 && 
                    <button className={`playlistItem ${activeId === library.episodes.href ? 'active' : ''}`} 
                            onClick={() => {setDisplaySection('playlist'); setActiveId({id: 'episodes', type: 'episodes'})}} >

                        <img className='playlistImg' src={episodesCover} alt='Episodes'/>
                        <span className='playlistInfo'>
                            <p className='playlistName active'>Your Episodes</p>
                            <p className='playlistAuthor'>Playlist</p>   
                        </span>
                    </button>
                }

                
                <button className={`playlistItem ${activeId === library.tracks.href ? 'active' : ''}`} 
                        onClick={() => {setDisplaySection('playlist'); setActiveId({id: 'tracks', type: 'tracks'})}}>

                    <img className='playlistImg' src={likedSongsCover} alt='Liked Songs'/>
                    <span className='playlistInfo'>
                        <p className='playlistName'>Liked Songs</p>
                            <p className='playlistAuthor'>Playlist • {library.tracks.total} songs</p>   
                    </span>    
                </button>
                

                {library.playlists.map(playlist => (
                    <button className={`playlistItem ${activeId === playlist.id ? 'active' : ''}`} 
                            key={playlist.id} 
                            onClick={() => {setDisplaySection('playlist'); setActiveId({id: playlist.id, type: 'playlist'})}}>

                        <img className='playlistImg' src={playlist.images?.[0]?.url || defaultCover} alt={playlist.name}/>
                        <span className='playlistInfo'>
                            <p className='playlistName'>{playlist.name}</p>
                            <p className='playlistAuthor'>Playlist • {playlist.owner.display_name}</p>   
                        </span>
                        
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default LibrarySidebar;