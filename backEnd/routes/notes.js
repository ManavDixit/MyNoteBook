const express=require('express');
const router=express.Router();
//importing mongoose model for Notes
const Note=require('../models/Notes');
//importing fetchUser middelware to check if user is logged in and get it's data
const getUser=require('../middlewares/getUser')
// Route 1: Add a note using post on /notes/addnote
router.post('/addnote',getUser,async (req,res)=>{
    try{
        //getting userId from req.user object set by getUser middleware
    const userId=req.user.userId;
    //getting title,description and tag from object req.body using destructuring
    const {title,description,tag}=req.body;
    //adding a new note in model to save in database
    const note=new Note({
        title,description,'user':userId,tag
    });
    //saving the added note in model into database
    const savedNote=await note.save();
    res.json(savedNote);
}catch(error){
    res.json({error});
}
})
//Route 2: Find all notes using post on /notes/fetchallnotes
router.get('/fetchallnotes',getUser,async (req,res)=>{
    //getting userId from req.user object set by getUser middleware
    const userId=req.user.userId;
    //getting notes of user by userId
    const notes=await Note.find({user:userId});
    res.json(notes);
});

//Route 3: Updating notes using put request on /api/notes/updatenote
router.put('/updatenote:id',getUser,async (req,res)=>{
    //geting title,description and tag from req.body obj
    const {title,description,tag}=req.body;
    //getting the note by id from req.id
    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).json({'error':'Note not found'});
    }
    //cheking if id of user logged_in and userId of notes is same :(to check that user does not update note of another user)
    if(req.user.userId.toString() !== note.user.toString()){
        return res.status(405).json({'error':'Not allowed'});
    }
    //creating a object new note
    let newNote={}
    //updating title if title is not null/undefined
    if(title){newNote.title=title};
    //updating description if description is not null/undefined
    if(description){newNote.description=description};
    //updating ag if tag is not null/undefined
    if(tag){newNote.tag=tag};
    //getting note by id and upadating it by newNote
    const updatedNote=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.send(updatedNote);
})

//Route 4: Deleting a note using delete request on /api/notes/deletenote
router.delete('/deletenote:id',getUser,async (req,res)=>{
    //geting notes by req.params.id
    let note=await Note.findById(req.params.id);
    //checking if notes exists
    if(!note){
        return res.status(404).json({'error':'Note not found'});
    }
    //checking if user owns the note that is to be delted
    if(req.user.userId.toString() !== note.user.toString()){
        return res.status(405).json({'error':'Not allowed'});
    }
    //deleting the note
    let deletedNote=await Note.findByIdAndDelete(req.params.id);
    res.json({'success':'deleted note',note});
})
module.exports=router;
