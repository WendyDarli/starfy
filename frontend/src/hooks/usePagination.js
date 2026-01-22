import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router';

export function usePagination(fetchFn){
    const [data, setdata] = useState({ tracks: { items: [] } });
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const loadInitialResults = async (page) => {
        setLoading(true);
        const results = await fetchFn(page);
        setdata(results);
        setLoading(false);
    };
    
    const loadMoreResults = async (page) => {
        setLoading(true);
        const newResults = await fetchFn(page);
        setdata(prev => ({
            tracks: {
            ...newResults.tracks,        
            items: [...prev.tracks.items, ...newResults.tracks.items]
            }
        }));
        
        setLoading(false);
    };

    useEffect(() => {
        setPage(0);
        loadInitialResults(0);
    },[query]);
    
    useEffect(() => {
        if(page === 0 ) return;
        loadMoreResults(page);
    }, [page]);


    const observer = useRef(); 
    const paginationTriggerRef = useCallback(
        (node) => {
        if (loading || !node) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
            setPage((prevPage) => prevPage + 1);           
            }
        });

        if (node) observer.current.observe(node);
        },[loading]
    );

    return {data, paginationTriggerRef, loading, loadInitialResults}
}