import React, { useContext } from 'react'
import './Spinner.css';
import loadingGif from './loading.gif';
//importing NoteContext
import NoteContext from '../../context/notes/NoteContext';
const Spinner=()=>{
    //getting values from NoteContext
    const {loading}=useContext(NoteContext);
        return (
                loading &&
            <div id='spinnerBox'>
                <img src={loadingGif} alt="spinner" />
            </div>
        )
}
export default Spinner;