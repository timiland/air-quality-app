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
                    <div onClick={()=> setShowModal(false)} type="button" className="w-full transition text-3xl duration-500 ease-in-out transform hover:-translate-y-1 focus:outline-none outline-none hover:bg-green-900 bg-green-800  text-white shadow-lg rounded-md p-4">
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
