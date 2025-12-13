import MainLayout from "../layout/MainLayout";
import { testInterceptor } from "../api/testApi";

// import { useAuth } from "../context/AuthContext.jsx";
// import {useDispatch} from "react-redux";
// import {logout} from "../features/auth/authSlice.js"
// import {logout} from "../features/auth/authSlice.js"

const Dashboard = () => {
  // const { logout } = useAuth();

  // const dispatch = useDispatch();

  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold">Welcome to the Dashboard 🎉</h1>
      
      {/* This is for test purpose only like api with axios */}
      {/* <button
        onClick={async () => {
          const data = await testInterceptor();
          console.log("TEST HEADER RESPONSE:", data);
        }}
        className="bg-blue-500 text-white px-4 py-1 rounded mt-4"
      >
        Test Axios Interceptor
      </button> */}

      {/* <button onClick={() => dispatch(logout())} className="bg-red-500 rounded text-white px-4 py-1 cursor-pointer">Logout</button> */}
    </MainLayout>
  );
};

export default Dashboard;
