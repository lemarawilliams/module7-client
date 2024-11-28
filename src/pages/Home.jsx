import React from 'react'
import MyPin from '../components/pinGroup';

// Need to call the list of wishboards
function Home() {
    return (
        <div>
            <h1>Lists of Lists</h1>
            <MyPin length={2} /> {/* stand in value */}
        </div>
    );
}

export default Home