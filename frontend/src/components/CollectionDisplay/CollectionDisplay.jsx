// this should receive a state from bttn with playlist id
import { useEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router';
import './CollectionDisplay.css';

import TrackList from '../TrackList/TrackList.jsx';
import TracksHeader from '../TracksHeader/TracksHeader.jsx';
import PlaylistHeader from '../PlaylistHeader/PlaylistHeader.jsx';

function CollectionDisplay() {
    const [playlistInfo, setPlaylistInfo] = useState({});

    const { id } = useParams();
    const type = 
        useMatch('/collection/:id')?.pathnameBase && 'collection' ||
        useMatch('/playlist/:id')?.pathnameBase && 'playlist' ||
        useMatch('/artist/:id')?.pathnameBase && 'artist' ||
        useMatch('/album/:id')?.pathnameBase && 'album' ||
        useMatch('/song/:id')?.pathnameBase && 'song';
        console.log( 'sending to backend: ', type, id );

    useEffect(() => {
        setPlaylistInfo({});
        fetch(`http://127.0.0.1:3000/api/${type}/${id}`,{
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, type }),
        })
        .then(res => {
            if(!res.ok) throw new Error('Error fetching user playlists.');
            return res.json();
        })
        .then(data => {
            setPlaylistInfo(data);
        })
        .catch(err => { console.log(err); })
    }, [type, id]);
    
    return(
        <div>
            <PlaylistHeader header={playlistInfo.header} type={type} id={id} />
            <div className='songsContainer'>
                <button className='circularBttn playPause playPausePlaylist'></button>
                <TracksHeader tracksHeader={playlistInfo.tracksHeader} type={type}/>
                <hr></hr>
                <TrackList songs={playlistInfo.tracks} header={playlistInfo.tracksHeader}/>
            </div>
        </div>
    )
}

export default CollectionDisplay;