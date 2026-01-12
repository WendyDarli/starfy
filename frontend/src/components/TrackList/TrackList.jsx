import './TrackList.css';
import React from 'react';

function TrackList({ songs, activeId, setActiveId, setDisplaySection }) {
    if (!songs || !songs.items) return null;
    console.log('act', activeId.type)
    console.log('TrackList songs:', songs.items);


    function formatDate(dateString){
        if(!dateString) return '';
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    function formatDuration(ms){
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <div>
                { songs?.items?.length <= 0 && <p>This playlist is empty.</p> }
                { songs?.items?.map((item, index) => {
                    
                    const media = item.track ?? item.episode ?? item;
                    const albumOrShow = media.album ?? media.show ?? item;
                    const imageUrl = albumOrShow.images?.[0]?.url ?? songs.header?.images?.[0]?.url ?? null;
                    const artist = media.artists
                        ? media.artists  // tracks
                        : [media.show?.name];
                        console.log('media:', media);
                        console.log(albumOrShow);
                    console.log('album url: ' , albumOrShow.images?.[0]?.url);


                return(
                    <div className='songContainer' key={media.id}>
                        <p>{index + 1}</p>
                        <div className='songNameContainer'>
                            <img src={imageUrl} className='songImg'></img>
                            <div>
                                <a href='#' className='whiteLink' 
                                onClick={() => {
                                    setDisplaySection('playlist'); setActiveId({id: media.id, type: 'song'})}}>{media.name}</a>
                                <span className='songArtists'>
                                    {artist?.map((a, i) => (
                                        <React.Fragment key={a.id}>
                                        <a
                                            href="#"
                                            onClick={() => {setDisplaySection('playlist'); setActiveId({ id: a.id, type: 'artist' })}}
                                        >
                                            {a.name}
                                        </a>
                                        {i < artist.length - 1 && ', '}
                                        </React.Fragment>
                                    ))}
                                </span>
                            </div>
                        </div>

                        { activeId.type === 'playlist' || activeId.type === 'tracks' ?
                        <a href='#' 
                        onClick={() => {
                            setDisplaySection('playlist'); 
                            setActiveId({id: albumOrShow?.id || '', type: 'album'})}}
                            >
                                {albumOrShow?.name || ''}
                            </a> : <p></p> }
                        <p>{formatDate(item.added_at)}</p>
                        <p>{formatDuration(media.duration_ms)}</p>
                    </div>
                )})}
                
            </div>
        </div>
    )
};
export default TrackList;