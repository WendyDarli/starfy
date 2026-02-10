import './LoginModal.css';
import starfyIcon from '../../assets/whiteIcons/starfy.svg';

function LoginModal(){

    return(
        <div className='login-modal-overlay'>
            <div className='login-modal-content'>
                <img src={starfyIcon} alt='Logo' className='starfy-logo' />
                <p>Log in with your Spotify account to view your songs in Starfy.</p>
                <a className='login-button' href='http://127.0.0.1:3000/login'>Log in</a>
                <p>don't have a spotify account yet? <a className='blueText' href='https://www.spotify.com/br-pt/signup' target='_blank' rel='noopener noreferrer'>Sign up free</a></p>
            </div>

        </div>
    );
}

export default LoginModal;