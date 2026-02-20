import './TrackList.css';
import TrackRow from '../TrackRow/TrackRow.jsx';

function TrackList({ songs, playlistId }) { 

    return (
        <div> 
            { songs?.items?.length <= 0 && <p>This playlist is empty.</p> }
            { songs?.items?.map((item, index) => (
                <TrackRow
                    key={`${item.id }-${item.added_at || index}`}
                    item={item}
                    index={index}
                    playlistId={playlistId}
                />
            ))}
        </div>
  );
};
export default TrackList;