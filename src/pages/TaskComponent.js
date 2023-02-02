import React from 'react'
import 'react-accessible-accordion/dist/fancy-example.css';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function TaskComponent(task_list, showButtons, setShowButtons) {
  return (
    <div>
        {task_list.map((data, index) => {
            return (
                <div key={index} className="TaskTypeListItem">
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }} onClick={() => { showButtons ? setShowButtons(false) : setShowButtons(true) }}>
                        <label>{data.taskname}</label>
                    </div>
                    <div style={{ display: showButtons ? 'flex' : 'none', justifyContent: 'flex-end' }}>
                        <MdEdit size="30" />
                        <RiDeleteBinLine size="30" />
                    </div>
                </div>
            )
        })}
    </div>
  )
}
