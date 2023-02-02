import React from 'react';
import Modal from 'react-modal';
import { AiFillCloseCircle, AiFillCheckCircle }  from 'react-icons/ai';
import './modals.css';

export default function Edit_Profile_Modal(props) {
    const date = new Date(Date.parse(props.birthday))
    const dateString = date.getFullYear() + "-" + (String(date.getMonth() + 1).padStart(2, '0')) + "-" + date.getDate()

    const handleEditProfile = (event) => {
        event.preventDefault()

        props.setShowEPM(false)

        const user_obj = {
            'id': sessionStorage.getItem('funtasktic-id'),
            'nickname': event.target.nickname.value,
            'birthday': event.target.birthday.value,
            'bio': event.target.bio.value,
        }

        console.log(user_obj)
        
        fetch('http://localhost:3001/user/update_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user_obj),
        })
        .then(response => {
            props.getUserInfo()
            return response.text();
        })
    }

  return (
    <Modal 
        className="EditProfileModal"
        isOpen={props.showEPM} 
        onRequestClose={()=> props.setShowEPM(false)} 
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
                outline: 'none'
            }
        }}
    >
        <div className="Header">
            <div className="Title">
                <label>Edit Profile</label>
                <AiFillCloseCircle style={{color: "#ECE9E9"}} size="30" onClick={()=> props.setShowEPM(false)} /> 
            </div>
        </div>
        <div className="Body">
              <form method="post" onSubmit={handleEditProfile} className="Form">
                <label>Name </label>
                <input name="nickname" className="EditName" defaultValue={props.nickname} type="text" />
                <label>Birthdate </label>
                  <input name="birthday" className="EditBirthdate" defaultValue={dateString} type="date" />
                <label>About </label>
                  <textarea name="bio" className="EditAbout" type="text" defaultValue={props.bio} rows="10"/>
                <div className="Button">
                    <button type="submit"><AiFillCheckCircle style={{ color: "#38BDA5" }} size="30" /></button>
                </div>
            </form>
        </div>
    </Modal>
  )
}

    