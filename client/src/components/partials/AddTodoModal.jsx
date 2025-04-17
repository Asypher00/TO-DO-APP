import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { React, useState } from "react";
import { createTodo } from "../../services/api"
const AddTodoModal = ({fetchTodoList}) => {
    const [todoData, setTodoData] = useState({
        title: "",
        description: ""
    });

    const handleTitleChange = (e) => {
        setTodoData((prev) => ({
            ...prev,
            title: e.target.value
        }));
    };

    const handleDescChange = (e) => {
        setTodoData((prev) => ({
            ...prev,
            description: e.target.value
        }));
    };

    const handleSubmit = async () => {
        const { title, description } = todoData;
        if (title === "" || description === "") {
            toast.error("Title and description are required");
            return;
        }

        const result = await createTodo({
            title: todoData.title,
            description: todoData.description
        })

        if(result.success){
            toast.success("Todo Added")
            //setRefreshList(new Date())
            fetchTodoList()
            
        }else{
            toast.error(result.error || "Login failed. Please try again.");
        }
        setTodoData({
            title: "",
            description: ""
        });
    };

    const handleClose = () => {
        setTodoData({
            title: "",
            description: ""
        });
    };

    return (
        <div className="modal fade" id="exampleModal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Todo</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Title"
                                className="form-control"
                                value={todoData.title}
                                onChange={handleTitleChange}
                            />
                            <textarea
                                placeholder="Description"
                                className="form-control mt-4"
                                rows={3}
                                value={todoData.description}
                                onChange={handleDescChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">
                            Save Todo
                        </button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTodoModal;