import React, {Fragment} from 'react'
import ModalPic from './ModalPic'
import Footer from './Footer';

function PicsArray(props) {

    const {sidebarToggler, Open, dogs} = props;

    const toggleSidebar = () => {
        sidebarToggler(!Open);
    }

    const dogPics = dogs.map((d,i) => <ModalPic key={i} dog={d.name}/>);


    return (
        <Fragment>
            <div className="picsArrayCont">
            <div className="SidebarBtnCont Flex-center-col">
                <div className={`SidebarBtn`} onClick={toggleSidebar}>
                   {Open ? 'Back to Dogs' : 'Filter Dogs'}
                </div>

            </div>
            <div className="picsAreaCont">
            <div className="picsArrayHeader Flex-center-col"> 
                    {dogs.length? 'Dogs based on your selection' : 'There are no Dogs matching your criteria'}
                </div>
                <div className="picsArray">
                {dogPics}
                </div>
                <Footer/>
            </div>
            </div>

        </Fragment>
    )
}

export default PicsArray
