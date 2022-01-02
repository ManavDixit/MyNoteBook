import React,{useContext,useEffect} from "react";
//importing useNavigate from react-router-dom
import {useNavigate} from 'react-router-dom'
//importing NoteItem components
import NoteItem from "../Noteitem/NoteItem";
//importing css
import "./NoteBox.css";
//imorting NoteContext
import NoteContext from '../../context/notes/NoteContext';
function NoteBox() {
  //intializing useNavigate
  const navigate=useNavigate();
  //geting values from NoteContext
  const {notes,fetchAllNotes}=useContext(NoteContext);
  //useEffect for componentDidmount
  useEffect(()=>{
    //if authToken is not null then fetchAllNotes
    if(localStorage.getItem('authToken')){
    fetchAllNotes()
    }else{
      //if authToken is null redirect to login
      navigate('/login');
    }
  }// eslint-disable-next-line
  ,[])
  return (
    <div id="noteBox">
      {notes.map((element) => {
        return <NoteItem key={element._id} notes={element} />;
      })}
    </div>

  );
}

export default NoteBox;
