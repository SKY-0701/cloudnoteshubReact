import React,{useContext, useState} from 'react';
import contextValue from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(contextValue);
    const {addNote} = context;

    const [note,setNote]=useState({title:"",description:"",tag:"default"});

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("Note Added Successfully","success")
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
                          
  return (
    <div>
      <div className="container my-3">
        <h2>Add a note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={note.title} name="title" minLength={5} required  aria-describedby="emailHelp"  onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">  Description </label>
            <input  type="text"  className="form-control"  id="description" value={note.description} minLength={5} required name="description"  onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input  type="text"  className="form-control"  id="tag"  name="tag" value={note.tag} minLength={5} required onChange={onChange} />
          </div>
         
            <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-success" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
