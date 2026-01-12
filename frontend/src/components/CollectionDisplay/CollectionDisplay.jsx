// this should receive a state from bttn with playlist id
import { useEffect, useState } from 'react';
import './CollectionDisplay.css';

import TrackList from '../TrackList/TrackList.jsx';
import TracksHeader from '../TracksHeader/TracksHeader.jsx';
import PlaylistHeader from '../PlaylistHeader/PlaylistHeader.jsx';


function PlaylistDisplay({ setDisplaySection, activeId, setActiveId }) {
    const [playlistInfo, setPlaylistInfo] = useState({});
    console.log('activeId:', activeId); //album, artist, song changing active id correctly

    useEffect(() => {
        setPlaylistInfo({});
        fetch(`http://127.0.0.1:3000/playlist`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id: activeId.id, 
                type: activeId.type
             }),
        })
        .then(res => {
            if(!res.ok) throw new Error('Error fetching user playlists.');
            return res.json();
        })
        .then(data => {
            console.log('Fetched playlist data:', data);
            setPlaylistInfo(data);
        })
        .catch(err => { console.log(err); })
    }, [activeId])

    return(
        <div>
            <PlaylistHeader activeId={activeId} header={playlistInfo.header} />

            <div className='songsContainer'>
                <button className='circularBttn playPause playPausePlaylist'></button>
                <TracksHeader tracksHeader={playlistInfo.tracksHeader} activeId={activeId} />
                 <hr></hr>
                <TrackList songs={playlistInfo.tracks} activeId={activeId} setActiveId={setActiveId} setDisplaySection={setDisplaySection} />

            </div>
        </div>
    )
}

export default PlaylistDisplay;