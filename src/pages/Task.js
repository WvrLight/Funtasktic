import React, { useState, useEffect } from 'react';
import { IconButton, Button, Tooltip, Whisper } from "rsuite"; // npm i rsuite --save
import { Detail, Calendar, Rate, Tag } from '@rsuite/icons'; // npm install rsuite @rsuite/icons
import DescriptionModal from '../modals/Description_Modal';
import DeadlineModal from '../modals/Deadline_Modal';
import DifficultyModal from '../modals/Difficulty_Modal';
import TaskTypeModal from '../modals/Task_Type_Modal';
import TaskAddedSuccessfullyModal from '../modals/Task_Added_Successfully_Modal';
import Increase_XP_Modal from '../modals/Increase_XP_Modal';
import "rsuite/dist/rsuite.min.css";
import "./pages.css";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { MdEdit } from 'react-icons/md';
import { MdCheckCircle } from "react-icons/md";
import { RiDeleteBinLine } from 'react-icons/ri';

export default function Task() {
  const ButtonStyle = { margin: "0px 5px", left: "-5px"};
  const [showButtons, setShowButtons] = useState(false)
  const [showDeM, setShowDeM] = useState(false)
  const [showDLM, setShowDLM] = useState(false)
  const [showDM, setShowDM] = useState(false)
  const [showTTM, setShowTTM] = useState(false)
  const [showTASM, setShowTASM] = useState(false)
  const [showXpM, setShowXpM] = useState(false)
  const [levelUp, setLevelUpState] = useState(false)
  const [stats, setStats] = useState(false)
  const [statIncreases, setStatIncreases] = useState(false)
  const [xpCurrent, setXpCurrent] = useState(0)
  const [xpNeeded, setXpNeeded] = useState(1)

  // Task Add Info
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [isRepeating, setIsRepeating] = useState(false)
  const [interval, setInterval] = useState(0)
  const [difficulty, setDifficulty] = useState("")
  const [taskType, setTaskType] = useState("")

  // Task Lists
  // const empty_list = [
  //   {
  //     'taskname': 1
  //   }
  // ]

  const [fitness_tasks, setFitnessTasks] = useState([])
  const [school_tasks, setSchoolTasks] = useState([])
  const [chores_tasks, setChoresTasks] = useState([])
  const [health_tasks, setHealthTasks] = useState([])
  const [social_tasks, setSocialTasks] = useState([])
  const [work_tasks, setWorkTasks] = useState([])
  const [completed_tasks, setCompletedTasks] = useState([])

  function handleCompleteTask(taskId, taskType) {
    const task_obj = {
      'taskId': taskId,
      'userId': parseInt(sessionStorage.getItem('funtasktic-id')),
    }
    console.log(task_obj)

    // User Info
    setStats([0, 0, 0, 0, 0])
    setStatIncreases([0, 0, 0, 0, 0])
    // var old_level = 0
    // var new_level = 1
    var stat_str = 0
    var stat_dex = 0
    var stat_int = 0
    var stat_agi = 0
    var stat_vit = 0

    fetch(`http://localhost:3001/user/get?id=${task_obj.userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        getUserTasks()
        return response.text()
      })
      .then(data => {
        const user_data = JSON.parse(data)
        if (user_data.rowCount === 1) {
          stat_str = user_data.rows[0]['userstatstr']
          stat_dex = user_data.rows[0]['userstatdex']
          stat_int = user_data.rows[0]['userstatint']
          stat_agi = user_data.rows[0]['userstatagi']
          stat_vit = user_data.rows[0]['userstatvit']
          
          setStats([stat_str, stat_dex, stat_int, stat_agi, stat_vit])

          switch (taskType) {
            case 0:
              setStatIncreases([1, 0, 0, 0, 1])
              break;
            case 1:
              setStatIncreases([0, 0, 2, 0, 0])
              break;
            case 2:
              setStatIncreases([0, 2, 0, 0, 0])
              break;
            case 3:
              setStatIncreases([0, 0, 0, 1, 1])
              break;
            case 4:
              setStatIncreases([0, 1, 1, 0, 0])
              break;
            case 5:
              setStatIncreases([0, 0, 1, 0, 1])
              break;
            default:
              setStatIncreases([0, 0, 1, 0, 0])
              break;
          }
        }
      }) 

    fetch('http://localhost:3001/task/complete_task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task_obj),
      })
        .then(response => {
          getUserTasks()
          return response.text();
        })
        .then(data => {
          if (JSON.parse(data).rowCount >= 1) {
            console.log("Leveled up!")
            setLevelUpState(true)
          }
          else setLevelUpState(false)
        })

    fetch(`http://localhost:3001/user/get?id=${task_obj.userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.text()
      })
      .then(data => {
        const user_data = JSON.parse(data)
        if (user_data.rowCount === 1) {
          setXpCurrent(user_data.rows[0]['xpcurrent'])
          setXpNeeded(user_data.rows[0]['xpneeded'])
        }
      }) 

    setShowXpM(true)
  }


  function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const getUserTasks = () => {
    const id = sessionStorage.getItem('funtasktic-id')

    let url = `http://localhost:3001/task/get?id=${id}`

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.text()
      })
      .then(data => {
        const task_data = JSON.parse(data)
        if (task_data.rowCount > 0) {
          const grouped_tasks = groupBy(task_data.rows, 'tasktype')
          const completed_tasks = groupBy(task_data.rows, 'iscompleted')
          if (task_data.rows.find(item => item.tasktype === 0 && item.iscompleted === false)) setFitnessTasks(grouped_tasks['0'].filter(item => item.iscompleted === false))
          if (task_data.rows.find(item => item.tasktype === 1 && item.iscompleted === false)) setSchoolTasks(grouped_tasks['1'].filter(item => item.iscompleted === false))
          if (task_data.rows.find(item => item.tasktype === 2 && item.iscompleted === false)) setChoresTasks(grouped_tasks['2'].filter(item => item.iscompleted === false))
          if (task_data.rows.find(item => item.tasktype === 3 && item.iscompleted === false)) setHealthTasks(grouped_tasks['3'].filter(item => item.iscompleted === false))
          if (task_data.rows.find(item => item.tasktype === 4 && item.iscompleted === false)) setSocialTasks(grouped_tasks['4'].filter(item => item.iscompleted === false))
          if (task_data.rows.find(item => item.tasktype === 5 && item.iscompleted === false)) setWorkTasks(grouped_tasks['5'].filter(item => item.iscompleted === false))

          if (task_data.rows.find(item => item.iscompleted === true)) setCompletedTasks(completed_tasks[true])
        }
        else {
        }
      })
    }


  const handleAddTask = (event) => {
    event.preventDefault()

    const task_obj = {
      'userId': parseInt(sessionStorage.getItem('funtasktic-id')),
      'taskName': event.target.task.value,
      'taskType': taskType,
      'taskDeadline': new Date(Date.parse(deadline)).toISOString(),
      'isRepeating': isRepeating,
      'repeatInterval': interval,
      'taskDifficulty': difficulty,
      'taskNotes': description,
    }
    console.log(task_obj)

    fetch('http://localhost:3001/task/add_task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task_obj),
    })
      .then(response => {
        return response.text();
      })

    getUserTasks()
    setShowTASM(true)
  }

  function handleDeleteTask(id) {
    let url = `http://localhost:3001/task/delete_task?id=${id}`

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        getUserTasks()
        return response.text();
      })
  }

  useEffect(() => {
    getUserTasks()
  }, []); 

  return (
    <div className="TaskPage">
      <div className="LeftColumn">
        <form method="post" onSubmit={handleAddTask} className="AddTaskForm">
          <input type="text" name="task" className="AddTask" placeholder="Add Task" />
          <div className="AddTaskButtons" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div>
                <Whisper followCursor speaker={<Tooltip>Notes</Tooltip>}>
                  <IconButton icon={<Detail />} color="violet" appearance="primary" style={ButtonStyle} 
                    onClick={()=> setShowDeM(true)} />
                </Whisper>

                <Whisper followCursor speaker={<Tooltip>Deadline</Tooltip>}>
                  <IconButton icon={<Calendar />} color="green" appearance="primary" style={ButtonStyle}
                    onClick={()=> setShowDLM(true)} />
                </Whisper>

                <Whisper followCursor speaker={<Tooltip>Difficulty</Tooltip>}>
                  <IconButton icon={<Rate />} color="yellow" appearance="primary" style={ButtonStyle}
                    onClick={()=> setShowDM(true)} />
                </Whisper>
                
                <Whisper followCursor speaker={<Tooltip>Task Type</Tooltip>}>
                  <IconButton icon={<Tag />} color="cyan" appearance="primary" style={ButtonStyle}
                    onClick={()=> setShowTTM(true)} />
                </Whisper>
              </div>
              <div>
                <Button type="submit" appearance="primary" color="orange" size="lg" >ADD</Button>
              </div>
            </div>
        </form>
        <div className="TaskList">
          <Accordion className="TaskListContainer" allowMultipleExpanded allowZeroExpanded="true">
            <AccordionItem className="TaskTypeContainer" style={{border: '2px solid #BD3838'}}>
                <AccordionItemHeading>
                    <AccordionItemButton className="TaskTypeHeader" style={{backgroundColor: '#BD3838'}}>
                        Fitness
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="TaskTypeList">
                  {fitness_tasks.map((data) => {
                    return (
                      <div key={data.id} className="TaskTypeListItem">
                        <div style={{display: 'flex', justifyContent: 'flex-start'}} onClick={()=> {showButtons ? setShowButtons(false) : setShowButtons(true)}}>
                          <label>{data.taskname}</label>
                        </div>
                        <div style={{display: showButtons ? 'flex' : 'none', justifyContent: 'flex-end'}}>
                          <MdCheckCircle size="30" onClick={() => handleCompleteTask(data.id, 0)} />
                          <MdEdit size="30" />
                          <RiDeleteBinLine size="30" onClick={() => handleDeleteTask(data.id)} />
                        </div>
                      </div>
                    )  
                })}
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="TaskTypeContainer" style={{border: '2px solid #8238BD'}}>
                <AccordionItemHeading>
                    <AccordionItemButton className="TaskTypeHeader" style={{backgroundColor: '#8238BD'}}>
                        School
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="TaskTypeList">
                  {school_tasks.map((data) => {
                    return (
                      <div key={data.id} className="TaskTypeListItem">
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }} onClick={() => { showButtons ? setShowButtons(false) : setShowButtons(true) }}>
                          <label>{data.taskname}</label>
                        </div>
                        <div>Description: {data.tasknotes}</div>
                        <div>Deadline: {new Date(data.taskdeadline).toLocaleDateString()}</div>
                        <div style={{ display: showButtons ? 'flex' : 'none', justifyContent: 'flex-end' }}>
                          <MdCheckCircle size="30" onClick={() => handleCompleteTask(data.id, 1)} />
                          <MdEdit size="30" />
                          <RiDeleteBinLine size="30" onClick={() => handleDeleteTask(data.id)} />
                        </div>
                      </div>
                    )
                  })}
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="TaskTypeContainer" style={{border: '2px solid #38BDA5'}}>
                <AccordionItemHeading>
                    <AccordionItemButton className="TaskTypeHeader" style={{backgroundColor: '#38BDA5'}}>
                        Chores
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="TaskTypeList">
                  {chores_tasks.map((data) => {
                    return (
                      <div key={data.id} className="TaskTypeListItem">
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }} onClick={() => { showButtons ? setShowButtons(false) : setShowButtons(true) }}>
                          <label>{data.taskname}</label>
                        </div>
                        <div>Description: {data.tasknotes}</div>
                        <div>Deadline: {new Date(data.taskdeadline).toLocaleDateString()}</div>
                        <div style={{ display: showButtons ? 'grid' : 'none', justifyContent: 'flex-end' }}>
                          <MdCheckCircle size="30" onClick={() => handleCompleteTask(data.id, 2)} />
                          {/* <MdEdit size="30" /> */}
                          <RiDeleteBinLine size="30" onClick={() => handleDeleteTask(data.id)} />
                        </div>
                      </div>
                    )
                  })}
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="TaskTypeContainer" style={{border: '2px solid #BABD38'}}>
                <AccordionItemHeading>
                    <AccordionItemButton className="TaskTypeHeader" style={{backgroundColor: '#BABD38'}}>
                        Health
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="TaskTypeList">
                  {health_tasks.map((data) => {
                    return (
                      <div key={data.id} className="TaskTypeListItem">
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }} onClick={() => { showButtons ? setShowButtons(false) : setShowButtons(true) }}>
                          <label>{data.taskname}</label>
                        </div>
                        <div>Description: {data.tasknotes}</div>
                        <div>Deadline: {new Date(data.taskdeadline).toLocaleDateString()}</div>
                        <div style={{ display: showButtons ? 'flex' : 'none', justifyContent: 'flex-end' }}>
                          <MdCheckCircle size="30" onClick={() => handleCompleteTask(data.id, 3)} />
                          {/* <MdEdit size="30" /> */}
                          <RiDeleteBinLine size="30" onClick={() => handleDeleteTask(data.id)} />
                        </div>
                      </div>
                    )
                  })}
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="TaskTypeContainer" style={{border: '2px solid #BD3898'}}>
                <AccordionItemHeading>
                    <AccordionItemButton className="TaskTypeHeader" style={{backgroundColor: '#BD3898'}}>
                        Social
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="TaskTypeList">
                  {social_tasks.map((data) => {
                    return (
                      <div key={`${data.id}`} className="TaskTypeListItem">
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }} onClick={() => { showButtons ? setShowButtons(false) : setShowButtons(true) }}>
                          <label>{data.taskname}</label>
                        </div>
                        <div>Description: {data.tasknotes}</div>
                        <div>Deadline: {new Date(data.taskdeadline).toLocaleDateString()}</div>
                        <div style={{ display: showButtons ? 'flex' : 'none', justifyContent: 'flex-end' }}>
                          <MdCheckCircle size="30" onClick={() => handleCompleteTask(data.id, 4)} />
                          {/* <MdEdit size="30" /> */}
                          <RiDeleteBinLine size="30" onClick={() => handleDeleteTask(data.id)} />
                        </div>
                      </div>
                    )
                  })}
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="TaskTypeContainer" style={{border: '2px solid #BD7838'}}>
                <AccordionItemHeading>
                    <AccordionItemButton className="TaskTypeHeader" style={{backgroundColor: '#BD7838'}}>
                        Work
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="TaskTypeList">
                  {work_tasks.map((data) => {
                    return (
                      <div key={data.id} className="TaskTypeListItem">
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }} onClick={() => { showButtons ? setShowButtons(false) : setShowButtons(true) }}>
                          <label>{data.taskname}</label>
                        </div>
                        <div>Description: {data.tasknotes}</div>
                        <div>Deadline: {new Date(data.taskdeadline).toLocaleDateString()}</div>
                        <div style={{ display: showButtons ? 'flex' : 'none', justifyContent: 'flex-end' }}>
                          <MdCheckCircle size="30" onClick={() => handleCompleteTask(data.id, 5)} />
                          {/* <MdEdit size="30" /> */}
                          <RiDeleteBinLine size="30" onClick={() => handleDeleteTask(data.id)} />
                        </div>
                      </div>
                    )
                  })}
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
        </div>
      </div>
      <div className="RightColumn">
        <div className="TaskInfo">
          {/* INFO WILL BE DISPLAYED HERE */}
        </div>
        <div className="TaskArchive">
          <Accordion className="TaskArchiveContainer" allowMultipleExpanded allowZeroExpanded="true">
            <AccordionItem className="TaskArchiveListContainer">
                <AccordionItemHeading>
                    <AccordionItemButton className="TaskArchiveHeader" style={{backgroundColor: 'gray'}}>
                        Archive
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="TaskArchiveList">
                  {completed_tasks.map((data) => {
                    return (
                      <div key={data.id} className="TaskTypeListItem">
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }} onClick={() => { showButtons ? setShowButtons(false) : setShowButtons(true) }}>
                          <label>{data.taskname}</label>
                        </div>
                        <div style={{ display: showButtons ? 'flex' : 'none', justifyContent: 'flex-end' }}>
                          <RiDeleteBinLine size="30" onClick={() => handleDeleteTask(data.id)}/>
                        </div>
                      </div>
                    )
                  })}
                </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <DescriptionModal
        showDeM={showDeM}
        setShowDeM={setShowDeM}
        description={description}
        setDescription={setDescription}
      />
      <DeadlineModal
        showDLM={showDLM}
        setShowDLM={setShowDLM}
        deadline={deadline}
        setDeadline={setDeadline}
        isRepeating={isRepeating}
        setIsRepeating={setIsRepeating}
        interval={interval}
        setInterval={setInterval}
      />
      <DifficultyModal
        showDM={showDM}
        setShowDM={setShowDM}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <TaskTypeModal
        showTTM={showTTM}
        setShowTTM={setShowTTM}
        taskType={taskType}
        setTaskType={setTaskType}
      />
      <TaskAddedSuccessfullyModal
        showTASM={showTASM}
        setShowTASM={setShowTASM}
      />
      <Increase_XP_Modal
        showXpM={showXpM}
        setShowXpM={setShowXpM}
        levelUp={levelUp}
        xpCurrent={xpCurrent}
        xpNeeded={xpNeeded}
        stats={stats}
        statIncreases={statIncreases}
      />
    </div>
  )
}
