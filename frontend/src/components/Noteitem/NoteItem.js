import React, { useContext} from "react";
//imoorting css
import "./NoteItem.css";
//importing NoteContext
import NoteContext from "../../context/notes/NoteContext";
import EditNote from "../EditNote/EditNote";
function NoteItem(props) {
  const { notes } = props;
  //getting values from NoteContext
  const { deleteNote ,editingNote,setEditingNote} = useContext(NoteContext);
  return (
    <>
      <div id="noteItem">
        <div id="title">{notes.title}</div>
        <p id="description">{notes.description}</p>
        <i
          className="fas fa-trash-alt"
          onClick={() => {
            deleteNote(notes._id);
          }}
        ></i>
        <i className="fas fa-edit" onClick={()=>{setEditingNote(true)}} ></i>
        <span>{notes.tag}</span>
      {editingNote && <> <hr/> <EditNote note={notes}/></>}
      </div>
    </>
  );
}

export default NoteItem;
