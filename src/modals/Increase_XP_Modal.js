import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './modals.css';
import ProgressBar from "@ramonak/react-progress-bar";

export default function Increase_XP_Modal(props) {
    const [completion_text, setCompletionText] = useState("Task Completed!");
    const [xpPercentage, setXpPercentage] = useState(0)

    useEffect(() => {
        if (props.levelUp === true) setCompletionText('Level Up!')
        else setCompletionText('Task Completed!')
    }, [props.levelUp]); 

    useEffect(() => {
        setXpPercentage(parseInt((props.xpCurrent / props.xpNeeded) * 100))
    }, [props.xpCurrent]); 

    return (
        <Modal
            className="IncreaseXPModal"
            isOpen={props.showXpM}
            onRequestClose={() => props.setShowXpM(false)}
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
                    flexDirection: 'row',
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
            <div className="Body">
                <label style={{ fontWeight: 'bolder', fontSize: '24px' }}>{completion_text}</label>
                <div className="ProgressBarContainer">
                    <p className="ProgressBarLabel">Progress Bar :</p>
                    <ProgressBar
                        width={'40vw'}
                        height={'50px'}
                        labelAlignment={'center'}
                        baseBgColor={'#C4C4C4'}
                        bgColor={'#5479FD'}
                        completed={xpPercentage}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <label style={{ color: "#55535B", fontSize: "24px" }}>Accumulated Stat Score</label>
                        <p>STR&emsp;&emsp;<span>{props.stats[0]} + {props.statIncreases[0]}</span></p>
                        <p>DEX&emsp;&emsp;<span>{props.stats[1]} + {props.statIncreases[1]}</span></p>
                        <p>INT&emsp;&emsp;<span>{props.stats[2]} + {props.statIncreases[2]}</span></p>
                        <p>AGI&emsp;&emsp;<span>{props.stats[3]} + {props.statIncreases[3]}</span></p>
                        <p>VIT&emsp;&emsp;<span>{props.stats[4]} + {props.statIncreases[4]}</span></p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <button style={{ color: "white", fontWeight: "bold", backgroundColor: "#38BDA5", border: "1px solid #38BDA5", borderRadius: "10px", width: "90px", height: "30px" }} onClick={() => props.setShowXpM(false)}>Okay</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
