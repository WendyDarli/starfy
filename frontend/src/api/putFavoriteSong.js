async function putFavoriteSong(id, timeStamp) {
    const baseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${baseUrl}/song/favorite/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, timeStamp })
    });

    if (!response.ok) throw new Error('Failed to update favorite song');

    const res = await response.json();
    return res;
};

export default putFavoriteSong;