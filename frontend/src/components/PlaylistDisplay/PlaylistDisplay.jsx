// this should receive a state from bttn with playlist id
import { useEffect, useState } from 'react';
import './PlaylistDisplay.css';
import clockIcon from '../../assets/grayIcons/clock.svg';

function PlaylistDisplay({ activeId }) {
    const [playlistSongs, setPlaylistSongs] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/playlist/${activeId}`,{
            credentials: 'include',
        })
        .then(res => {
            if(!res.ok) throw new Error('Error fetching user playlists.');
            return res.json();
        })
        .then(data => {           
            setPlaylistSongs(data);
        })
        .catch(err => {
            console.log(err);
        })
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
                    <h1 className='playlistTitle' >Playlist name</h1>
                    <p>owner • 333 songs</p>
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
                        { playlistSongs.length >= 1 && playlistSongs.map((song, index) => (
                            <div className='songContainer' key={song.track.id}>
                                <p>{index + 1}</p>
                                <div className='songNameContainer'>
                                    <img src={song.track.album.images[0].url} className='songImg'></img>
                                    <div>
                                        <a href='' className='whiteLink'>{song.track.name}</a>
                                        <a href=''>{song.track.artists[0].name}</a>
                                    </div>
                                </div>
                                <a href=''>{song.track.album.name}</a>
                                <p>{formatDate(song.added_at)}</p>
                                <p>{formatDuration(song.track.duration_ms)}</p>
                            </div>
                            
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistDisplay;