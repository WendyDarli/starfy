import './MainSection.css';

function MainSection({ children }) {

    return (
        <main className='mainSectionContainer'>
            {children}
        </main>
    );
}

export default MainSection;