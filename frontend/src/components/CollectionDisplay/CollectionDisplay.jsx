// this should receive a state from bttn with playlist id
import './CollectionDisplay.css';

//hooks
import usePlaylist from '../../hooks/query/usePlaylist.js';

//components
import TrackList from '../TrackList/TrackList.jsx';
import TracksHeader from '../TracksHeader/TracksHeader.jsx';
import PlaylistHeader from '../PlaylistHeader/PlaylistHeader.jsx';

function CollectionDisplay() {
    const { data: playlistInfo, isLoading } = usePlaylist();
     
    if(isLoading){
        return <p>Loading...</p>
    }
        
    return(
        <div>
            <PlaylistHeader header={playlistInfo?.header} />
            <div className='songsContainer'>
                <button className='circularBttn playPause playPausePlaylist'></button>
                <TracksHeader/>
                <hr></hr>
                <TrackList songs={playlistInfo?.tracks}/>
            </div>
        </div>
    )
}

export default CollectionDisplay;