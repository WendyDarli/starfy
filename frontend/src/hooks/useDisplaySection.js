import { useState } from "react";

//COMPONENTS
import Home from '../components/Home/Home.jsx';
import UserProfile from '../components/UserProfile/UserProfile.jsx';
 
const components = {
    home: Home,
    profile: UserProfile,
}

export default function useDisplaySection(){
    const [displaySection, setDisplaySection] = useState('home');
    const ActiveComponent = components[displaySection];
    return { displaySection, setDisplaySection, ActiveComponent };
}