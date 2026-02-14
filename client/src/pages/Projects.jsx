import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  fetchProjects,
  removeProject,
} from "../features/projects/projectsSlice";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const token = useSelector((state) => state.auth.token);
  const { items, loading, error } = useSelector(
    (state) => state.projects
  );

  // Fetch projects on load
  useEffect(() => {
    if (token) {
      dispatch(fetchProjects());
    }
  }, [token, dispatch]);

  const handleCreate = () => {
    if (!name.trim()) return;

    dispatch(addProject({ name }));
    setName("");
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Projects</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
          className="border p-2 rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-black text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {items.map((p) => (
        <div
          key={p.id}
          className="flex justify-between items-center border-b py-2"
        >
          <span
            onClick={() => navigate(`/projects/${p.id}/tasks`)}
            className="cursor-pointer text-blue-600"
          >
            {p.name}
          </span>

          <button
            onClick={() => dispatch(removeProject(p.id))}
            className="text-red-500"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Projects;
