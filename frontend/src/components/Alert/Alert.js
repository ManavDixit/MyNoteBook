import React,{useContext} from 'react'
//importing css
import './Alert.css'
//importing NoteContext
import NoteContext from '../../context/notes/NoteContext';
const Alert = () => {
    //getting values from noteContext
    const {alert}=useContext(NoteContext)
    return (
        alert.message && <div id='alert' className={alert.type==='success'?'success':alert.type==='error'?'error':''}>
            <p>{alert.message}</p>
        </div>
    )
}

export default Alert
