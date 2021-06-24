import React, {useState} from 'react'

export default function ModalPic(props) {

    const { dog } = props;

    const [Modal, setShowModal] = useState(false);

    return (
        <React.Fragment>
            <div className="picContPage Flex-center-col">
                <img onClick={() => setShowModal(true)} className="pic" src={require(`../images/${dog}.svg`)}></img>
                <div className="picTitle">{dog}</div>
            </div>
            {Modal ? (
            <React.Fragment>
                <div className="ModalCont Flex-center-col">

                    <div className="picContModal Flex-center-col">
                    <div onClick={()=> setShowModal(false)} type="button" className="">
                        <h1 className="closeModal">&times;</h1>
                    </div>
                    <img className="pic" src={require(`../images/${dog}.svg`)}></img>
                    <div className="picTitle">{dog}</div>
                    </div>
                    <div className="overlay"></div>
                </div>
            </React.Fragment>
            ) : null}
        </React.Fragment>
        );
    }
