import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  //variable for host of server
  const host='http://localhost:8000';
  //state for notes
  const [notes,setNotes] = useState([]);

  //state for check if section for editing note must be visible or not
  const [editingNote, setEditingNote] = useState();
  //getting authToken from localStorage
    const token=localStorage.getItem('authToken');
    //function to add notes
  const addNote =async (Note) => {
    const {title,description,tag}=Note;
    //addimg note in database in backend
    const url=`${host}/api/notes/addnote`;
    const data={
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':token,
      },
      body:JSON.stringify({title:title.trim(),description:description.trim(),tag:tag.trim() || 'general'})
    }
    const response=await fetch(url,data);
    const jsonData=await response.json();
    //adding note in frontEnd
    //function to add note
    const note = {
      _id: jsonData._id,
      user:jsonData.user,
      title: jsonData.title,
      description: jsonData.description,
      tag: jsonData.tag,
      date: jsonData.date,
      __v: 0,
    };
    //add new note in array of notes
    setNotes(notes.concat(note));
  };
  //function to edit note
  const editNote=async ({title,description,tag,id})=>{
    //updating note on database in backend
    const url=`${host}/api/notes/updatenote${id}`;
    const data={
      method:'PUT',
      headers:{
        'auth-token':token,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({title,description,tag})
    }
    const response=await fetch(url,data);
    //converting response to json
    const jsonData=await response.json();

    //logic to edit note in frontEnd
    //making a copy array of notes state
    const newNote=[...notes]
    newNote.forEach((note,index)=>{
      if(note._id===id){
        newNote[index]=jsonData;
      }
    })
    //setting newNote as notes
    setNotes(newNote);
  }
  //function to delete note
  const deleteNote=async (id)=>{
    //deleting from dataBase in backend
    const url=`${host}/api/notes/deletenote${id}`;
    const data={
      method:'delete',
      headers:{
        'auth-token':token
      }
    }
    await fetch(url,data);

    //deleting from frontEnd
    //removing note with given id using filter() method
    const newNotes=notes.filter(note=>{return note._id!==id});
    setNotes(newNotes)
    //showing alert that note deleted successfuly
    showAlert('Note deleted Successfuly','success')
  }
  //function to fetch all notes
  const fetchAllNotes=async ()=>{
    const token=localStorage.getItem('authToken');
    const url=`${host}/api/notes/fetchallnotes`;
    //request body,headers etc.
    const data={
      method:'GET',
      headers:{
        'Content-Type':'application/json',
      'auth-token':token
    }}
    const response=await fetch(url,data);
    const jsonData=await response.json();
    setNotes(jsonData);
  }
  //state for alert
  const [alert, setalert] = useState({
    message:'',type:''
  });
  //function to showAlert and hide after 2sec
  const showAlert=(message,type)=>{
    setalert({
      message,type
    })
    //hiding alert after 2sec by making massage blank
    setTimeout(()=>{setalert({message:'',type:''})},2000);
  }
  //state for checking if loading is to be showned or not
  const [loading, setloading] = useState(false);
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,fetchAllNotes ,editingNote,setEditingNote,host,alert,showAlert,loading,setloading}}>
      {props.children}
      {/*anything between opening and closing bracket of the element is passed as props.children*/}
    </NoteContext.Provider>
  );
};
export default NoteState;
