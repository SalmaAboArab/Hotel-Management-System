import React from 'react'
import { Navigate} from 'react-router-dom'

export default function ProtectedRoute({children}:any) {
  let loginData=localStorage.getItem('loginData');
    if(localStorage.getItem('userToken')==null && loginData==null){
        return <Navigate to="/"/>
    }
    else return children;
}
