import MainLayout from "../layout/MainLayout";
import { useAuth } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <MainLayout>
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={logout} className="bg-red-500 rounded text-white px-4 py-1 cursor-pointer">Logout</button>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
