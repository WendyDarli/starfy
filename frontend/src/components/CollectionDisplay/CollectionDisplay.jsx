// this should receive a state from bttn with playlist id
import './CollectionDisplay.css';
import featureNotReadyMessage from '../../utils/featureNotReadyMessage.js';

//hooks
import usePlaylist from '../../hooks/query/usePlaylist.js';
import useUrlParams from '../../hooks/utils/useUrlParams.js';


//components
import TrackList from '../TrackList/TrackList.jsx';
import TracksHeader from '../TracksHeader/TracksHeader.jsx';
import PlaylistHeader from '../PlaylistHeader/PlaylistHeader.jsx';

function CollectionDisplay() {
    const { data: playlistInfo, isLoading } = usePlaylist();
    const { id, type } = useUrlParams();
    const sourceId = playlistInfo?.header?.playlistId || id;
    const sourceType = type === 'artist' ? 'artist' : 'playlist';

    if(isLoading){
        return <p>Loading...</p>
    }
    return(
        <div>
            <PlaylistHeader header={playlistInfo?.header} />
            <div className='songsContainer'>
                <button 
                    className='circularBttn playPause playPausePlaylist'
                    onClick={featureNotReadyMessage}
                />
                <TracksHeader/>
                <hr></hr>
                <TrackList songs={playlistInfo?.tracks} source={{type: sourceType, id: sourceId}}/>
            </div>
        </div>
    )
}

export default CollectionDisplay;