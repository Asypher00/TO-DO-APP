import {React, useEffect, useState } from 'react';
import Header from "./partials/Header"
import Todo from "./partials/Todo"
import AddTodoModal from "./partials/AddTodoModal";
import { useNavigate } from "react-router-dom";
import { getToken, getAllTodos } from '../services/api'; 
const Homepage = () => {
    const navigation = useNavigate()
    const [todoList, setTodoList] = useState([])
    const [searchText, setSearchText] = useState("")
    const [filteredList, setFilteredList] = useState([])
    useEffect(()=>{
        if(!getToken()) {
            navigation("/login")
            return
        }
        fetchTodoList()
        
    }, [])

    useEffect(()=>{
        if (searchText === "") {
            setFilteredList(todoList);
        } else {
            const tempList = todoList.filter(todo =>
                todo.title.toLowerCase().trim().includes(searchText.trim().toLowerCase())
            );
            setFilteredList(tempList);
        }
    },[todoList, searchText])

    const fetchTodoList = async () => {
        try {
            const result = await getAllTodos();
            if (result.success) {
                setTodoList(result.data.data.todos.reverse());
                // toast.success("Todos Displayed"); // Show success toast
            } else {
                // toast.error(result.error || "Please try again."); // Show error toast
                console.error(result.error);
            }
        } catch (error) {
            // toast.error("An error occurred while fetching todos."); // Handle unexpected errors
            console.error(error);
        }
    }
    return(
        <div>
            <Header searchText={searchText} setSearchText={setSearchText}/>
            <div className="container">
                <div className="row justify-content-md-center mt-4">
                {   
                    filteredList.map((todo)=>{
                        return(
                            <Todo todo={todo} key={todo._id} fetchTodoList={fetchTodoList}/>
                        )
                    })
                } 
                {
                    filteredList.length === 0 && <div className = "notFoundTodos">
                        No Todos Found              
                    </div>
                }
                </div> 
                <div className = "" style={{ position: "fixed", right: 50,  bottom: 50, zIndex: 1000}}>
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Todo</button>
                </div>
                <AddTodoModal fetchTodoList={fetchTodoList}/>                 
            </div>

        </div>
    )
}

export default Homepage;