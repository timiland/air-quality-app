import React from 'react'
import Filter from './Filter'

function Sidebar (props) {

    const { Open, filterHandler, filters } = props; 

    return (
        <div className={`Sidebar ${Open ? 'active':''} Flex-center-col`}>
            <div className="Sidebar-Title">Specify Your Dog's Characteristics</div>
            <Filter filterName={"Select Dog Size"} filter={'size'} currentFilters={filters} filterList={['Small Dogs','Medium Dogs','Large Dogs']} filterHandler={filterHandler} />
            <Filter filterName={"Select Coat Length"} filter={'coat'} currentFilters={filters} filterList={['Short Coat','Medium Coat','Long Coat']} filterHandler={filterHandler} />
            <Filter filterName={"Select Environment"} filter={'environment'} currentFilters={filters} filterList={['urban','rural',]} filterHandler={filterHandler} />
            <Filter filterName={"Select Breed"} filter={'breed'} currentFilters={filters} filterList={['Working','Non-Sporting','Sporting','Spitz','Toys']} filterHandler={filterHandler} />
            <Filter filterName={"Select Cost"} filter={'cost'} currentFilters={filters} filterList={['Affordable','Expensive',]} filterHandler={filterHandler} />
        </div>
    )
}

export default Sidebar
