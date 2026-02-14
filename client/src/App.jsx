import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
        {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
        <Route path="/projects" element={<PrivateRoute><Projects/></PrivateRoute>}/>
        <Route path="/projects/:projectId/tasks" element={<PrivateRoute><Tasks/></PrivateRoute>}/>
        <Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>}/>
      </Routes>
    </>
  );
}

export default App;
