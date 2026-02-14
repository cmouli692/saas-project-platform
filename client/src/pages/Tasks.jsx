// // import { useEffect, useState } from "react";
// // import MainLayout from "../layout/MainLayout";
// // import { addTask, fetchTasks,removeTask } from "../features/tasks/tasksSlice";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useParams } from "react-router-dom";

// // export default function Tasks() {
// //     const {projectId} = useParams()
// //     const dispatch = useDispatch()


// //     const [items: tasks, loading,error ] = useSelector((state) => state.tasks)

// //     const [ taskTitle , setTaskTitle ] = useState("")
   

    

    

// // useEffect( () => {
// //     if(projectId){
// //         dispatch(fetchTasks(projectId))
// //     }
// // }, [projectId, dispatch])

// //   const handleAddTask = () => {
// //    if(!tasksTitle.trim()) return;

// //    dispatch(addTask({projectId, title: taskTitle}));
// //    setTaskTitle("")
// //   }

// //   return (
// //     <MainLayout>
// //       <h1 className="text-2xl font-bold mb-4">Tasks</h1>
// //       <div className="flex gap-2 mb-4">
// //       <input
// //         value={taskTitle}
// //         onChange={(e) => setTaskTitle(e.target.value)}
// //         placeholder="Task title"
// //         className="border p-2 rounded"
// //       />
// //       <button onClick={handleAddTask} className="bg-black text-white px-4 rounded">Add Task</button>
// //       </div>

// //       {loading && <p>Loading tasks...</p>}
// //       {error && <p className="text-red-500">{error}</p>}

// //       {tasks.map((t) => (
// //         <div 
// //         key={t.id}
// //         className="flex justify-between items-center border-b py-2"
// //         >
// //             <span>{t.title}</span>
// //             <button onClick={() => dispatch(
// //                 removeTask({
// //                     projectId,
// //                     taskId: t.id,
// //                 })
// //             )} className="text-red-500">
// //                 X
// //             </button>

// //         </div>
// //       ))}
// //     </MainLayout>
// //   );
// // }


// import { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { addTask, fetchTasks,removeTask } from "../features/tasks/tasksSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// export default function Tasks() {
//     const {projectId} = useParams()
//     const dispatch = useDispatch()


//     const [items: tasks ] = useSelector(state => state.tasks)

//     const [ tasksTitle , setTaskTitle ] = useState("")
   

    

    

// useEffect( () => {
//     if(projectId){
//         dispatch(fetchTasks(projectId))
//     }
// }, [projectId, dispatch])

//   const handleAddTask = () => {
//    if(!tasksTitle.trim()) return;

//    dispatch(addTask({projectId, title: taskTitle}));
//    setTaskTitle("")
//   }

//   return (
//     <MainLayout>
//       <h1 className="text-2xl font-bold mb-4">Tasks</h1>
//       <div className="flex gap-2 mb-4">
//       <input
//         value={taskTitle}
//         onChange={(e) => setTaskTitle(e.target.value)}
//         placeholder="Task title"
//         className="border p-2 rounded"
//       />
//       <button onClick={handleAddTask} className="bg-black text-white px-4 rounded">Add Task</button>
//       </div>

//       {loading && <p>Loading tasks...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {tasks.map((t) => (
//         <div 
//         key={t.id}
//         className="flex justify-between items-center border-b py-2"
//         >
//             <span>{t.title}</span>
//             <button onClick={() => dispatch(
//                 removeTask({
//                     projectId,
//                     taskId: t.id,
//                 })
//             )} className="text-red-500">
//                 X
//             </button>

//         </div>
//       ))}
//     </MainLayout>
//   );
// }


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import {
  fetchTasks,
  addTask,
  removeTask,
} from "../features/tasks/tasksSlice";

export default function Tasks() {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  // ✅ CORRECT REDUX STATE DESTRUCTURING
  const { items: tasks, loading, error } = useSelector(
    (state) => state.tasks
  );

  // ✅ FIXED VARIABLE NAME
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    if (projectId) {
      dispatch(fetchTasks(projectId));
    }
  }, [projectId, dispatch]);

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;

    dispatch(
      addTask({
        projectId,
        title: taskTitle,
      })
    );

    setTaskTitle("");
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task title"
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddTask}
          className="bg-black text-white px-4 rounded"
        >
          Add Task
        </button>
      </div>

      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {tasks && tasks.map((t) => (
        <div
          key={t.id}
          className="flex justify-between items-center border-b py-2"
        >
          <span>{t.title}</span>
          <button
            onClick={() =>
              dispatch(
                removeTask({
                  projectId,
                  taskId: t.id,
                })
              )
            }
            className="text-red-500"
          >
            X
          </button>
        </div>
      ))}
    </MainLayout>
  );
}

