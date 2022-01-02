import React, { useState,useContext,useEffect } from "react";
//importing useNavigate from react-router-dom
import {useNavigate} from 'react-router-dom';
//importing css
import "./Login.css";
//importing noteContext
import NoteContext from "../../context/notes/NoteContext";
const Login=()=>{
  //useEffect to run when component is mounted
  //intializing useNavigate used to redirect without reloading
  const navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('authToken')){
      //redirecting to home if authToken is not null/undefined (already logged in)
      navigate('/');
    }
  }// eslint-disable-next-line
  , [])
    //getting values from NoteContext
    const {host,showAlert,setloading}=useContext(NoteContext);
  //state for userCredintial
  const [userCredintial, setUserCredintial] = useState({userName:'',password:''});
  //funtion to add value of input in state userCredintial when input is changed
  const inputChanged=(event)=>{
      setUserCredintial({...userCredintial,[event.target.name]:event.target.value});
  }
  //function to login user when login button is clicked
  const loginUser=async ()=>{
      const url=`${host}/api/auth/login`;
      const data={
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({userName:userCredintial.userName,password:userCredintial.password})
      }
      //showing alert until data is fetched
      setloading(true);
      const response=await fetch(url,data);
      const jsonData=await response.json();
      //hiding spinner when data is fetched
      setloading(false);
      if(jsonData.success){
        //saving authToken and redirect to home
        localStorage.setItem('authToken',jsonData.authToken);
        navigate('/');//redirecting to home
        //showing alert when user logged in success fully
        showAlert('Logged in successfuly','success');
      }
      else{
        showAlert('invalid userName or password','error')
      }
  }
  return (
    <div id="login">
      <div>
        <label htmlFor="userName">UserName:</label>
        <input type="text" name="userName" id="userName" onChange={inputChanged} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" onChange={inputChanged} />
      </div>
      <button onClick={loginUser}>Login</button>
    </div>
  );
};

export default Login;
