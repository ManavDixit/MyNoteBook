import React, { useState,useContext,useEffect } from "react";
//importing useNavigate from react-router-dom
import {useNavigate} from 'react-router-dom';
//importing css
import "./Signup.css";
//importing noteContext
import NoteContext from "../../context/notes/NoteContext";
const Login=()=>{
  //intializing useNavigate used to redirect without reloading
  const navigate=useNavigate();
  //useEffect to run when component is mounted
  useEffect(() => {
    if(localStorage.getItem('authToken')){
      navigate('/');//redirecting to home if authToken is not null/undefined (already logged in)
    }
  }// eslint-disable-next-line
  , [])
    //getting values from NoteContext
    const {host,showAlert,setloading}=useContext(NoteContext);
  //state for userCredintial
  const [userCredintial, setUserCredintial] = useState({name:'',userName:'',password:'',cpassword:''});
  //funtion to add value of input in state userCredintial when input is changed
  const inputChanged=(event)=>{
      setUserCredintial({...userCredintial,[event.target.name]:event.target.value});
  }
  //function to login user when form is sumbited
  const loginUser=async (event)=>{
    //stoping page from reloading
    event.preventDefault();
      const url=`${host}/api/auth/createuser`;
      const {name,userName,password,cpassword}=userCredintial;
      if(password===cpassword){
      const data={
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({name,userName,password})
      }
      //showing loading spinner before/while fetching data
      setloading(true);
      const response=await fetch(url,data);
      const jsonData=await response.json();
      //set loading as false when data is fetched
      setloading(false);
      if(jsonData.success){
        //saving authToken and redirect to home
        localStorage.setItem('authToken',jsonData.authToken);
        navigate('/');//redirecting to home
        //showing alert after account created successfully
        showAlert('Account created successfuly','success');
      }
      else{
        showAlert(jsonData.error,'error')
      }
    }
    else{
        showAlert('Password and confirm password must match','error')
    }
  }
  return (
    <div id="signup">
      <form onSubmit={loginUser}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id='name' name='name' onChange={inputChanged} required minLength='5' />
      </div>
      <div>
        <label htmlFor="userName">UserName:</label>
        <input type="text" name="userName" id="userName" onChange={inputChanged} required minLength='5' />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" onChange={inputChanged} required minLength='8'/>
      </div>
      <div>
        <label htmlFor="cpassword">Confirm Password:</label>
        <input type="password" id='cpassword' name='cpassword' required minLength='8' onChange={inputChanged} />
      </div>
      <button>Create Account</button>
      </form>
    </div>
  );
};

export default Login;
