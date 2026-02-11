// import React, { useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useSelector } from "react-redux";
// import { fetchProjects } from "../features/projects/projectsSlice";
// import { useDispatch } from "react-redux";

// export default function Projects() {
//   const { items : projects, loading } = useSelector((state) => state.projects);

//   const token = useSelector((state) => state.auth.token) ;

//   const dispatch = useDispatch();
//   useEffect(() => {
//     if(token) {
//         dispatch(fetchProjects())
//     }
//   })

 

//   return (
//     <MainLayout>
//       <h1 className="text-2xl font-bold">Projects</h1>
//       {loading && <p>Loading...</p>}
//       {!loading && projects.length === 0 && (<p>No projects yet.</p>)}
//       {projects.map((p) => (
//         <div key={p.id}>{p.name}</div>
//       ))}
//     </MainLayout>
//   );
// }









import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../features/projects/projectsSlice";

const Projects  = () => {
  const dispatch = useDispatch() ;
  const token = useSelector((state) => state.auth.token);
  const {items,loading, error} = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if(token) {
      dispatch(fetchProjects()) ;

    }
  }, [token, dispatch]);

  // FOUNDATION OUTPUT ONLY
  if(loading) return <p>Loading projects...</p>
  if(error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>Projects</h2>
      <pre>{JSON.stringify(items , null , 2)}</pre>
    </div>
  )
}

export default Projects;
