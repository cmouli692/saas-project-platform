import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <header className="w-full bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold text-xl">Dashboard</h1>
      <button
        onClick={() => dispatch(logout())}
        className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
};


export default Navbar
