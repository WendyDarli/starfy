import './TrackList.css';
import TrackRow from '../TrackRow/TrackRow.jsx';

function TrackList({ songs, header }) {    
    return (
        <div>
            { songs?.items?.length <= 0 && <p>This playlist is empty.</p> }
            { songs?.items?.map((item, index) => (
                <TrackRow
                    key={item.track?.id ?? index}
                    item={item}
                    index={index}
                    showAlbum={header?.showAlbum}
                />
            ))}
        </div>
        
  );
};
export default TrackList;