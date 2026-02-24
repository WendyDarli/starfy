import './UserProfile.css';
import useAuth from '../../hooks/query/useAuth';
import { useNavigate } from 'react-router';

function UserProfile() {
    const { data: user, isLoading, isError } = useAuth();
    const navigate = useNavigate();

    if (isLoading) return <div>Loading...</div>; 
    if (isError) return <div>Error loading user profile.</div>;

    async function logout() {
        const response = await fetch('http://127.0.0.1:3000/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed logout');

        if (response.ok) {
            window.location.href = '/';
        }
    };

    return (
        <div className='profileContainer'>
            <div className='profileHeader'>
                <img className='profileImage' src={user.images?.[0]?.url} alt="User Profile Image" />
                <div>
                    <h2>{user.display_name}</h2>
                    <p className='grayText'>{user.product} account</p>
                    <p className='grayText'>{user.followers?.total} Followers</p>
                </div>                
            </div>

            <div className='profileDetails'>
                <label className='profileLabel' htmlFor='email'>Email: </label>
                <input className='profileInput' id='email' type="email" value={user.email} disabled></input>

                <label className='profileLabel' htmlFor='country'>Country: </label>
                <input className='profileInput' id='country' type="text" value={user.country} disabled></input>
            </div>
            <button 
                className='logout-button'
                onClick={logout}>
                Logout
            </button>
        </div>
    )
};

export default UserProfile;