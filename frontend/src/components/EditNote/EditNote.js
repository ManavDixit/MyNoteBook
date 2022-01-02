import React,{useContext,useState} from "react";
//importing css
import './EditNote.css'
//importing NoteContext
import NoteContext from '../../context/notes/NoteContext'
const EditNote = (props) => {
  //getting values from NoteContext
  const {setEditingNote,editNote,showAlert}=useContext(NoteContext); 
  //function to hide edit note section
  const hideEditNoteSection=()=>{
    setEditingNote(false)
  }
  //state for new note
  const [note, setnote] = useState({etitle:props.note.title,edescription:props.note.description,etag:props.note.tag})
  //function to run when input values changes
  const inputChanged=(event)=>{
    //changing the value of note if title, description or tag is changed
   setnote({...note,[event.target.name]:event.target.value}) ;
  }
  //function to save note
  const saveNote=()=>{
    //calling editNote function and passing title,description and tagM
    editNote({title:note.etitle.trim(),description:note.edescription.trim(),tag:note.etag.trim(),id:props.note._id});
    //hiding note editing section after note is edited
    setEditingNote(false);
    //showing alert that note edited successfuly
    showAlert('Note Edited succesfully','success');
  }
  return (
    <div id="editNote">
        <h3>Edit Notes</h3>
        <div>
          <label htmlFor="etitle">Title:</label>
          <input type="text"  id="etitle" name="etitle" onChange={inputChanged} value={note.etitle} />
        </div>
        <div>
          <label htmlFor="edescription" >Description:</label>
          <input
            type="text"
            id="edescription"
            name="edescription"
            onChange={inputChanged}
            value={note.edescription}
          />
        </div>
        <div>
          <label htmlFor="etag">Tag:</label>
          <input type="text" id="etag" name="etag" onChange={inputChanged} value={note.etag} />
        </div>
        <button disabled={note.etitle.trim().length<5 || note.edescription.trim().length<5} onClick={saveNote}>Save Note</button>
        <button onClick={hideEditNoteSection} >Close</button>
    </div>
  );
};

export default EditNote;
