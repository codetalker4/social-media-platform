import { useEffect } from "react"
import { useState } from "react"
import './home.css'

const Home = () => {

const [data,setdata] = useState('')

const btn = async () => {
    const res = await fetch('http://ec2-52-49-120-150.eu-west-1.compute.amazonaws.com',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
            welcome:'welcome'
        })
    })
    // const data = await res.json()
    const data = JSON.parse(await res.json())
    setdata(data)

}

useEffect(() => {btn()})

    return(
        <div className="body">
            <h2>PROFILES</h2>
            <div className="profiles-container"> 
             {data !== '' ? 
             <><div className="profile-card">{data.signup.map(sign => <div className="profile-inner"><h3>{sign.name + ' ' + sign.lname }</h3><h5 className="hometag">{sign.tagline}</h5></div>)}</div></> : 
             'press refresh button to refresh the page'}
            </div>
            <div className="blog-container">
                {data !== '' ? <><div className="blog-card">{data.blogs.map(blog => <div className="blog-inner"><h3>{blog.title}</h3>
                <h5>{blog.body}</h5><p className="author">{'- '+blog.author} </p></div>)}</div></>
                 : 'noblogs'}
            </div>
        </div>
    )
}

export default Home;