async function getUserLibrary(){
    const baseUrl = import.meta.env.VITE_API_URL;    
    const response = await fetch(`${baseUrl}/collection`, 
    { credentials: 'include' });

    if(!response.ok) {
        throw new Error('Error fetching user library');
    }
    
    return response.json();
};

export default getUserLibrary;