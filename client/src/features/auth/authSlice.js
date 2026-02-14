// import { createSlice } from "@reduxjs/toolkit";

// // // const savedUser = JSON.parse(localStorage.getItem("user"));
// // const token = localStorage.getItem("token");

// // Load persisted auth
// const savedToken = localStorage.getItem("token");
// const savedUser = localStorage.getItem("user");

// // const initialState = {
// //   token : token || null,
// //   user: token ? JSON.parse(localStorage.getItem("user")): null,
// // };

// const initialState = {
//   token: savedToken || null ,
//   user: savedUser ? JSON.parse(savedUser) : null,
// }

// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {
// //     loginSuccess: (state, action) => {
// //       state.user = action.payload;
// //       localStorage.setItem("token", token)
// //       localStorage.setItem("user", JSON.stringify(action.payload));
// //     },
// //     logout: (state) => {
// //       state.user = null;
// //       localStorage.removeItem("user");
// //       localStorage.clear()
// //     },
// //   },
// // });

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginSuccess : (state, action) => {
//       const {token, user} = action.payload;

//       state.token = token;
//       state.user = user;

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//     },
//     logout : (state) => {
//       state.token = null ;
//       state.user = null ;
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     }

//   }
// })

// export const { loginSuccess , logout } = authSlice.actions;

// export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const savedToken = localStorage.getItem("token");
// const savedUser = localStorage.getItem("user");

// const initialState = {
//   token: savedToken || null,
//   user: savedUser ? JSON.parse(savedUser) : null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {

     
//       const { token, user } = action.payload;

//       state.token = token;
//       state.user = user;

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//     },
//     logout: (state) => {
//       state.token = null;
//       state.user = null;

//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const {loginSuccess ,logout }  = authSlice.actions;

// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const getInitialAuthState = () => {
  if (typeof window === "undefined") {
    return {
      token: null,
      user: null,
    };
  }

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return {
    token: token || null,
    user: user ? JSON.parse(user) : null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;

      state.token = token;
      state.user = user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
