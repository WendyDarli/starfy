async function getSearchResults(query, page){
    const baseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${baseUrl}/search/${query}?_page=${page}`, 
        { credentials: 'include' });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); 
        throw new Error(errorData.message || 'Server error');
    }

    const data = await response.json();
    if(data?.error){
        throw new Error(data.error);
    }

    return data;
};

export default getSearchResults;