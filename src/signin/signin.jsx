import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signin = ({islogged, fetchemail}) => {

    const [email,setemail] = useState(false);
    const [pass,setpass] = useState(false);
    const [data, setdata] = useState('')
    const navigate = useNavigate()

    const clk = async () => {
        const res = await fetch('https://sma13.herokuapp.com/signin',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email,pass
            })
        });
        const data = await res.json()
        setdata(data)

        if(data == 'is logged') {
            navigate('/')
            islogged(10)
            window.localStorage.setItem('login', 10)
            window.localStorage.setItem('email', email)
            fetchemail(email)
        }
   
        
        console.log(data)
        // console.log(islogged)

        
    }

    return(
        <div>
            <input type="email" name="email" id="email" placeholder="Enter Email" autoComplete="false" onChange={(e) => setemail(e.target.value)}/>
            <input type="password" name="pass" id="pass" placeholder="Enter Password" onChange={(e) => setpass(e.target.value)}/>
            <button type="submit" onClick={clk}>login</button>
            {data!='logged in' ? <p>{data}</p> : ''}
            

        </div>
    )
}


export default Signin;