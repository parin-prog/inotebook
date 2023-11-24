import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
    const [user, setuser] = useState({email:"",name:"",password:"",cpassword:""})
    const navigate = useNavigate()

    const changeHandler = (e) =>{
        setuser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) =>{
        const {email, name, password} = user;
        e.preventDefault();

        if (user.cpassword === password) {
            const headers = {
                "Content-Type": "application/json"
              };
              
              const body = JSON.stringify({ email, name, password });
              
              const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: "POST",
                headers,
                body
              });

        const json = await response.json();
        localStorage.setItem('token', json.authtoken);
        navigate('/')
        props.showAlert("Signed up successfully ", "success")
        } else {
            props.showAlert("Invalid password try again", "danger")
        }
    }
    return (
        <div className='container my-4'>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" onChange={changeHandler} name="email" value={user.email} id="email" />
                </div>
                <div className="col-12">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={changeHandler} name="name" value={user.name} id="name" required/>
                </div>
                <div className="col-12">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={changeHandler} name="password" value={user.password} id="password" minLength={5} required/>
                </div>
                <div className="col-12">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={changeHandler} name="cpassword" value={user.cpassword} id="cpassword" minLength={5} required/>
                </div>
                <div className="col-12 my-5">
                    <button type="submit" className="btn btn-primary">Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;