import './SearchResults.css';

//hooks
import usePagination from '../../hooks/query/usePagination.js';
import { useParams } from 'react-router';

//components
import TrackList from '../TrackList/TrackList';
import TracksHeader from '../TracksHeader/TracksHeader.jsx';

function SearchResults(){
    const { query } = useParams();

    const { data, paginationTriggerRef, isLoading } = usePagination(query);
    const allTracks = data?.pages?.flatMap(page => page.tracks.items) ?? [];

    const consolidatedSongs = {
        items: allTracks
    };

    return(
        <div className='searchContainer'>
            <h1>Search Results</h1>
            {isLoading && <p>Loading...</p>}
            <TracksHeader/>
            <hr></hr>
            <TrackList songs={consolidatedSongs}/>
            <div ref={paginationTriggerRef }/>
        </div>        
    )
}

export default SearchResults;