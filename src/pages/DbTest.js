import React, { useState, useEffect } from 'react';
export default function DbTest() {
    const [userText, setUserText] = useState("")
    const [taskText, setTaskText] = useState("")

    useEffect(() => {
        getDbInfo();
    }, []);

    const handleAddUser = (event) => {
        event.preventDefault();

        const user_obj = {
            'username': event.target.username.value,
            'nickname': event.target.username.value,
            'password': event.target.password.value,
        }
        console.log(JSON.stringify(user_obj))

        fetch('http://localhost:3001/user/add_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user_obj),
        })
            .then(response => {
                getDbInfo();
                return response.text();
            })
    }

    function getDbInfo() {
        fetch('http://localhost:3001/user')
            .then(response => {
                return response.text();
            })
            .then(data => {
                setUserText(JSON.stringify(JSON.parse(data)["rows"]));
            });

        fetch('http://localhost:3001/task')
            .then(response => {
                return response.text();
            })
            .then(data => {
                setTaskText(JSON.stringify(JSON.parse(data)["rows"]));
            });
        console.log("Fetched data")
    }

    const handleDeleteUser = (event) => {
        event.preventDefault()

        const id = event.target.id.value

        let login_url = `http://localhost:3001/user/delete_user?id=${id}`

        fetch(login_url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                getDbInfo();
                return response.text();
            })
    }

    return (
        <div>
            Users:
            <br />
            {userText}

            <br />
            <h1>Add User:</h1>
            <form onSubmit={handleAddUser} method="post">
                <label>Username:</label>
                <input type="text" id="username" name="username" />
                <label>Password:</label>
                <input type="password" id="password" name="password" />
                <label>Nickname:</label>
                <input type="text" id="nickname" name="nickname" />
                <label>Registration Date:</label>
                <input type="submit" value="Submit" />
            </form>

            <br />
            <h1>Remove User:</h1>
            <form onSubmit={handleDeleteUser}>
                <label>ID:</label>
                <input type="text" id="userId" name="id" />
                <input type="submit" value="Submit" />
            </form>

            <br />

            Tasks:
            <br />
            {taskText}

            <h1>Add Task:</h1>
            <form>
                <label>ID:</label>
                <input type="text" id="userId" name="userId" />
                <label>Name:</label>
                <input type="text" id="taskName" name="taskName" />
                <label>Type:</label>
                <input type="text" id="taskType" name="taskType" />
                <label>Description:</label>
                <input type="text" id="taskDescription" name="taskDescription" />
                <label>Deadline:</label>
                <input type="date" id="taskDeadline" name="taskDeadline" />
                <label>Difficulty:</label>
                <input type="text" id="taskDifficulty" name="taskDifficulty" />
                <label>Notes:</label>
                <input type="text" id="taskNotes" name="taskNotes" />
                <input type="submit" value="Submit" />
            </form>

            <br />
            <h1>Remove Task:</h1>
            <form>
                <label>ID:</label>
                <input type="text" id="taskId" name="taskId" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}