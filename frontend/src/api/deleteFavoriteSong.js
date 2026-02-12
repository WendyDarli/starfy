async function deleteFavoriteSong(id, timeStamp) {
    const response = await fetch(`http://127.0.0.1:3000/songs/favorite/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, timeStamp })
    });

    if (!response.ok) {
        throw new Error('Failed to delete favorite song');
    };

    const res = await response.json();
    return res;
};

export default deleteFavoriteSong;