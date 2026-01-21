import './TrackList.css';
import TrackRow from '../TrackRow/TrackRow.jsx';

function TrackList({ songs, type, id }) {    
    return (
        <div>
            { songs?.items?.length <= 0 && <p>This playlist is empty.</p> }
            { songs?.items?.map((item, index) => (
                <TrackRow
                    key={item.track?.id ?? index}
                    item={item}
                    index={index}
                    type={type} 
                    id={id}
                />
            ))}
        </div>
        
  );
};
export default TrackList;