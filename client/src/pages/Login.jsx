import { useState ,useEffect } from "react";
import Input from "../components/Input";
// import {useAuth} from "../context/AuthContext.jsx"
import { useNavigate } from "react-router-dom";
import {loginUser} from "../api/authApi"
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice.js";

const Login = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // const {login,user} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(user){
      navigate("/dashboard")
    }

  },[user])

  const [error, setError] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    
    }

    try {
      // TEMPORARY MOCK: Replace with real API on Day 15
      const result = {email: form.email, token: "fake-jwt-token"}
      dispatch(loginSuccess(result))
      navigate("/dashboard")

    } catch (error) {
      setError("Invalid credentials");
      
    }

    // login(form)
    // navigate("/dashboard")

    // dispatch(loginSuccess({email: form.email,token : "fake-jwt-token"}))
    // navigate("/dashboard");

    

    
  };

  // delete below if not needed

  // useEffect(() => {
  //   console.log("Login page loaded")
  // } , [])

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-black text-white p-2 rounded hover:bg-gray-800 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
