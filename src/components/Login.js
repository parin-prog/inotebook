import React, { useState } from 'react'
import {useNavigate} from 'react-router'

const Login = (props) => {
    const [user, setuser] = useState({email: "", password: ""})
    const navigate = useNavigate();

    const changeHandler = (e) =>{
        setuser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email: user.email, password: user.password}) 
          });

          const json = await response.json();
          console.log(json)
          if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            navigate('/')
            props.showAlert("Logged in successfully ", "success")
          } else {
            props.showAlert("Authentication Denied", "danger")
          }
    }
    return (
        <div className='mt-5'>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" name="email" value={user.email} onChange={changeHandler} id="inputEmail3" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" name="password" value={user.password} onChange={changeHandler} id="inputPassword3" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
        </div>
    )
}

export default Login