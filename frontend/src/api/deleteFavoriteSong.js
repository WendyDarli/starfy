async function deleteFavoriteSong(id) {
    const baseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${baseUrl}/song/favorite/${id}`, {
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