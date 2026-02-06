import './TrackList.css';
import TrackRow from '../TrackRow/TrackRow.jsx';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router';

function TrackList({ songs }) { 
        const { setSongsList } = useOutletContext();

        //defines songs list in outlet context for prev/next song functionality
        useEffect(() => {
            if(songs?.items){
                setSongsList(songs?.items);            
            }
        }, [songs, setSongsList])


    return (
        <div> 
            { songs?.items?.length <= 0 && <p>This playlist is empty.</p> }
            { songs?.items?.map((item, index) => (
                <TrackRow
                    key={`${item.id }-${item.added_at || index}`}
                    item={item}
                    index={index}
                />
            ))}
        </div>
  );
};
export default TrackList;