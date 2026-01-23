import './LibrarySidebar.css';
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import defaultCover from '../../assets/playlists_default_cover.png';
import likedSongsCover from '../../assets/liked_songs_cover.png'
import episodesCover from '../../assets/episodes_cover.png';

function LibrarySidebar({ library }) {
    const [isExpanded, setExpanded] = useState(false);
    const { id } = useParams();

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
                    <Link className={`playlistItem ${id === 'episodes' ? 'active' : ''}`} to={'/collection/episodes'} >
                        <img className='playlistImg' src={episodesCover} alt='Episodes'/>
                        <span className='playlistInfo'>
                            <p className={`playlistName ${id === 'episodes' ? 'active' : ''}`}>Your Episodes</p>
                            <p className='playlistAuthor'>Playlist</p>
                        </span>
                    </Link>
                }

                
                <Link className={`playlistItem ${id === 'tracks' ? 'active' : ''}`} to={`collection/tracks`} >
                    <img className='playlistImg' src={likedSongsCover} alt='Liked Songs'/>
                    <span className='playlistInfo'>
                        <p className={`playlistName ${id === 'tracks' ? 'active' : ''}`}>Liked Songs</p>
                            <p className='playlistAuthor'>Playlist • {library.tracks.total} songs</p>   
                    </span>    
                </Link>
                

                {library.playlists.map(playlist => (
                    <Link className={`playlistItem ${id === playlist.id ? 'active' : ''}`} to={`playlist/${playlist.id}`} key={playlist.id} >
                        <img className='playlistImg' src={playlist.images?.[0]?.url || defaultCover} alt={playlist.name}/>
                        <span className='playlistInfo'>
                            <p className={`playlistName ${id === playlist.id ? 'active' : ''}`}>{playlist.name}</p>
                            <p className='playlistAuthor'>Playlist • {playlist.owner.display_name}</p>   
                        </span>
                        
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default LibrarySidebar;