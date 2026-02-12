async function getAudio(isrc){
    const response = await fetch(`http://127.0.0.1:3000/song/audio/${isrc}`,  
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