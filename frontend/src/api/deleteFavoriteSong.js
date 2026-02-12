async function deleteFavoriteSong(id) {
    const response = await fetch(`http://127.0.0.1:3000/song/favorite/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id })
    });

    if (!response.ok) throw new Error('Failed to delete favorite song');

    const res = await response.json();
    return res;
};

export default deleteFavoriteSong;