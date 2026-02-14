import { NavLink, useParams } from "react-router-dom";

const Sidebar = () => {
  const {projectId} = useParams()
  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/projects", label: "Projects" },
    { path: `/projects/${projectId}/tasks`, label: "Tasks" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4 space-y-4">
      <h2 className="text-xl font-bold">SaaS Panel</h2>
      <nav className="flex flex-col space-y-2">
        {links.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `p-2 rounded block ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};


export default Sidebar;
