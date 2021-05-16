import React, {useState} from 'react';
import Navbar from './components/Navbar'
import PicsArray from './components/PicsArray';
import Sidebar from './components/Sidebar';
import Dogs from './Dogs';
import './styles/App.scss';



function App(props) {


    // clone Dogs from JS file

    let DogsArr = Dogs;
    let filteredArr = Dogs;

    // Toggle Sidebar

    const [isOpen, setSidebar] = useState(false);

    // Set Filters

    const [filters, setFilters] = useState(
        [{ filter: "size", value: null},{ filter: "coat", value: null},{ filter: "environment", value: null},{ filter: "breed", value: null},{ filter: "cost", value: null}]
    );

    // Array of Filtered Dogs

    // let filteredArr = DogsArr.filter(Dog => filters.some(filterEl => Dog[filterEl.filter] === filterEl.value));

    // console.log(DogsArr);
    
    console.log(filteredArr);

    // Handle Filters

    const filterHandler = (selectedFilter, selectedValue) => {
        console.log('filterHandler triggered');
        setFilters(
            filters.map((f, i) => 
            f.filter === selectedFilter ? {filter: f.filter, value: ( f.value === selectedValue ? null: selectedValue)} : f )
        )

        filteredArr = DogsArr.filter(Dog => filters.some(filterEl => Dog[filterEl.filter] === filterEl.value));
    }

    console.log(filters , "Filters in App.js");

    return (
    <div className="appcont">
        <Navbar/>
        <div className="maincont">
            <Sidebar
                Open={isOpen}
                filters={filters}
                filterHandler={filterHandler}/>
            <PicsArray 
                sidebarToggler={setSidebar}
                dogs={filteredArr}
                Open={isOpen}/>
        </div>
    </div>


    );
}

export default App;