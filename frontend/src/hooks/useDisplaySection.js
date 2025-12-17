import { useState } from "react";

//COMPONENTS
import Home from '../components/Home/Home.jsx';
import UserProfile from '../components/UserProfile/UserProfile.jsx';
import PlaylistDisplay from "../components/PlaylistDisplay/PlaylistDisplay.jsx";
 
const components = {
    home: Home,
    profile: UserProfile,
    playlist: PlaylistDisplay,
}

export default function useDisplaySection(){
    const [displaySection, setDisplaySection] = useState('home');
    const ActiveComponent = components[displaySection];
    return { displaySection, setDisplaySection, ActiveComponent };
}