import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser)
    if (storedUser) {
      setUser(JSON.parse(storedUser));
     
    }
  },[]);

  const login = (data) => {
    const fakeUser = {email: data.email , token : "fake-jwt-token"}
    localStorage.setItem("user", JSON.stringify(fakeUser))
    setUser(fakeUser)
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user,login,logout}}>
        {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext)
