async function getUser() {
    const baseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${baseUrl}/isAuthenticated`, { credentials: 'include' });

    // 401 = not logged in, return null instead of throwing
    // This lets App.jsx render LoginModal normally
    if (response.status === 401) {
        return null;
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Server error');
    }

    const data = await response.json();

    if (data?.error) {
        throw new Error(data.error);
    }

    return data;
}

export default getUser;