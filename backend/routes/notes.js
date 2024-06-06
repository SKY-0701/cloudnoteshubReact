const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1:Get all the notes using:GET "api/notes/fetchallnotes"(Login required)
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 2:Add a new note using:POST "api/notes/addnote"(Login required)
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description should be at least length of 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //If there are errors , return bad requests and error
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3:Update existing note using:PUT "api/notes/updatenote"(Login required)
router.put("/updatenote/:id",fetchuser,async(req,res)=>{
  try{

    const {title,description,tag}=req.body;
    
    //Create a newNote object
    const newNote={};
    
    if(title){newNote.title=title};                         //If title is to be updated
    if(description){newNote.description=description};       //If description is to be updated
    if(tag){newNote.tag=tag};                               //If tag is to be updated
    
    //Find note to be updated
    let note=await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    
    //Check whether authenticate user is updating his note or not
    if(note.user.toString()!==req.user.id){
      return res.status(401).send("Not Allowed");
    }
    
    //All set now update the note
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(note);
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//Route 4: Delete existing note using:DELETE "api/notes/updatenote"(Login required)
router.delete("/deletenote/:id",fetchuser,async(req,res)=>{
  try{

    //Find note to be updated
    let note=await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    
    //Check whether authenticate user is deleting his note or not
    if(note.user.toString()!==req.user.id){
      return res.status(401).send("Not Allowed");
    }
    
    //All set now delete the note
    note=await Note.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note deleted"});
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
  module.exports = router;
  