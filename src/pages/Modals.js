import React, { useState } from 'react';
import EditProfileModal from '../modals/Edit_Profile_Modal';
import TaskAddedSuccessfullyModal from '../modals/Task_Added_Successfully_Modal';
import TaskCompletedModal from '../modals/Task_Completed_Modal';
import DifficultyModal from '../modals/Difficulty_Modal';
import DeadlineModal from '../modals/Deadline_Modal';
import DescriptionModal from '../modals/Description_Modal';
import TaskTypeModal from '../modals/Task_Type_Modal';
import IncreaseXPModal from '../modals/Increase_XP_Modal';
import AccumulatedStatModal from '../modals/Accumulated_Stat_Modal';


/* This if for modal viewing only */

export default function Modals() {
  //State of Edit Profile Modal
  const [showEPM, setShowEPM] = useState(false);
  //State of Task Added Succesfully Modal
  const [showTASM, setShowTASM] = useState(false);
  //State of Task Completed Modal
  const [showTCM, setShowTCM] = useState(false);
  //State of Difficulty Modal
  const [showDM, setShowDM] = useState(false);
  //State of Deadline Modal
  const [showDLM, setShowDLM] = useState(false);
  //State of Description Modal
  const [showDeM, setShowDeM] = useState(false);
  //State of Task Type Modal
  const [showTTM, setShowTTM] = useState(false);
  //State of Increase XP Modal
  const [showIXM, setShowIXM] = useState(false);
  //State of Accumulated Stat Modal
  const [showASM, setShowASM] = useState(false);


  return (
    <>
        <div style={{display: "flex", flexDirection: "column"}}>
            This is for modal viewing only, don't display on final app
            <button style={{marginTop: '10px'}} onClick={()=> setShowEPM(true)}>Show Edit Profile Modal</button>
            <button style={{marginTop: '10px'}} onClick={()=> setShowTASM(true)}>Show Task Added Succesfully Modal</button>
            <button style={{marginTop: '10px'}} onClick={()=> setShowTCM(true)}>Show Task Completed Modal</button>
            <button style={{marginTop: '10px'}} onClick={()=> setShowDM(true)}>Show Difficulty Modal</button>
            <button style={{marginTop: '10px'}} onClick={()=> setShowDLM(true)}>Show Deadline Modal</button>
            <button style={{marginTop: '10px'}} onClick={()=> setShowDeM(true)}>Show Description Modal</button>
            <button style={{marginTop: '10px'}} onClick={()=> setShowTTM(true)}>Show Task Type Modal</button>
            <button style={{marginTop: '10px'}} onClick={()=> setShowIXM(true)}>Show Increase XP Modal</button>
            <button style={{marginTop: '10px'}} onClick={()=> setShowASM(true)}>Show Accumulated Stat Modal</button>
        </div>
        <EditProfileModal
            showEPM={showEPM}
            setShowEPM={setShowEPM}
        />
        <TaskAddedSuccessfullyModal
            showTASM={showTASM}
            setShowTASM={setShowTASM}
        />
        <TaskCompletedModal
            showTCM={showTCM}
            setShowTCM={setShowTCM}
        />
        <DifficultyModal
            showDM={showDM}
            setShowDM={setShowDM}
        />
        <DeadlineModal
            showDLM={showDLM}
            setShowDLM={setShowDLM}
        />
        <DescriptionModal
            showDeM={showDeM}
            setShowDeM={setShowDeM}
        />
        <TaskTypeModal
            showTTM={showTTM}
            setShowTTM={setShowTTM}
        />
        <IncreaseXPModal
            showIXM={showIXM}
            setShowIXM={setShowIXM}
        />
        <AccumulatedStatModal
            showASM={showASM}
            setShowASM={setShowASM}
        />
    </>
  )
}
