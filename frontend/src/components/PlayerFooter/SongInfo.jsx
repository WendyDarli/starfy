import defaultSongCover from '../../assets/playlists_default_cover.png';

//this is reusable extract later
function renderArtists(artists = []){
    return artists.map((a, i) => ( 
    <p key={a.id} id='songArtist'>
        {a.name}
        {i < artists.length - 1 && ', '}
    </p>  
    ));
};

function SongInfo({ currentSong }){
    const img = currentSong?.img || defaultSongCover;
    const songName = currentSong?.songName || 'No Song Playing';

    return(
        <div id='songInfoContainer'>
            <img src={img} alt='Song Cover' className='songCover' />
            
            <div className='songInfo'>
                <p id='songName'>{songName}</p>
                {renderArtists(currentSong?.artistsName)}
            </div> 

            <button 
                aria-label='Like Song' 
                className={`noBgBttn ${isFavorite ? 'likedBttn' : 'likeBttn'}`}
            />        
        </div>
    );
}

export default SongInfo;