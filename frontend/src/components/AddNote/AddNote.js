import React, { useContext, useState } from "react";
//imorting css
import "./AddNote.css";
//importing NoteContext
import NoteContext from "../../context/notes/NoteContext";
const AddNote = () => {
  //getting values of NoteContext
  const { addNote,showAlert } = useContext(NoteContext);
  //state for newNote to be added
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "general",
  });
  //function for onclick on AddNote
  const addNotes = (event) => {
    event.preventDefault();
    addNote(note);
    //showing alert that note added successfuly
    showAlert('Note added successfuly','success')
    //seting paramenters state note as blank so that input to add note gets blank
    setNote({title:'',description:'',tag:'general'})
  };
  const inputChanged = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <form id="addNote">
        <h2>Add Notes</h2>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" onChange={inputChanged} value={note.title} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" onChange={inputChanged} value={note.description} />
        </div>
        <div>
          <label htmlFor="tag">Tag:</label>
          <input type="text" id='tag' name='tag' onChange={inputChanged} value={note.tag} />
        </div>
        <button disabled={note.title.trim().length<5 || note.description.trim().length<5} onClick={addNotes}>Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
