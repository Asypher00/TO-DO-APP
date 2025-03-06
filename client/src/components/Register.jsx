import { React, useState, useEffect } from 'react';
import { registerFunc } from "../services/api"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./partials/Header"
const Register = () => {
    const navigation = useNavigate();


    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState(null)

    const handleInputChange = e => setForm({...form, [e.target.name]: e.target.value})

    useEffect(()=> {
        const user = localStorage.getItem("user")
        if(user){
            return navigation("/")
        }
    }, [])

    const handleSubmit = async () => {
        if(!form.username || !form.password || !form.email || !form.name){
            toast.error("Please fill in all fields.");
            return;
        }

        try {
           const result = await registerFunc(form);

           if(result.success){
            //successful register
            localStorage.setItem("user", JSON.stringify(result.data.data));
                            toast.success("Login successful!");
                            navigation("/", { replace: true });
           }else {
                           // Failed Register
                    toast.error(result.error || "Regster failed. Please try again.");
                    setErrors(result.data);
                }
        } catch (error) {
            console.error("Register Error:", error);
            toast.error("An error occurred during login. Please try again.");
        }
    } 
    return(
    <>
        <Header />    
        <div className="container">
            <div className="row justify-content-center mt-4">
                <div className="col-lg-5 card border-primary mt-4">
                    <div className="card-body">
                        <h4 className="card-title">Register Now</h4>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <div className="form-floating mb-3">
                                <input type="text" name="name" className="form-control" id="floatingName" placeholder="username" onChange={handleInputChange}/>
                                <label htmlFor="floatingName">Name</label>
                                {
                                    errors?.name &&
                                    <div className="text-danger">{errors.name}</div>
                                }
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" name="username" className="form-control" id="floatingUsername" placeholder="username" onChange={handleInputChange}/>
                                <label htmlFor="floatingUsername">Username</label>
                                {
                                    errors?.username &&
                                    <div className="text-danger">{errors.username}</div>
                                }
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" name="email" className="form-control" id="floatingEmail" placeholder="username" onChange={handleInputChange} />
                                <label htmlFor="floatingEmail">Email</label>
                                {
                                    errors?.email &&
                                    <div className="text-danger">{errors.email}</div>
                                }
                            </div>
                            <div className="form-floating">
                                <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" autoComplete="off" onChange={handleInputChange} />
                                <label htmlFor="floatingPassword">Password</label>
                                {
                                    errors?.password &&
                                    <div className="text-danger">{errors.password}</div>
                                }
                            </div>
                            <button type="submit" className="btn btn-primary mt-4">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    );

}

export default Register;


