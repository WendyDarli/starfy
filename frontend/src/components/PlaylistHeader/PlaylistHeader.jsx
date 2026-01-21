import './PlaylistHeader.css';
import { useEffect, useRef, useState } from 'react';
import ColorThief from 'colorthief';
import useUrlParams from '../../hooks/useUrlParams.js'

function PlaylistHeader( { header } ) {
    const { id, type } = useUrlParams();
    const coverSrc =
        id === 'tracks'
            ? '/src/assets/liked_songs_cover.png'
            : id === 'episodes'
            ? '/src/assets/episodes_cover.png'
            : header?.images?.[0]?.url || '/src/assets/playlists_default_cover.png';

    const isArtist = type === 'artist';
    const isShow = type === 'show';
    let followersText = '';
    let label = '';

    switch(true) {
        case isArtist && header?.followers != null:
            followersText = ` • ${formatFollowers(header.followers)}`;
            label = 'Followers';
            break;
        case isShow && header?.total != null:
            followersText = ` • ${header.total}`;
            label = 'Episodes';
            break;
        case !isArtist && header?.total != null:
            followersText = ` • ${header.total}`;
            label = 'Songs';
            break;
        default:
            followersText = '';
            label = '';
    }
    
    function formatFollowers(num) {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(0) + 'K';
        return num.toString();
    };

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
        <div className='playlistHeader' 
            style={{ background: `linear-gradient(${bgColor} 45%, #121212 85% )` }}> 
            <img ref={imgRef}
            crossOrigin='anonymous'
            src={coverSrc} 
            alt='Playlist Cover'
            className="playlistCover"
            /> 
            <div>
                <p>{header?.title}</p>
                <h1 className='playlistTitle'>{header?.name}</h1>
                <p> {header?.owner} {followersText} {label} </p>
            </div>                
        </div>
    );
};

export default PlaylistHeader;