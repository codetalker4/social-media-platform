import { useNavigate } from "react-router-dom"


const Logout = ({islogged}) => {
    const navigate = useNavigate()
    const clk = () => {
        islogged(0)
        window.localStorage.setItem('login', 0)
        window.localStorage.clear()
        navigate('/signin')

    }
    return (
        <button type="submit" onClick={clk} >logout</button>
    )
}

export default Logout