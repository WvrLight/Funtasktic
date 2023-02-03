import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { MdEdit } from 'react-icons/md';
import EditProfileModal from '../modals/Edit_Profile_Modal';
import ProgressBar from "@ramonak/react-progress-bar";
import DonutChart from 'react-donut-chart';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'
import { useNavigate } from "react-router-dom";
import { Button, Comment, Form, Header } from 'semantic-ui-react';

export default function Profile() {
  const navigate = useNavigate()

  //State of Edit Profile Modal
  const { current_username } = useParams()
  const [showEPM, setShowEPM] = useState(false);
  const [nickname, setNickname] = useState("Nickname");
  const [username, setUsername] = useState("User");
  const [birthday, setBirthday] = useState("");
  const [bio, setBio] = useState("Bio");
  const [level, setLevel] = useState(0);
  const [xpPercent, setXpPercent] = useState(0);
  // const [statSTR, setStatSTR] = useState(0);
  // const [statDEX, setStatDEX] = useState(0);
  // const [statINT, setStatINT] = useState(0);
  // const [statAGI, setStatAGI] = useState(0);
  // const [statVIT, setStatVIT] = useState(0);
  // const [statTotal, setStatTotal] = useState(0);
  const [statSTRPercent, setStatSTRPercent] = useState(0);
  const [statDEXPercent, setStatDEXPercent] = useState(0);
  const [statINTPercent, setStatINTPercent] = useState(0);
  const [statAGIPercent, setStatAGIPercent] = useState(0);
  const [statVITPercent, setStatVITPercent] = useState(0);

  const [statCompletedFitness, setStatCompletedFitness] = useState(0);
  const [statCompletedSchool, setStatCompletedSchool] = useState(0);
  const [statCompletedChores, setStatCompletedChores] = useState(0);
  const [statCompletedHealth, setStatCompletedHealth] = useState(0);
  const [statCompletedSocial, setStatCompletedSocial] = useState(0);
  const [statCompletedWork, setStatCompletedWork] = useState(0);

  const [postData, setPostData] = useState([]);
  const [topLevelPosts, setTopLevelPosts] = useState([]);
  const [posts, setPosts] = useState();
  const [commentTarget, setCommentTarget] = useState(0);
  const [commentUser, setCommentUser] = useState(current_username);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    checkLoginStatus()
  }, []);

  useEffect(() => {
    getUserInfo()
  }, [current_username]);

  function checkLoginStatus() {
    if (sessionStorage.getItem("funtasktic-id") === null) {
      alert('Please log in!')
      navigate('../../')
    }
    else {
      getUserInfo()
      getCompletedTasks()
    }
  }

  function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  function getUserInfo() {
    let url = `https://funtasktic-db.fly.dev/user/get/profile?username=${current_username}`

    fetch(url, {
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
          // alert(JSON.stringify(user_data.rows[0]))

          let date = new Date(user_data.rows[0]['userbirthday'])

          setUsername(user_data.rows[0]['username'])
          setNickname(user_data.rows[0]['nickname'])
          setBirthday(date.toLocaleDateString())
          setBio(user_data.rows[0]['userbio'])
          setLevel(user_data.rows[0]['level'])
          setXpPercent(parseInt((user_data.rows[0]['xpcurrent'] / user_data.rows[0]['xpneeded']) * 100))

          // setStatSTR(user_data.rows[0]['userstatstr'])
          // setStatDEX(user_data.rows[0]['userstatdex'])
          // setStatINT(user_data.rows[0]['userstatint'])
          // setStatAGI(user_data.rows[0]['userstatagi'])
          // setStatVIT(user_data.rows[0]['userstatvit'])
          const updatedStatTotal = user_data.rows[0]['userstatstr'] + user_data.rows[0]['userstatdex'] + user_data.rows[0]['userstatint'] + user_data.rows[0]['userstatagi'] + user_data.rows[0]['userstatvit']
          // setStatTotal(updatedStatTotal)

          setStatSTRPercent(user_data.rows[0]['userstatstr'] / updatedStatTotal)
          setStatDEXPercent(user_data.rows[0]['userstatdex'] / updatedStatTotal)
          setStatINTPercent(user_data.rows[0]['userstatint'] / updatedStatTotal)
          setStatAGIPercent(user_data.rows[0]['userstatagi'] / updatedStatTotal)
          setStatVITPercent(user_data.rows[0]['userstatvit'] / updatedStatTotal)

          setPosts()
          let url = `https://funtasktic-db.fly.dev/user/post?username=${current_username}`

          fetch(url, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(response => {
              return response.text()
            })
            .then(data => {
              const post_data = JSON.parse(data)
              if (post_data.rowCount >= 1) {
                setPostData(groupBy(post_data.rows, 'replytopostid'))
                const grouped_posts = groupBy(post_data.rows, 'isreply')
                const grouped_replies = groupBy(post_data.rows, 'replytopostid')
                setTopLevelPosts(grouped_posts[false])
                const post_list = getReplyData(grouped_posts[false], grouped_replies)
                setPosts(post_list)
                // const grouped_replies = groupBy(post_data.rows, 'replytopostid')
                // for (let i in top_level_posts) {
                //   const reply_posts = grouped_replies[top_level_posts[i].postid]
                //   for (let reply_i in reply_posts) {
                //     top_level_posts.push(reply_posts[reply_i])
                //   }
                // }
                // console.log(top_level_posts)
              }
            })
        }
        else {
          console.log("User not found.")
        }
      });

  }

  function getCompletedTasks() {
    const id = sessionStorage.getItem('funtasktic-id')

    let url = `https://funtasktic-db.fly.dev/task/get/completed?id=${id}`

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
          var temp_fitness = 0
          var temp_school = 0
          var temp_chores = 0
          var temp_health = 0
          var temp_social = 0
          var temp_work = 0

          for (let task in task_data.rows) {
            switch (task_data.rows[task].tasktype) {
              case 0:
                temp_fitness += 1
                break
              case 1:
                temp_school += 1
                break
              case 2:
                temp_chores += 1
                break
              case 3:
                temp_health += 1
                break
              case 4:
                temp_social += 1
                break
              case 5:
                temp_work += 1
                break
              default:
                break
            }
          }
          
          setStatCompletedFitness(temp_fitness)
          setStatCompletedSchool(temp_school)
          setStatCompletedChores(temp_chores)
          setStatCompletedHealth(temp_health)
          setStatCompletedSocial(temp_social)
          setStatCompletedFitness(temp_work)
        }
      })
  }

  function getPostData(post, grouped_replies) {
    const replies = grouped_replies[post.postid]

    if (typeof replies === undefined)
      return (
        <Comment>
          <Comment.Content className="Comment">
            <Comment.Author as='a' className="CommentAuthor">@{post.postusername}</Comment.Author>
            <Comment.Text className="CommentText">
              {post.posttext}
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action onClick={() => { setCommentTarget(post.postid); setCommentUser(post.postusername + ' - '); setCommentText(post.posttext); }}>Comment</Comment.Action>
              &emsp;
              {profileOwnerCheck(post, post.profileusername, sessionStorage.getItem('funtasktic-username'))}
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      )
    else
      return (
        <Comment>
          <Comment.Content className="Comment">
            <Comment.Author as='a' className="CommentAuthor">@{post.postusername}</Comment.Author>
            <Comment.Text className="CommentText">
              {post.posttext}
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action onClick={() => { setCommentTarget(post.postid); setCommentUser(post.postusername + ' - '); setCommentText(post.posttext); }}>Comment</Comment.Action>
              &emsp;
              {profileOwnerCheck(post, post.profileusername, sessionStorage.getItem('funtasktic-username'))}
            </Comment.Actions>
          </Comment.Content>
          <div style={{ marginLeft: '40px' }} >
            <Comment.Group>
              {getReplyData(replies, grouped_replies)}
            </Comment.Group>
          </div>
        </Comment>
      )
  }

  function getReplyData(replies, grouped_replies) {
    var post_list = []
    for (let reply_i in replies) post_list.push(getPostData(replies[reply_i], grouped_replies))
    return post_list
  }

  function profileOwnerCheck(post, profileUsername, currentUsername) {
    if (profileUsername === currentUsername) return (
      <Comment.Action onClick={() => { handleDeletePost(post.postid) }}>Delete</Comment.Action>
    )
  }

  const handleAddPost = (event) => {
    event.preventDefault()

    // const isReply = true

    // if (commentTarget === 0) {
    //   isReply = false
    // }

    const post_obj = {
      'profileUsername': current_username,
      'postUsername': sessionStorage.getItem('funtasktic-username'),
      'postText': event.target.commentText.value,
      'isReply': (commentTarget === 0) ? false : true,
      'replyToPostId': (commentTarget === 0) ? null : commentTarget
    }

    event.target.reset()
    console.log(post_obj)

    fetch('https://funtasktic-db.fly.dev/user/post/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post_obj),
    })
      .then(response => {
        getUserInfo()
        return response.text();
      })
  }

  function handleDeletePost(id) {
    let url = `https://funtasktic-db.fly.dev/user/post/delete?id=${id}`

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        getUserInfo()
        return response.text();
      })
  }

  //Spider Graph
  const stat_data = [
    {
      data: {
        INT: statINTPercent,
        STR: statSTRPercent,
        DEX: statDEXPercent,
        VIT: statVITPercent,
        AGI: statAGIPercent
      },
      meta: { color: 'blue' }
    }
  ];

  const task_chart_data = [
    {
      label: 'Fitness',
      value: statCompletedFitness,
    },
    {
      label: 'School',
      value: statCompletedSchool,
    },
    {
      label: 'Chores',
      value: statCompletedChores,
    },
    {
      label: 'Health',
      value: statCompletedHealth,
    },
    {
      label: 'Social',
      value: statCompletedSocial,
    },
    {
      label: 'Work',
      value: statCompletedWork,
    },
  ];

  const captions = {
    // columns
    INT: 'Intelligence',
    STR: 'Strength',
    DEX: 'Dexterity',
    VIT: 'Vitality',
    AGI: 'Agility'
  };

  return (
    <div className="ProfilePage" key={current_username}>
      <div className="ProfileContainer">
        <div className="ProfileImage">
          <img src={require("../images/profile.png")} alt="Placeholder Profile Image" />
          <div>
            <p>{level}</p>
          </div>
        </div>
        <div className="ProfileDetailsContainer">
          <div className="ProfileDetails">
            <div className="ProfileInformation">
              <p className="Label">Name</p>
              <p className="Information Name">{nickname}</p>
            </div>
            <div className="ProfileInformation">
              <p className="Label">Username</p>
              <p className="Information Username">{username}</p>
            </div>
            <div className="ProfileInformation">
              <p className="Label">Birthdate</p>
              <p className="Information Birthdate">{birthday}</p>
            </div>
            <div className="ProfileInformation">
              <p className="Label">About</p>
              <p className="Information About">
                {bio}
              </p>
            </div>
          </div>
          <div className="ProfileDetails">
            <div className="ProfileInformation">
              <p className="Label">Level</p>
              <p className="Information Level">{level}</p>
            </div>
            <div className="ProfileInformation">
              {/* <p className="Label">Badges</p>
              <p className="Information Badges"></p> */}
            </div>
          </div>
          <div className="EditProfileDetails">
            <MdEdit size="30" style={{ margin: 10, color: "#55535B" }} onClick={() => setShowEPM(true)} />
          </div>
        </div>
      </div>
      <hr align="center" noshade />
      <div className="AccountStats">
        <div className="ProgressBarContainer">
          <p className="ProgressBarLabel">Progress Bar :</p>
          <ProgressBar
            width={'50vw'}
            height={'50px'}
            labelAlignment={'center'}
            baseBgColor={'#C4C4C4'}
            bgColor={'#5479FD'}
            completed={xpPercent}
          />
        </div>
        <div className="UserStats">
          <div className="StatsDataContainer">
            <p className="StatsDataLabel">Stats :</p>
            <div className="StatsDataGraph">
              <RadarChart
                captions={captions}
                data={stat_data}
              />
            </div>
          </div>
          <div className="TaskAnalysisContainer">
            <p className="TaskAnalysisLabel">Completed Tasks :</p>
            <div className="TaskAnalysisGraph">
              <DonutChart
                data={task_chart_data}
              />
            </div>
          </div>
        </div>
        <Comment.Group className="Posts">
          <Header as='h5' className="CommentHeader">
            POSTS
          </Header>
          <Comment.Action onClick={() => { setCommentTarget(0); setCommentUser(current_username); setCommentText(''); }}>Comment</Comment.Action>
          {posts}
          <Form method='post' onSubmit={handleAddPost} reply className="CommentForm">
            <Form.Field>
              <input type='text' name='commentText' className="CommentFormInput" />
            </Form.Field>
            <Button type='submit' className="CommentFormButton" content='Submit' />
          </Form>
          <div>Replying to: {commentUser} {commentText}</div>
        </Comment.Group>
      </div>
      <EditProfileModal
        showEPM={showEPM}
        setShowEPM={setShowEPM}
        nickname={nickname}
        birthday={birthday}
        bio={bio}
        getUserInfo={getUserInfo}
      />
    </div>
  )
}
