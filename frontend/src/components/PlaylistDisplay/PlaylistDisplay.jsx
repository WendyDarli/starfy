// this should receive a state from bttn with playlist id
import { useEffect, useState } from 'react';
import './PlaylistDisplay.css';
import clockIcon from '../../assets/grayIcons/clock.svg';

function PlaylistDisplay({ activeId }) {
    const [playlistSongs, setPlaylistSongs] = useState([]);
    const [playlistInfo, setPlaylistInfo] = useState({});

    useEffect(() => {
        setPlaylistSongs([]);
        console.log(activeId);

        fetch(`http://127.0.0.1:3000/playlist/${activeId}`,{
            credentials: 'include',
        })
        .then(res => {
            if(!res.ok) throw new Error('Error fetching user playlists.');
            return res.json();
        })
        .then(data => {

            const normalized = data.items.map(item =>
                activeId === 'episodes'
                ? { ...item.episode,
                    showOrArtist: item.episode.show?.name,
                    albumOrShow: item.episode.show?.name,
                    images: item.episode.images || [],
                    added_at: item.added_at,
                    }
                : { ...item.track,              
                    showOrArtist: item.track.artists[0]?.name,
                    albumOrShow: item.track.album?.name,
                    images: item.track.album?.images || [],
                    added_at: item.added_at,
                    }
            );
            setPlaylistSongs(normalized);
            setPlaylistInfo(data.playlist || {});
        })
        .catch(err => { console.log(err); })
    }, [activeId])

    function formatDate(dateString){
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    function formatDuration(ms){
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }


    return(
        <div>
            <div className='playlistHeader'>
                <img src='\src\assets\jeff.jpeg' className="playlistCover"></img>
                <div>
                    <p>playlist</p>
                    { activeId === 'tracks' && <h1 className='playlistTitle'>Liked Songs</h1> }
                    { activeId === 'episodes' && <h1 className='playlistTitle'>Your Episodes</h1> }
                    { activeId !== 'tracks' && activeId !== 'episodes' && <h1 className='playlistTitle' >{playlistInfo.name}</h1> }
                    <p>{playlistInfo.owner} • {playlistInfo.total} songs</p>
                </div>                
            </div>

            <div className='songsContainer'>
                <button className='circularBttn playPause playPausePlaylist'></button>
            
                <div>
                    <div className="songsHeader">
                        <p>#</p>
                        <p>title</p>
                        <p>Album</p>
                        <p>Date added</p>
                        <img className="clockIcon" src={clockIcon}/>
                    </div>
                        <hr></hr>
                    <div>
                        { playlistSongs.length <= 0 && <p>This playlist is empty.</p> }
                        { playlistSongs.map((item, index) => (
                            <div className='songContainer' key={item.id}>
                                <p>{index + 1}</p>
                                <div className='songNameContainer'>
                                    <img src={item.images?.[0]?.url} className='songImg'></img>
                                    <div>
                                        <a href='' className='whiteLink'>{item.name}</a>
                                        <a href=''>{item.showOrArtist}</a>
                                    </div>
                                </div>
                                <a href=''>{item.albumOrShow}</a>
                                <p>{formatDate(item.added_at)}</p>
                                <p>{formatDuration(item.duration_ms)}</p>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistDisplay;