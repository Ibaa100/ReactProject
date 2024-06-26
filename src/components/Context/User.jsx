import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext=createContext();
const UserContextProvider=({children})=>{
    const [userToken,setUserToken]=useState(localStorage.getItem('userToken'));
    const[userName,setUserName]=useState(null);
    const[email,setEmail]=useState(null);
    const getUserData=()=>{
        if (userToken ) {
              const decoded = jwtDecode(userToken);
                setUserName(decoded.userName);
         
        }
    }
    
    useEffect(
        ()=>{
            getUserData();
        },[userToken]
    )
    return <UserContext.Provider value={{setUserToken,userName,setUserName,userToken,email}}>
        {children}
    </UserContext.Provider>
    
    
}
export default UserContextProvider