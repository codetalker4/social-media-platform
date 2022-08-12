import './App.css';
import React from 'react';
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import Home from './home/home'
import Fsys from './fsystem/fsys';
import Signup from './signin/signup'
import Wordbot from './wordbot/wordbot'
import Chat from './chat/chat'
import Profile from './profile/profile';
import Signin from './signin/signin';
import Logout from './signin/signout';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    window.onload = () => navigate('/')
  })
  const [logged, setLogged] = useState(window.localStorage.getItem('login'))
  const [email, setemail] = useState('')
  useEffect(() => {
      setemail(window.localStorage.getItem('email'))
  },[])

  const fetchemail = (mail) => {
    setemail(mail)
  }

  return (
    <div className="App">
      <nav>
      <Link to='/' className='link'>Home</Link>
      {Boolean(parseInt(logged)) ? <>
        <Link to='/wordbot' className='link'>Wordbot</Link>
        <Link to='/chat' className='link'>Chat</Link>
        <Link to='/profile' className='link'>Profile</Link>
        <Logout islogged={logged => setLogged(logged)}/>
            </> : <>
            <Link to='/signup' className='link'>Signup</Link>
            <Link to='/signin' className='link'>Signin</Link> 
              </>}
  


      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/wordbot' element={<Wordbot />} />
        <Route path='/chat' element={<Chat email={email}/>} />
        <Route path='/fsys' element={<Fsys />} />
        <Route path='/profile' element={<Profile email={email}/>} />
        <Route path='/signin' element={<Signin islogged = {logged => setLogged(logged)}
                                   fetchemail={fetchemail}/>} />



        



      </Routes>

    </div>
  );
}

export default App;

