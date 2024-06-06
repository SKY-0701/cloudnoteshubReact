import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const host="http://localhost:5000";
  const[credential,setCredential]=useState({name:"",email:"",password:"",cpassword:""})
  let history=useNavigate();            //to navigate from one component to another
    const handleSubmit=async(e)=>{
          e.preventDefault();   //prevents page reloading
          const {name,email,password}=credential;
          const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST", 
            headers: {
              "Content-Type":"application/json",
            }, 
      body: JSON.stringify({name,email,password}), 
        });
        const json=await response.json()
        console.log(json);
        if(json.success){          //correct details
             //save auth token and redirect
             localStorage.setItem('token',json.authToken)
             history("/")
             props.showAlert("Account  Created Successfully","success")
        }
        else{
           props.showAlert("Invalid Credentials","danger")
        }
    }

    const onChange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
  return (
    <div>
       <div className="mt-2">
            <h1 className='my-2'>Create an account to use CloudNotesHub</h1>
        </div>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">NAME</label>
    <input type="text" className="form-control" id="name" onChange={onChange} value={credential.name} name="name" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">EMAIL ADDRESS</label>
    <input type="email" className="form-control" id="email"  onChange={onChange} value={credential.email} name="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">PASSWORD</label>
    <input type="password" className="form-control" onChange={onChange} minLength={5} required value={credential.password} name="password" id="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">CONFIRM PASSWORD</label>
    <input type="password" className="form-control" onChange={onChange} minLength={5} required value={credential.cpassword} name="cpassword" id="cpassword"/>
  </div>
  <button type="submit" className="btn btn-success">Submit</button>
</form>
    </div>
  )
}

export default Signup
