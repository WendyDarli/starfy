import './TrackList.css';
import TrackRow from '../TrackRow/TrackRow.jsx';

function TrackList({ songs, source }) { 

    return (
        <div> 
            { songs?.items?.length <= 0 && <p>This playlist is empty.</p> }
            { songs?.items?.map((item, index) => (
                <TrackRow
                    key={`${item.id }-${item.added_at || index}`}
                    item={item}
                    index={index}
                    source={source}
                />
            ))}
        </div>
  );
};
export default TrackList;