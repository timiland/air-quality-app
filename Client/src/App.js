import React, {useState, useEffect} from 'react';
import SearchBar from './components/SearchBar';
import Cards from './components/Cards';
import './styles/App.scss';



function App(props) {

    const [cards, setCards] = useState([]);

    // Get any previously saved cards from Local storage
    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('cards'));
        setCards( local ? local : []);
    }, []);


    return (

    <div className="mainCont">
        <h1 className="title">Compare your Air</h1>
            <p>
                Compare the air quality between cities in the UK. 
                <br/>
                <br/>
                Select cities to compare using the search tool below.
            </p>
        
        <SearchBar cardHandler={setCards} cards={cards}/>
        <Cards cards={cards} cardHandler={setCards}/>

    </div>

    );
}

export default App;