import React, {Fragment} from 'react'
import CityCard from './CityCard'

export default function Cards(props) {

    const { cards, cardHandler } = props;
    
    return (
        <div className="cardsCont">
            {cards ? cards.map((c, i) => <CityCard data={c} cards={cards} key={i} cardHandler={cardHandler}/>): ""}
        </div>
    )
}
