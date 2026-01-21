import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './SearchResults.css';

//components
import TrackList from '../TrackList/TrackList';
import TracksHeader from '../TracksHeader/TracksHeader.jsx';

function SearchResults(){
    const [searchResults, setSearchResults] = useState([]);
    const { query } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/search/${query}`, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            if(!res.ok) throw new Error('Error searching songs.');
            return res.json();
        })
        .then(data => {
            setSearchResults(data);
        })
        .catch(err => { console.log(err); })
    },[query]);

    console.log(searchResults);
    return(
        <div className='searchContainer'>
            <h1>Search Results</h1>
            <TracksHeader/>
            <hr></hr>
            <TrackList songs={searchResults.tracks}/>

        </div>


        
    )
}

export default SearchResults;