import React, { useRef } from 'react';
import Modal from 'react-modal';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillCloseCircle, AiFillCheckCircle }  from 'react-icons/ai';
import './modals.css';

export default function Description_Modal(props) {
    const ref = useRef(null);

    function handleDesc() {
        props.setDescription(ref.current.value)
        props.setShowDeM(false)
    }

  return (
    <Modal
        className="DescriptionModal"
        isOpen={props.showDeM} 
        onRequestClose={()=> props.setShowDeM(false)} 
        style={{
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, .5)'
            },
            content: {
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#ECE9E9',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '15px',
                outline: 'none'
            }
        }}
    >
        <div className="Header">
            <div className="Title">
                <label>Description</label>
                <AiFillCloseCircle style={{color: "#ECE9E9"}} size="35" onClick={()=> props.setShowDeM(false)} /> 
            </div>
        </div>
        <div className="Body">
            <FaRegEdit style={{color: "#55535B", marginRight: "10px"}} size="35" onClick={()=> props.setShowDeM(false)} />
              <textarea ref={ref} defaultValue={props.description} className="DescriptionInput" type="text" rows="20" cols="65" />
            <AiFillCheckCircle style={{color: "#55535B", alignSelf: "flex-end"}} size="35" onClick={()=> handleDesc()} />
        </div>
    </Modal>
  )
}
