import './TrackList.css';
import TrackRow from '../TrackRow/TrackRow.jsx';

function TrackList({ songs, activeId, setActiveId, setDisplaySection }) {
    if (!songs || !songs.items) return null;

    function handleSongClick(display, id, type) {
        setDisplaySection(display); 
        setActiveId({id, type})
    };
  
    return (
        <div>
            { songs?.items?.length <= 0 && <p>This playlist is empty.</p> }
            { songs.items.map((item, index) => (
                <TrackRow
                    key={item.track?.id ?? index}
                    item={item}
                    index={index}
                    activeId={activeId}
                    handleSongClick={handleSongClick}
                    headerImages={songs.header?.images}
                />
            ))}
        </div>
        
  );
};
export default TrackList;