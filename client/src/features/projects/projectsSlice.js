// import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import { getProjects } from "../../api/projectApi";

// export const fetchProjects = createAsyncThunk(
//     "projects/fetchProjects",
//     async () => {
//         const res = await getProjects();
//         return res.data.data;  // backend returns {data, meta}
//     }
// )

// const projectsSlice = createSlice({
//     name : "projects",
//     initialState : {
//         items : [],
//         loading : false,
//         error: null
//     },
//     extraReducers : (builder) => {
//         builder
//           .addCase(fetchProjects.pending , (state) => {
//             state.loading = true;
//           })
//           .addCase(fetchProjects.fulfilled , (state, action) => {
//             state.loading = false;
//             state.items = action.payload;
//           })
//           .addCase(fetchProjects.rejected , (state, action) => {
//             state.loading = false;
//             state.error = action.error.message;
//           })
//     }
// })

// export default projectsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProjects } from "../../api/projectApi";

export const fetchProjects = createAsyncThunk(
  "projects/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProjects();
      return res.data; // array of projects
    } catch (err) {
      console.log("FETCH PROJECTS ERROR" , err);
      console.log("FETCH PROJECTS ERROR RESPONSE" , err.response)
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch projects",
      );
    }
  },
);

import { createProject } from "../../api/projectApi";

export const addProject = createAsyncThunk(
  "projects/add",
  async (data, {rejectWithValue}) => {
    try {
      const res = await createProject(data);
      return res.data.data;
    }catch(err){
      return rejectWithValue("Failed to create project");
    }
  }
)

import { deleteProject } from "../../api/projectApi";

export const removeProject = createAsyncThunk(
  "projects/remove",
  async(
    id, {rejectWithValue}
  ) => {
    try{
      await deleteProject(id);
      return id;
    }catch(err) {
      return rejectWithValue("Failed to delete project");
    }
  }
)

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addProject.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.items = state.items.filter( p => p.id !== action.payload);
      })
  },
});



export default projectsSlice.reducer;
