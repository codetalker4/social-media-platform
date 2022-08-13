import { useEffect } from "react";
import { useState } from "react";
import './profile.css'


const Profile = ({email}) => {

    
    const [name, setname] = useState('user')
    const [tag, settag] = useState('Hey there! I am a new user!')
    const [followers, setfollowers] = useState(0)
    const [edit, setedit] = useState(false)
    const [cblog, setcblog] = useState(false)
    const [title, settitle] = useState('Namaste Bengalooru')
    const [body, setbody] = useState('Start your blog here')
    const [pdata,setpdata] = useState({edit :0, blogs :{}})

    const clk = async () => {
        if (name.length > 5) {
            const res = await fetch('https://sma13.herokuapp.com/profileedit', {
                method:'POST',
                mode:'no-cors',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    email,
                    tag,
                    name,
                })
            })
            setedit(!edit)
        }  
        else {
            setedit(!edit)
        }
    }
    
    useEffect(() => {
        if(title === 'Namaste Bengalooru') {
            btn()
        }
        console.log(cblog)
    },[])

    const clk1 = async () => {
        setcblog(false)
        settitle(document.getElementById('title').value)
        setbody(document.getElementById('comment_text').value)
        if (title.length > 5 && body.length > 10 && title!=='Namaste Bengalooru' && body!=='Start your blog here') {
            const res = await fetch('https://sma13.herokuapp.com/profilecblog', {
                method:'POST',
                mode:'no-cors',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    email,
                    title,
                    body,
                })
            })
            const data = await res.json()
            
        }
    }
    const btn = async () => {
        const res = await fetch('https://sma13.herokuapp.com/profile', {
            method:'POST',
            mode:'no-cors',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                email,
            })
        })
        const data = await res.json()
        const parsedata = JSON.parse(data)
        setpdata(parsedata)
        setname(parsedata.edit.name)
        if(parsedata.edit.tag !=='' && parsedata.edit.tag!==null ){
            settag(parsedata.edit.tag)  
        }
    }  

    return(
        <div>
            <div>
                <div>
                    {edit ? <><input placeholder="enter your Name" autoComplete="false" onChange={e => setname(e.target.value)}/><input placeholder="write your tagline" autoComplete="false" onChange={e => {
                        settag(e.target.value)
                    }}/> 
                    <button onClick={clk}>ok</button> </>: <><h3 className="uname">{name}</h3><p className="tag">{tag}</p> <button onClick={() => {setedit(true)}}>edit </button> </> }                 
                </div>
            </div>
            <div>
                {cblog ? <>
                        <div className="edit-cont">
                            <input id="title" type="text" placeholder="write the title here......" autoComplete="false" onChange={e => settitle(e.target.value)}/>
                            <textarea rows="20" name="comment[text]" id="comment_text" cols="40"
                             class="ui-autocomplete-input" autocomplete="off" role="textbox"
                              aria-autocomplete="list" aria-haspopup="true" placeholder="write your blog here"
                               onChange={e => setbody(e.target.value)}></textarea>
                            <button onClick={clk1}>post blog</button>
                        </div>
                    </>: <button onClick={() => {setcblog(true)}}>create blog</button>}
            </div>
            <div>
                {pdata.blogs.length > 0 && !(pdata.blogs === 'please signin again') ?
                 pdata.blogs.map(blog => <><div><h3>{blog.title}</h3><p>{blog.body}</p><h6>{blog.author}</h6></div></>  ) :
                 <div>
                    {pdata.blogs === 'please signin again' ? <div>{pdata.blogs}</div>: 'create your first blog by clicking on create blog button'}
                 </div> 
                }
            </div>
        </div>
    )
}

export default Profile;



