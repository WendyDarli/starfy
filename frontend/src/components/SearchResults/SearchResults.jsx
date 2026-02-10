import { useEffect } from 'react';
import { usePagination } from '../../hooks/query/usePagination.js';
import { useParams } from 'react-router';
import './SearchResults.css';

//components
import TrackList from '../TrackList/TrackList';
import TracksHeader from '../TracksHeader/TracksHeader.jsx';

function SearchResults(){
    const {data, paginationTriggerRef, loading, loadInitialResults } = usePagination(fetchSearchResults); 
    const { query } = useParams();

    //fetches initial data
    async function fetchSearchResults(page){
        const res = await fetch(`http://127.0.0.1:3000/search/${query}?_page=${page}`, {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!res.ok) throw new Error('Error searching songs.');
                 const data = await res.json();
        return data;     
    };

    useEffect(() => {
        loadInitialResults();
    }, [query]);

    return(
        <div className='searchContainer'>
            <h1>Search Results</h1>
            {loading && <p>Loading...</p>}
            <TracksHeader/>
            <hr></hr>
            <TrackList songs={data.tracks}/>
            <div ref={paginationTriggerRef }/>
        </div>        
    )
}

export default SearchResults;