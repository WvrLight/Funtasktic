import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { AiOutlineLayout, AiFillCheckCircle, AiFillCloseCircle }  from 'react-icons/ai';
import "./pages.css";
import RequestAcceptedSuccessfullyModal from '../modals/Request_Accepted_Successfully_Modal';
import RequestRejectedSuccessfullyModal from '../modals/Request_Rejected_Successfully_Modal';
import RequestSentSuccessfullyModal from '../modals/Request_Sent_Successfully_Modal';


export default function Friends() {
    const navigate = useNavigate();
    const [showRSSM, setShowRSSM] = useState(false);
    const [showRASM, setShowRASM] = useState(false);
    const [showRRSM, setShowRRSM] = useState(false);
    const [requestText, setRequestText] = useState("");

    const [friendList, setFriendList] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);

    const user_id = parseInt(sessionStorage.getItem('funtasktic-id'))

    const handleAddFriend = (event) => {
        event.preventDefault()

        setRequestText("")

        const user_obj = {
            'sender_id': user_id,
            'sender': sessionStorage.getItem('funtasktic-username'),
            'target': event.target.username.value,
        }

        // console.log(user_obj)

        fetch('http://localhost:3001/user/friend/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user_obj),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                    switch (data) {
                    case '1': 
                        setRequestText("Request sent successfully!")
                        break
                    case '-1':
                        setRequestText("Friend request already exists!")
                        break
                    case '-2':
                        setRequestText("Cannot send a friend request to yourself!")
                        break
                    case '-3':
                        setRequestText("User not found!")
                        break
                    default:
                        setRequestText("Error!")
                        break
                }
            })

        setShowRSSM(true)
        getFriends()
    }

    function handleFriendRequest(id, result) {
        let result_url = ''
        let method = ''

        if (result === 1) {
            result_url = `http://localhost:3001/user/friend/accept?id=${id}`
            method = 'GET'
            setShowRASM(true)
        }
        else {
            result_url = `http://localhost:3001/user/friend/reject?id=${id}`
            method = 'DELETE'
            setShowRRSM(true)
        }

        fetch(result_url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                getFriends()
                return response.text();
            })
        
    }

    function getFriends() {
        const id = user_id
        const user = parseInt(sessionStorage.getItem('funtasktic-username'))

        let friends_url = `http://localhost:3001/user/friend/get?id=${id}`
        let requests_url = `http://localhost:3001/user/friend/get/requests?id=${id}`

        setFriendList([])
        setFriendRequests([])

        fetch(friends_url, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                const friends_data = JSON.parse(data)
                // console.log(JSON.parse(data).rows)
                if (friends_data.rowCount >= 1) {
                    setFriendList(friends_data.rows)
                }
            })

        fetch(requests_url, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                const friends_data = JSON.parse(data)
                // console.log(JSON.parse(data).rows)
                if (friends_data.rowCount >= 1) {
                    setFriendRequests(friends_data.rows)
                }
            })
    }

    function getFriendName(friend_status, current_user_id) {
        if (friend_status.senderid === current_user_id) return friend_status.targetusername
        else return friend_status.senderusername
    }

    useEffect(() => {
        getFriends()
    }, []);

  return (
    <div className="FriendsPage">
      <div className="FriendsListColumn">
        <h2 style={{margin: '5px 20px'}}>FRIENDS LIST</h2>
        <div className="FriendsList">
            <ul className="Friends">
                      {friendList.map((data) => {
                          return (
                              <li key={(data.id)} className="Request">
                                  <label>{getFriendName(data, user_id)}</label>
                                  <div>
                                      <AiOutlineLayout className="Buttons" style={{ color: "00FF00" }} size="30" onClick={() => navigate(`../profile/${getFriendName(data, user_id)}`)} />
                                      <AiFillCloseCircle className="Buttons" style={{ color: "FF0000" }} size="30" onClick={() => handleFriendRequest(data.id, 0)} />
                                  </div>
                              </li>
                          )
                      })
                      }
            </ul>
        </div>
      </div>

      <div className="FriendRequestColumn">
        <h2 style={{margin: '5px 20px'}}>FRIEND REQUEST</h2>
        <div className="FriendRequest">
            <ul className="Requests">
                    {friendRequests.map((data) => {
                        return (
                            <li key={data.id} className="Request">
                                <label>{getFriendName(data, user_id)}</label>
                                <div>
                                    <AiFillCheckCircle className="Buttons" style={{ color: "00FF00" }} size="30" onClick={() => handleFriendRequest(data.id, 1)} />
                                    <AiFillCloseCircle className="Buttons" style={{ color: "FF0000" }} size="30" onClick={() => handleFriendRequest(data.id, 0)} />
                                </div>
                            </li>
                        )
                    })
                    }
            </ul>
        </div>
      </div>

      <div className="AddFriendsColumn">
        <div className="AddFriends">
            <div>
                <h2 style={{margin: '15px 5px', textAlign: 'center'}}>
                    Send Friend Request via Username
                </h2>
                <hr style={{ background: "#55535B", width: "80%", height: "3px", borderRadius: "5px" }} />
            </div>
            
            <form method="post" onSubmit={handleAddFriend} className="AddFriendsForm">
                <input type="text" style={{textAlign: 'center'}} name="username" className="AddUsername" placeholder="Username" required/>
                <button type="submit">SEND</button>
            </form>
        </div>
      </div>
        <RequestSentSuccessfullyModal
            requestText={requestText}
            showRSSM={showRSSM}
            setShowRSSM={setShowRSSM}
        />

        <RequestAcceptedSuccessfullyModal
        showRASM={showRASM}
        setShowRASM={setShowRASM}
        />

        <RequestRejectedSuccessfullyModal
        showRRSM={showRRSM}
        setShowRRSM={setShowRRSM}
        />
      </div>
      
  )
}
