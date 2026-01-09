import './TrackList.css';

function TrackList({ songs, setActiveId }) {

    function formatDate(dateString){
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
                { songs.length <= 0 && <p>This playlist is empty.</p> }
                { songs.map((item, index) => (
                    <div className='songContainer' key={item.id}>
                        <p>{index + 1}</p>
                        <div className='songNameContainer'>
                            <img src={item.images?.[0]?.url} className='songImg'></img>
                            <div>
                                <a href='' className='whiteLink' onClick={() => setActiveId({id: item.id, type: 'song'})}>{item.name}</a>
                                <a href='' onClick={() => setActiveId({id: item.artists[0]?.id, type: 'artist'})}>{item.showOrArtist}</a>
                            </div>
                        </div>
                        
                        {/* add props to disable album and some other details */}
                        <a href='' onClick={() => setActiveId({id: item.album?.id, type: 'album'})}>{item.albumOrShow}</a> 
                        <p>{formatDate(item.added_at)}</p>
                        <p>{formatDuration(item.duration_ms)}</p>
                    </div>
                ))}
                
            </div>
        </div>
    )
};
export default TrackList;