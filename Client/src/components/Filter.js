import React, {useState} from 'react'
import { useSpring, animated, config} from "react-spring";
import useMeasure from "react-use-measure";

function Filter(props) {

    const [Open, setOpen] = useState(false);

    const [measureRef, { height }] = useMeasure();

    // React Spring animation to collapse filter box

    const styles = useSpring({
      config: { duration: 200, precision: 1 },
        from: {
          height: 0
        },
        to: {
          height: Open ? height : 0
        }
      });

    // ES6 Desctructuring Props... you've gotta love it.

    const { filterName, filter, currentFilters, filterList, filterHandler } = props;

    // Create Filter Elements

    // console.log(currentFilters.some(filt => filt.value === f));

    const Filters = filterList.map((f, x)=> 
    <div
      key={x}
      className={`FilterBtn ${currentFilters.some(filt => filt.value === f) ? 'selected':'unselected'}`}
      onClick={() =>  filterHandler(filter, f)}>{f}</div>
    )

    return (
        <div className="FilterCont">
            <div className="FilterTitle" onClick={() => setOpen(!Open)}>{filterName}</div>

            <animated.div 
                style={{ overflow: "hidden", ...styles }}
            >
                <div className="Flex-center-col" ref={measureRef}>
                {Filters}
                </div>
            </animated.div>
        </div>
    )
}

export default Filter
