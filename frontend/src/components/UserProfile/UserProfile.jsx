import './UserProfile.css';
import { useOutletContext } from 'react-router';

function UserProfile() {
    const { user } = useOutletContext();
    if (!user) return <div>Loading...</div>; 
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

                <label className='profileLabel' htmlFor='country'>Country:</label>
                <input className='profileInput' id='country' type="text" value={user.country} disabled></input>
            </div>
            
        </div>
    )
};

export default UserProfile;