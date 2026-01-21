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

    //logic task, use an array function to make this more clear

    const type = 
        useMatch('/collection/:id')?.pathnameBase && 'collection' ||
        useMatch('/playlist/:id')?.pathnameBase && 'playlist' ||
        useMatch('/artist/:id')?.pathnameBase && 'artist' ||
        useMatch('/album/:id')?.pathnameBase && 'album' ||
        useMatch('/song/:id')?.pathnameBase && 'song' ||
        useMatch('episode/:id')?.pathnameBase && 'episode' ||
        useMatch('show/:id')?.pathnameBase && 'show';


    useEffect(() => {
        setPlaylistInfo({});
        fetch(`http://127.0.0.1:3000/${type}/${id}`,{
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
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
                <TracksHeader type={type} id={id}/>
                <hr></hr>
                <TrackList type={type} id={id} songs={playlistInfo.tracks}/>
            </div>
        </div>
    )
}

export default CollectionDisplay;