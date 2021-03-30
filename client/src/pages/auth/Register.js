import React, { useState, useEffect } from "react";
import { auth } from '../../firebase'
import { useSelector } from 'react-redux'


import { toast } from 'react-toastify'
    const Register = ({history}) => {
        const [email, setEmail] = useState("");
        const { user } = useSelector((state) => ({...state}));

        useEffect(() => {
            if(user && user.token) history.push("/");
        }, [history, user]);

        const handleSubmit = async (e) => {
            e.preventDefault();
            const config = {
                url: "http://localhost:3000/register/complete",
                handleCodeInApp: true,
            };
            await auth.sendSignInLinkToEmail(email, config);
            toast.success(
                `Email was sent to ${email}. Click the link to complete your registration.`
            );
            // emil id will be stored in local storge
            window.localStorage.setItem('emailForRegistration', email);
            //clear 
            setEmail("");
        };
        const registerForm = () => (
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    className="form-control" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    autoFocus 
                />
                <br/>
                <button 
                    type="submit"
                    className="btn btn-raised">
                    Register
                </button>
            </form>
        );

    return(
        <div className="container p-5"> 
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    );
}

export default Register;