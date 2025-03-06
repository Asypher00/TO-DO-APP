import React from "react";
import AddTodoModal from "./AddTodoModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment/moment"
import { deleteTodo, markTodo } from "../../services/api";
const Todo = ({todo, fetchTodoList}) => {
    const handleDelete = async () =>{
        try {
            const result = await deleteTodo(todo._id);
            if(result.success){
                toast.success("Todo Deleted")
                //setRefreshList(new Date())
                fetchTodoList()
            }else{
                    toast.error(result.error || "Failed To Delete");
                }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Failed to delete todo. Please try again.");
        }
    }

    const handleComplete = async () => {
        try {
            const result = await markTodo(todo._id);
            if(result.success){
                toast.success("Todo Marked")
                //setRefreshList(new Date())
                fetchTodoList()
            }else{
                    toast.error(result.error || "Failed To Mark");
                }
        } catch (error) {
            console.error("Mark Error:", error);
            toast.error("Failed to Mark todo. Please try again.");
        }
    }
    
    return(
        <div>
           <div className="card text-white bg-secondary mb-3" style={{"maxWidth":"20rem"}}>

                <div className="card-body">
                    <h4 className="card-title" style={{textDecoration: todo.isCompleted? "line-through" : "none"}}>{todo.title}</h4>
                    <p className="card-text">{todo.description}</p>
                    <p className="card-text">{moment(todo.createdAt).fromNow()}</p>
                    <div style={{display: "flex", justifyContent: "space-between"}} className="actionButtons">
                        <div className="deleteButton"><button type="button" className="btn btn-danger" onClick = {handleDelete}>Delete</button></div>
                        <div className="markTodo"><button type="button" className="btn btn-primary" onClick = {handleComplete}>{todo.isCompleted?"Completed":"Incomplete"} </button></div>
                    </div>
                </div>
            </div>

        </div>    
    )
}

export default Todo;