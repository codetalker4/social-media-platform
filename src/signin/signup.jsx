import React, {useEffect} from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './signup.css'

const Signup = () => {

    const navigate = useNavigate();
    const [password, setPassword] = useState(false);
    const [match, setmatch] = useState(false)
    const [data, setData] = useState('')
    const [name, setName] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [cpass, setCpass] = useState('')
    const [stat, setStat] = useState(false)
    const [confirm, setconfirm] = useState('')

    useEffect(() => {
        if(pass === cpass && pass!=='') {
            setmatch(true)
            setData('entered password is matching')
        }
        if(pass!== cpass) {
            setData('entered password is not matching')
            setmatch(false)

            
        }
        setStat(name!=='' && lname!=='' && email!=='') 
    },[pass, cpass, name, lname, email, stat])


    return(
        <div className="signupdiv">
            <input type="text" name="fname" id="fname" placeholder="Enter First Name" autoComplete="false" onChange={(e) => {
                
                setName(e.target.value)
            }} required/>
            <input type="text" placeholder="Enter Last Name" autoComplete="false" onChange={(e) => {
                
                setLname(e.target.value)
            }} required/>
            <input type="email" placeholder="Enter Email" autoComplete="false" onChange={(e) => {
                
                setEmail(e.target.value)
            }} required/>
            <input type="password" placeholder="Enter Password" onChange={(e) => {
                
                setPass(e.target.value)
                if(e.target.value===''){
                    setPassword(false)
                    setData('')
                } else {
                    setPassword(true)
                }
            }} />
            {password ? <div> <input type="password" placeholder="Enter Confirm Password" onChange={(e) => {
                setCpass(e.target.value)
                
                

            } }/> <p>{`${data}`}</p></div> : <div> enter password</div>}
            

            <button type="submit" onClick={
                async (e) => {
                    e.preventDefault();
                    if (match && stat) {
                            fetch('http://ec2-52-49-120-150.eu-west-1.compute.amazonaws.com/signup', {
                                method:'POST',
                                headers:{
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    name,
                                    lname,
                                    email,
                                    pass,
                                })
                            }).then(res => res.json()).then(data => setconfirm(data))
                            if(data === 'entered password is matching') {
                                navigate('/signin')
                            }

                         
                        }
                }
                
            }>Submit</button>
            <div>{confirm}</div>
        </div>
    )
}

export default Signup