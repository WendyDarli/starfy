async function getUserLibrary(){
    const response = await fetch('http://127.0.0.1:3000/library', 
    { credentials: 'include' });

    if(!response.ok) {
        throw new Error('Error fetching user library');
    }
    
    return response.json();
};

export default getUserLibrary;