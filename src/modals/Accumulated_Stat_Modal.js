import React from 'react';
import Modal from 'react-modal';
import './modals.css';

export default function Accumulated_Stat_Modal(props) {
  return (
    <Modal
        className="AccumulatedStatModal"
        isOpen={props.showASM} 
        onRequestClose={()=> props.setShowASM(false)} 
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
                outline: 'none',
                padding: '20px'
            }
        }}
    >
      <div className="Container">
        <div className="Content">
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <label style={{color: "#55535B", fontSize: "24px"}}>Accumulated Stat Score</label>
                <p>INT&emsp;&emsp;<span> 0</span></p>
                <p>AGI&emsp;&emsp;<span>+1</span></p>
                <p>STR&emsp;&emsp;<span> 0</span></p>
                <p>VIT&emsp;&emsp;<span>+1</span></p>
                <p>DEX&emsp;&emsp;<span>+1</span></p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <button style={{color: "white", fontWeight: "bold", backgroundColor: "#38BDA5", border: "1px solid #38BDA5", borderRadius: "10px", width: "90px", height: "30px"}}onClick={()=> props.setShowASM(false)}>Okay</button>
            </div>
        </div>
      </div>
    </Modal>
  )
}
