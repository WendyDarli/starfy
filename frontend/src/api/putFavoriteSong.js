async function putFavoriteSong(id, timeStamp) {
    const response = await fetch(`http://127.0.0.1:3000/song/favorite/${id}`, {
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