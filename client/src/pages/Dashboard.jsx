import MainLayout from "../layout/MainLayout";
import { useAuth } from "../context/AuthContext.jsx";
import {useDispatch} from "react-redux";
import {logout} from "../features/auth/authSlice.js"
// import {logout} from "../features/auth/authSlice.js"


const Dashboard = () => {
  // const { logout } = useAuth();

  const dispatch = useDispatch();


  return (
    <MainLayout>
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={() => dispatch(logout())} className="bg-red-500 rounded text-white px-4 py-1 cursor-pointer">Logout</button>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
