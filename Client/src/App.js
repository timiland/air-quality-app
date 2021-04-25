import React from 'react';
import Navbar from './components/Navbar'
import PicsArray from './components/PicsArray';
import Sidebar from './components/Sidebar'
import './styles/App.scss';

function App(props) {
    return (
    <div className="appcont">
        <Navbar/>
        <div className="maincont">
            <Sidebar/>
            <PicsArray/>
        </div>
    </div>


    );
}

export default App;