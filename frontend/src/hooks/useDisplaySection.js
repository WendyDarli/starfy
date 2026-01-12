//this hook updates the page to be displayed in the main section of the app
import { useState } from "react";

//COMPONENTS
import Home from '../components/Home/Home.jsx';
import UserProfile from '../components/UserProfile/UserProfile.jsx';
import CollectionDisplay from "../components/CollectionDisplay/CollectionDisplay.jsx";
 
const components = {
    home: Home,
    profile: UserProfile,
    playlist: CollectionDisplay,
}

export default function useDisplaySection(){
    const [displaySection, setDisplaySection] = useState('home');
    const ActiveComponent = components[displaySection];
    return { displaySection, setDisplaySection, ActiveComponent };
}