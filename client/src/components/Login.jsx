import React, { useState, useEffect } from 'react';
import { loginFunc } from '../services/api';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./partials/Header"

const Login = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const navigation = useNavigate();
    const [errors, setErrors] = useState(null);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    useEffect(()=> {
        const user = localStorage.getItem("user")
        if(user){
            return navigation("/")
        }
    }, [])

    const handleSubmit = async () => {
        if (!form.username || !form.password) {
            toast.error("Please fill in all fields.");
            return;
        }
        try {
            const result = await loginFunc(form);
    
            if (result.success) {
                // Successful login
                localStorage.setItem("user", JSON.stringify(result.data.data));
                toast.success("Login successful!");
                navigation("/", { replace: true });
            } else {
                // Failed login
                toast.error(result.error || "Login failed. Please try again.");
                setErrors(result.data);
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("An error occurred during login. Please try again.");
        }
    };

    return (
        <>
        <Header />
        <div className="container">
            <div className="row justify-content-center mt-4">
                <div className="col-lg-5 card border-primary mt-4">
                    <div className="card-body">
                        <h4 className="card-title">Login Now</h4>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                            <div className="form-floating mb-3">
                                <input type="text" onChange={handleChange} name="username" className="form-control" id="floatingInput" placeholder="username" />
                                <label htmlFor="floatingInput">Username</label>
                                {errors?.username && <div className="text-danger">{errors.username}</div>}
                            </div>
                            <div className="form-floating">
                                <input type="password" onChange={handleChange} name="password" className="form-control" id="floatingPassword" placeholder="Password" autoComplete="off" />
                                <label htmlFor="floatingPassword">Password</label>
                                {errors?.password && <div className="text-danger">{errors.password}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary mt-4">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;




// import React, { useState } from 'react';
// import { loginFunc } from '../services/api';
// import { useNavigate } from "react-router-dom"
// import { ToastContainer, toast} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"
// const Login = () => {
//     const [form, setForm] = useState({
//         username: "",
//         password: "",
//     })

//     const navigation = useNavigate();
//     const [errors, setErrors] = useState(null)

//     const handleChange = e => setForm({...form, [e.target.name]: e.target.value });

//     const handleSubmit = async () => {
//         try {
//             const result = await loginFunc(form)
//             console.log(form)
//             setErrors(null)

//             if( result.status === 200){
//                 if( result.data.status === 200 ){
//                     localStorage.setItem("user", JSON.stringify(result.data.data))
//                     navigation("/");
//                     return;
//                 }
//                 else{
//                     setErrors(result.data.data)
//                     toast(result.data.message)
//                     return;
//                 }
//             }
//         } catch (error) {
//             console.log(error.message)
//         }

        

//     }
//     return(
//         <div className = "container">
//             <div className = "row justify-content-center mt-4">
//                 <div className = "col-lg-5 card border-primary mt-4">
//                         <div className="card-body">
//                             <h4 className="card-title">Login Now</h4>
//                             <div>
//                                 <div className="form-floating mb-3">
//                                     <input type="text" onChange={handleChange} name="username" className="form-control" id="floatingInput" placeholder="username" />
//                                     <label htmlFor="floatingInput">username</label>
//                                 </div>
//                                 <div className="form-floating">
//                                     <input type="password" onChange={handleChange} name="password" className="form-control" id="floatingPassword" placeholder="Password" autoComplete="off" />
//                                     <label htmlFor="floatingPassword">Password</label>
//                                 </div>
//                                 <button type="button" className="btn btn-primary mt-4" onClick={handleSubmit}>Login</button>
//                             </div>
//                         </div>
//                         </div>
//             </div>
//         </div>
//     )
// }

// export default Login;