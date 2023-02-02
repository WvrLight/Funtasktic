import React from 'react';
import Modal from 'react-modal';
import './modals.css';

export default function Task_Completed_Modal(props) {
  return (
    <Modal
        className="TaskCompletedModal"
        isOpen={props.showTCM} 
        onRequestClose={()=> props.setShowTCM(false)} 
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
                width: '600px',
                background: '#ECE9E9',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '15px',
                outline: 'none',
                padding: '20px'
            }
        }}
    >
      <div className="Container">
        <div className="Title">
            <label>Task Completed?</label>
        </div>
        <div className="Buttons">
            <button className="No" onClick={()=> props.setShowTCM(false)}>No</button>
            <button className="Yes" onClick={()=> props.setShowTCM(false)}>Yes</button>
        </div>
      </div>
    </Modal>
  )
}
