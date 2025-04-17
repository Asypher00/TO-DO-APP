import logo from './logo.svg';
import './App.css';
import Header from "./components/partials/Header.jsx"
import Homepage from "./components/Homepage.jsx"
import Register from "./components/Register.jsx"
import Login from "./components/Login.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}>
          </Route>
          <Route path="/Register" element={<Register />}>
          </Route>
          <Route path="/Login" element={<Login />}>
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover                      
        />
      </BrowserRouter>
    </>
  );
}

export default App;
