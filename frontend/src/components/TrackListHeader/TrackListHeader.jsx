import './TrackListHeader.css';
import { useEffect, useRef, useState } from 'react';
import ColorThief from 'colorthief';

function TrackListHeader( { activeId, playlistInfo } ) {

    const coverSrc =
        activeId === 'tracks'
            ? '/src/assets/liked_songs_cover.png'
            : activeId === 'episodes'
            ? '/src/assets/episodes_cover.png'
            : playlistInfo?.images?.[0]?.url || '/src/assets/playlists_default_cover.png';

    
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
        <div className='playlistHeader' style={{ background: `linear-gradient(${bgColor} 45%, #121212 85% )` }}> {/* use artist img */}
            <img
            ref={imgRef}
            crossOrigin='anonymous'
            src={coverSrc} 
            alt='Playlist Cover'
            className="playlistCover"
            />  {/* if activeId !== 'artist page'*/}
            <div>
                <p>playlist</p> {/* Playlist / Album / Artist / Song*/}
                { activeId === 'tracks' && <h1 className='playlistTitle'>Liked Songs</h1> } {/* Liked Songs / Episodes / Playlist Name / Album Name / Artist Name / Song Name */}
                { activeId === 'episodes' && <h1 className='playlistTitle'>Your Episodes</h1> } {/* Liked Songs / Episodes / Playlist Name / Album Name / Artist Name / Song Name */}
                { activeId !== 'tracks' && activeId !== 'episodes' && <h1 className='playlistTitle' >{playlistInfo.name}</h1> } {/* Liked Songs / Episodes / Playlist Name / Album Name / Artist Name / Song Name */}
                <p>{playlistInfo.owner} • {playlistInfo.total} songs</p> {/* OwnerName - total songs / Artist Name - total songs / total followers / artist name - album - duration */}
            </div>                
        </div>
    );
};

export default TrackListHeader;