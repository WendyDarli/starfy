import './MainSection.css';
import { useParams } from 'react-router';
import { useRef, useEffect } from 'react';

function MainSection({ children }) {
    const { query } = useParams();
    const mainSectionRef = useRef();

    //resets scroll bar on new search query
    useEffect(() => {
        if (mainSectionRef.current) {
            mainSectionRef.current.scrollTo({
            top: 0,
            behavior: 'smooth',
            });
        }
    }, [query]);

    return (
        <main className='mainSectionContainer' ref={mainSectionRef}>
            {children}
        </main>
    );
}

export default MainSection;