// this should receive a state from bttn with playlist id
import { useEffect, useState } from 'react';
import './PlaylistDisplay.css';

import TrackList from '../TrackList/TrackList.jsx';
import TracksHeader from '../TracksHeader/TracksHeader.jsx';
import TrackListHeader from '../TrackListHeader/TrackListHeader.jsx';


function PlaylistDisplay({ activeId }) {
    const [playlistSongs, setPlaylistSongs] = useState([]);
    const [playlistInfo, setPlaylistInfo] = useState({});

    useEffect(() => {
        setPlaylistSongs([]);

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

    return(
        <div>
            <TrackListHeader activeId={activeId} playlistInfo={playlistInfo} />

            <div className='songsContainer'>
                <button className='circularBttn playPause playPausePlaylist'></button>
                <TracksHeader showAlbum={false} showDateAdded={false} />
                 <hr></hr>
                <TrackList songs={playlistSongs} />

            </div>
        </div>
    )
}

export default PlaylistDisplay;