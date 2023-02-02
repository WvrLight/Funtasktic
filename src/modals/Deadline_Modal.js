import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { DatePicker, Checkbox, SelectPicker } from 'rsuite';
import { AiFillCloseCircle, AiFillCheckCircle }  from 'react-icons/ai';
import './modals.css';

export default function Deadline_Modal(props) {
    const dateRef = useRef(null);
    const intervalRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isRepeating, setIsRepeating] = useState(false);
    const [selectedInterval, setInterval] = useState(0);
    const intervals = [
        { label: 'Everyday', value: 1 },
        { label: 'Every 2 Days', value: 2 },
        { label: 'Every 3 Days', value: 3 },
        { label: 'Every 4 Days', value: 4 },
        { label: 'Every 5 Days', value: 5 },
        { label: 'Every 6 Days', value: 6 },
        { label: 'Every 7 Days', value: 7 },
        { label: 'Every 2 Weeks', value: 14 },
        { label: 'Every Month', value: 30 },
        { label: 'Every 2 Months', value: 60 },
    ]
    const data = intervals.map(item => ({ label: item.label, value: item.value }));

    function handleDeadlineSubmit() {
        props.setDeadline(selectedDate)
        if (isRepeating) {
            props.setIsRepeating(true)
            props.setInterval(selectedInterval)
        }
        else {
            props.setIsRepeating(false)
        }
        
        props.setShowDLM(false)
    }
  return (
    <Modal 
        className="DeadlineModal"
        isOpen={props.showDLM} 
        onRequestClose={()=> props.setShowDLM(false)} 
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
                width: '350px',
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
                <label>Deadline</label>
                <AiFillCloseCircle style={{color: "#ECE9E9"}} size="30" onClick={()=> props.setShowDLM(false)} /> 
            </div>
        </div>
        <div className="Body">
              <DatePicker ref={dateRef} format="yyyy-MM-dd" editable={false} placeholder="Select Date" className="AddDeadline" style={{ width: 200 }} onOk={(e) => setSelectedDate(e)} />
            <br />
              Repeating task? <Checkbox defaultValue={props.isRepeating} onChange={() => setIsRepeating(isRepeating ? false : true)}>Yes</Checkbox>
            <div style={{display: isRepeating ? 'block' : 'none'}}>
                  <SelectPicker ref={intervalRef} defaultValue={props.interval} searchable={false} data={data} style={{ width: 200 }} onChange={e => setInterval(e)} /> 
            </div>
        </div>
        <div className="Footer">
            <AiFillCheckCircle style={{color: "#55535B"}} size="30" onClick={()=> handleDeadlineSubmit()} />
        </div>
    </Modal>
  )
}