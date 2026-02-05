// this should receive a state from bttn with playlist id
import { useEffect, useState } from 'react';
import useUrlParams from '../../hooks/useUrlParams.js'
import './CollectionDisplay.css';

import TrackList from '../TrackList/TrackList.jsx';
import TracksHeader from '../TracksHeader/TracksHeader.jsx';
import PlaylistHeader from '../PlaylistHeader/PlaylistHeader.jsx';

function CollectionDisplay() {
    const [playlistInfo, setPlaylistInfo] = useState({});
    const { id, type } = useUrlParams();
    
    //fetch playlists metadata
    useEffect(() => {
        setPlaylistInfo({});
        fetch(`http://127.0.0.1:3000/${type}/${id}`,{
            credentials: 'include',
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
            <PlaylistHeader header={playlistInfo.header} />
            <div className='songsContainer'>
                <button className='circularBttn playPause playPausePlaylist'></button>
                <TracksHeader/>
                <hr></hr>
                <TrackList songs={playlistInfo.tracks}/>
            </div>
        </div>
    )
}

export default CollectionDisplay;