import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const host="http://localhost:5000";
    const[credential,setCredential]=useState({email:"",password:""})
    let history=useNavigate();            //to navigate from one component to another
    const handleSubmit=async(e)=>{
          e.preventDefault();   //prevents page reloading
          const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", 
            headers: {
              "Content-Type":"application/json",
            }, 
      body: JSON.stringify({email:credential.email,password:credential.password}), 
        });
        const json=await response.json()
        console.log(json);
        if(json.success){          //correct details
             //save auth token and redirect
             localStorage.setItem('token',json.authToken)
             props.showAlert("Login Successfully","success")
             history("/")
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
    <form  onSubmit={handleSubmit}>
        <div className="mt-2">
            <h1 className='my-2'>Login to continue to CloudNotesHub</h1>
        </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange}  value={credential.email} name="email" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} value={credential.password} name="password" id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-success">Submit</button>
</form>
    </div>
  )
}

export default Login
