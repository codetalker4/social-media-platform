import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import io from 'socket.io-client'
import './style.css'

const socket = io('https://sma13.herokuapp.com/')

const Chat = ({email}) => {
    const [toggle,settoggle] = useState(false)
    const [message, setMessage] = useState([])
    const [data, setData] = useState([])
    const [room, setroom] = useState('')
    const [currentRoom, setCurrentRoom] = useState('')
    const [info, setinfo] = useState('')
    console.log(window.localStorage.getItem('email'))
    
    const rooms = async () => {
        const res = await fetch('https://sma13.herokuapp.com/room1',{
            method:'POST',
            mode:'no-cors',
            headers:{'Content-Type': 'application/json'}
        })
        const data = await res.json()
        setData(data)
        data.map(d => console.log(d,'console'))
        console.log(typeof(data))
    }  


    function outputMessage(message) {
        const div = document.createElement('div');
        div.classList.add('message');
        const p = document.createElement('p');
        p.classList.add('meta');
        p.innerText = message.user;
        div.appendChild(p);
        const para = document.createElement('p');
        para.classList.add('text');
        para.innerText = message.msg;
        div.appendChild(para);
        document.querySelector('.chat-messages').appendChild(div);
        document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight + 200;

      }
      
    //   if(document.querySelector('.chat-messages')) {
    // }

    useEffect(() => {
        socket.on('gotmsg', msg => {
            outputMessage(msg)
        })
        socket.on('welcome', msg => {setinfo(msg)})


    },[])


    return(
        <div>
           { !toggle ?
            <>
                <div>       
                    <div className="join-container">
                        <header className="join-header">
                            <h1><i className="fas fa-smile"></i> ChatCord</h1>
                        </header>
                        <main className="join-main">
                                <div className="form-control" onClick={rooms}>
                                    <label for="room">FIND YOUR INTERESTED ROOM IN THE OPTIONS</label>
                                    <select name="room" id="room" onClick={rooms}>
                                        {data.map(d => <option value={d.room}>{d.room}</option>)}
                                    </select>
                                </div>
                                <button type="submit" onClick={async () => {
                                    setCurrentRoom(document.getElementById('room').value) 
                                    socket.emit('joinroom', {email: email,room: document.getElementById('room').value})
                                    setroom(document.getElementById('room').value)
                                    settoggle(true)
                                    const res = await fetch('https://sma13.herokuapp.com/room1', {
                                        method: 'POST',
                                        mode:'no-cors',
                                        headers: {'Content-Type':'application/json'},
                                        body: JSON.stringify({
                                            email: email
                                        })
                                    } )
                                }} className="btn">Join Chat</button>
                                <div className="form-control"><br></br><br></br>
                                    <label htmlFor="username">OR CREATE YOUR OWN ROOM</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="roomname"
                                        placeholder="Enter Room Name..."
                                        autoComplete="false" 
                                        required
                                    />
                                    <button className="btn" onClick={async () => {
                                        socket.emit('new', {
                                            room: document.getElementById('roomname').value,
                                            email:email
                                        })
                                        const res = await fetch('https://sma13.herokuapp.com/room1',{
                                            method:'POST',
                                            mode:'no-cors',
                                            headers: {'Content-Type': 'application/json'},
                                            body: JSON.stringify({
                                                room: document.getElementById('roomname').value,
                                                email:email
                                            })
                                        })
                                        const data = await res.json()
                                        setroom(document.getElementById('roomname').value)
                                        settoggle(true)
                                        setData(data)
                                    }}>Create</button>
                                </div>
                        </main>
                    </div>
                </div>
            </> :
            <>  <div>
                    <div className="chat-container">
                        <header className="chat-header">
                            <h1><i className="fas fa-smile"></i> ChatCord</h1>
                            <button id="leave-btn" className="btn" onClick={() => {
                                settoggle(false)
                            }}>Leave Room</button>
                        </header>
                        <main className="chat-main">
                            <div className="chat-sidebar">
                            <h3><i className="fas fa-comments"></i> Room Name:</h3>
                            <h2 id="room-name">{room}</h2>
                            <h3><i className="fas fa-users"></i> Users</h3>
                            <ul id="users"></ul>
                            </div>
                            <div className="chat-messages">
                                {/* {message.map(d => <div className="message"><p className="meta">{d.user}</p><p className="text">{d.msg}</p></div>)} */}
                                 <div className="botom"></div>
                            </div>
                        </main>
                        <div className="chat-form-container">
                            <div id="chat-form">
                            <input
                                id="msg"
                                type="text"
                                placeholder="Enter Message"
                                required
                                autoComplete="off"
                            />
                            <button className="btn" onClick={() => {
                                let msg=document.getElementById('msg').value
                                socket.emit('sentmsg', {msg, currentRoom, email})
                                document.getElementById('msg').value = ''
                            }}><i className="fas fa-paper-plane"></i> Send</button>
                            </div>
                        </div>
                    </div>
                    <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.9.2/qs.min.js"
                    integrity="sha256-TDxXjkAUay70ae/QJBEpGKkpVslXaHHayklIVglFRT4="
                    crossorigin="anonymous"
                    ></script>
                    <script src="/socket.io/socket.io.js"></script>
                </div>
            </>}
        </div>
    )
}

export default Chat
