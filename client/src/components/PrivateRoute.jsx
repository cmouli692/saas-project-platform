import { Navigate } from "react-router-dom"
// import {useAuth} from "../context/AuthContext.jsx"
import {useSelector} from "react-redux"

const PrivateRoute = ({children}) =>{

    // const {user} = useAuth()
    const user = useSelector((state) => state.auth.user);
    console.log("private route user : ", user)
    return user ? children : <Navigate to="/" />


}


export default PrivateRoute