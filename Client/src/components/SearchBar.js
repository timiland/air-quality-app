import React, { useState, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import uuid from 'uuid';
import axios from 'axios'


const SearchBarList = (props) => {

    // Filtered list of cities comes into the component via props and is mapped into a list

    const { searchList, activeIndex, clickHandler } = props;

    return searchList.length ? (

        <ul className="suggestions">

          {searchList.map((suggestion, index) => {

            return (
              <li className={index === activeIndex ? "suggestion-active" : ""} key={suggestion} onClick={clickHandler}>
                {suggestion}
              </li>
            );

          })}
        </ul>
      ) : (
        <div className="no-suggestions">
          <em>No cities match your search criteria</em>
        </div>
      );
    };


export default function SearchBar(props) {

    const { cardHandler, cards } = props

    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");
    const [errorMsg, setError] = useState(false);


    // Gets latest list of cities from the API as the user types

    const onChange = e => {

        const Input = e.target.value;

        axios.get(`https://api.openaq.org/v1/cities?limit=10000&sort=asc&country_id=GB`)
        .then(res => {

        const cities = res.data.results.map( city => city.name );

          const filteredCities = cities.filter(
            (city) =>
              city.toLowerCase().indexOf(Input.toLowerCase()) > -1
          );
     
          setFilteredSuggestions(filteredCities);

        })
        .catch(err => {
            console.log(err);
        })

        setInput(Input);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
        setError(false);
        
    };

    // Generic function to create a new card

    const createCard = (city) => {

        axios.get(`https://docs.openaq.org/v2/latest?limit=1000&&sort=asc&radius=1000&country_id=GB&city=${city}&order_by=lastUpdated&dumpRaw=false`)
        .then(res => {

        const { results } = res.data;

        const cardLocationsArr = cards.map(c => c.location);

        const apiLocationsArr = results.map(c => c.location);

        // filter the locations from the API to get only locations that do not exist in in the Application already;

        const filteredApiLocationsArr = results.filter((location) => !cardLocationsArr.includes(location.location));

        console.log(filteredApiLocationsArr);

        var result = filteredApiLocationsArr[0];

        // in no Results provide user feedback
        if(!result) {
            setError(true);
            return;
        }

        const id = uuid();

        const newCard = {
            
            id: id,
            country: "United Kingdom",
            city: result.city,
            location: result.location,
            lastUpdated: result.measurements[0].lastUpdated,
            values: result.measurements.map( m => `${m.parameter.toUpperCase()}: ${Math.round(m.value)}`).join(", ")

        };

        // Update State
        cardHandler(c => [...c, newCard]);

        // Store Cards in Local Storage
        const newCards = [...cards, newCard]

        localStorage.setItem('cards', JSON.stringify(newCards));
            
        })
        .catch(err => {
            console.log(err);
        })

        // When user either clicks an option or hits enter, restore
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);

        // Remove error if a card was successfully created
        setError(false);

    }

    // Click handler if a user decides to click in the suggestions list
    const onClick = e => {

        createCard(filteredSuggestions[filteredSuggestions.indexOf(e.target.innerText)]);
        setFilteredSuggestions([]);
        setInput(e.target.innerText);

      };



    const onKeyDown = e => {
    
        // User pressed the enter key
        if (e.keyCode === 13) {

            createCard(filteredSuggestions[activeSuggestionIndex]);

        }

        // User pressed the up arrow
        else if (e.keyCode === 38) {
          if (activeSuggestionIndex  === 0) {
            return;
          }
    
          setActiveSuggestionIndex(activeSuggestionIndex - 1);

        }

        // User pressed the down arrow
        else if (e.keyCode === 40) {
          if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
            return;
          }
    
          setActiveSuggestionIndex(activeSuggestionIndex + 1);

        }

      };  

    return (
        <Fragment>

            <div className="searchBox">
            <div className="inputBox">
            <FontAwesomeIcon icon={faSearch} size="lg" onClick={() => createCard(input)}/>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input}
                placeholder="Enter city name..."
            />
            </div>
            {showSuggestions && input && <SearchBarList searchList={filteredSuggestions} activeIndex={activeSuggestionIndex} clickHandler={onClick}/>}
            </div>
            <p className="errorBox">{errorMsg ? 'There are no more readings available in that city.' : ''}</p>

      </Fragment>
    )
}
