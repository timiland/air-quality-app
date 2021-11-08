import React from 'react'

export default function CityCard(props) {

    const { cards, data, cardHandler } = props;

    const deleteCard = () => {

        const cardsFiltered = cards.filter(c => c.id !== data.id)

        // Update State
        cardHandler(cardsFiltered);

        // Store Cards in Local Storage
        localStorage.setItem('cards', JSON.stringify(cardsFiltered));

    }

    // Time Calculations

    const currentTime = Date.now();

    // converted Datetime into UNIX from the card

    const lastUpdated = new Date(data.lastUpdated).getTime();

    var timeDiff = currentTime - lastUpdated;

    var seconds = Number(timeDiff / 1000);

    var d = Math.floor(seconds / (3600*24));

    var h = Math.floor(seconds % (3600*24) / 3600);

    var m = Math.floor(seconds % 3600 / 60);

    var s = Math.floor(seconds % 60);

    var diffArr = [[d,"DAY"],[h,"HOUR"],[m,"MINUTE"],[s,"SECOND"]];

    // Filter out diffArr, if previous element in arr is equal to zero and current element is not equal to zero

    diffArr = diffArr.filter((t, i) => (!i) ||  (diffArr[i-1][0] == 0 && diffArr[i][0] != 0));

    // Filter out all remaining zero values and turn into 1 dimensional Array

    diffArr = diffArr.filter((t, i) => diffArr[i][0] != 0)[0];

    const diffString = `UPDATED ${diffArr[0]} ${diffArr[1]}${diffArr[0] != 1 ? "S" : ""} AGO`;

    return (
        <div className="card">
            <span className="close" onClick={deleteCard}></span>
            <p>{diffString}</p>
            <h2>{data.location}</h2>
            <p>{`in ${data.city}, United Kingdom`}</p>
            <p>{`Values: ${data.values}`}</p>
        </div>
    )
}
