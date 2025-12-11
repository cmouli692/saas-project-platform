import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />

        <main className=" p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
