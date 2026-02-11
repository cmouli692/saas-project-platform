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
      });
  },
});



export default projectsSlice.reducer;
