// this should receive a state from bttn with playlist id
import { useEffect, useState, useRef } from 'react';
import './PlaylistDisplay.css';

import TrackList from '../TrackList/TrackList.jsx';
import TracksHeader from '../TracksHeader/TracksHeader.jsx';

import ColorThief from 'colorthief';


function PlaylistDisplay({ activeId }) {
    const [playlistSongs, setPlaylistSongs] = useState([]);
    const [playlistInfo, setPlaylistInfo] = useState({});

    const coverSrc =
        activeId === 'tracks'
            ? '/src/assets/liked_songs_cover.png'
            : activeId === 'episodes'
            ? '/src/assets/episodes_cover.png'
            : playlistInfo?.images?.[0]?.url || '/src/assets/playlists_default_cover.png';


    console.log(playlistSongs);
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



    // colorthief for playlist bg color
    const imgRef = useRef(null);
    const [bgColor, setBgColor] = useState('rgb(18,18,18)');

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        const colorThief = new ColorThief();

        const extractColor = () => {
            if (img.naturalWidth === 0 || img.naturalHeight === 0) {
            return;
            }

            try {
                const [r, g, b] = colorThief.getColor(img);
                setBgColor(`rgb(${r}, ${g}, ${b})`);
            } catch (err) {
                console.warn('Color extraction failed:', err);
                setBgColor('rgb(18,18,18)');
            }
        };

        img.complete ? extractColor() : img.onload = extractColor;

        return () => img.onload = null;
    }, [coverSrc]);
   

    return(
        <div>

            <div className='playlistHeader' style={{ background: `linear-gradient(${bgColor} 45%, #121212 85% )` }}>
                <img
                ref={imgRef}
                crossOrigin='anonymous'
                src={coverSrc}
                className="playlistCover"
                />
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
                <TracksHeader showAlbum={true} showDateAdded={true} />
                 <hr></hr>
                <TrackList songs={playlistSongs} />

            </div>
        </div>
    )
}

export default PlaylistDisplay;