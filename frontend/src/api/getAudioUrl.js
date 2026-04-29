async function getAudio(isrc){
    const baseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${baseUrl}/song/audio/${isrc}`,  
        { credentials: 'include' }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || 'Server error');
    }

    if (data?.error) {
        throw new Error(data.error);
    }

    return data;
};

export default getAudio;