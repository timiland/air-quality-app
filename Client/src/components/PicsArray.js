import React, {Fragment} from 'react'
import ModalPic from './ModalPic'

function PicsArray(props) {

    const {sidebarToggler, Open, dogs} = props;

    const toggleSidebar = () => {
        sidebarToggler(!Open);
    }

    const dogPics = dogs.map((d,i) => <ModalPic key={i} dog={d.name}/>);


    return (
        <Fragment>
            <div className="picsArrayCont">
            <div className="SidebarBtnCont">
                <div className="SidebarBtn" onClick={toggleSidebar}>
                    Filter Dogs
                </div>
                <div className="SidebarBtn" onClick={toggleSidebar}>
                    Dogs based on your selection:
                </div>
                </div>
                <div className="picsArray">
                {dogPics}
            </div>
            </div>

        </Fragment>
    )
}

export default PicsArray
