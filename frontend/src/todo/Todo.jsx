import React, { useEffect, useState } from 'react'
import './Todo.css'
import TodoCards from './TodoCards'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import axios from 'axios'

let id = sessionStorage.getItem("id")
let toUpdateArray = [];
 
const Todo = () => {
    const [Inputs, setInputs] = useState({ title: "", body: "" })
    const [Array, setArray] = useState([])
    const show = () => {
        document.getElementById('textarea').style.display = 'block'
    }

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value })
    }

    const submit = async () => {
        if (Inputs.title === "" || Inputs.body === "") {
            toast.error("Title or Body should not be empty!");
        } else {
            if (id) {
                try {
                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v2/addTask`, {
                        title: Inputs.title,
                        body: Inputs.body,
                        id: id,
                    });
                    setInputs({ title: "", body: "" });
                    toast.success("Your Task is Added");
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v2/getTasks/${id}`);
                    setArray(response.data.list);
                } catch (error) {
                    toast.error("Error adding task!");
                }
            } else {
                setArray([...Array, Inputs]);
                setInputs({ title: "", body: "" });
                toast.success("Your Task is Added");
                toast.error("Your Task is not Saved! Please Sign Up");
            }
        }
    };
    
    

    const del = async (Cardid) => {
        if (id) {
            try {
                await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v2/deleteTask/${Cardid}`, {
                    data: { id: id },
                });
                toast.success("Your Task is deleted");
    
                
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v2/getTasks/${id}`);
                setArray(response.data.list);
            } catch (error) {
                toast.error("Error deleting task.");
            }
        } else {
            toast.error("Please Sign up first!");
        }
    };
    

    const dis = (value) => {

        document.getElementById("todo-upate").style.display = value;
    }

    const update =  (value) => {
        toUpdateArray = Array[value]
    }

    useEffect(() => {
        const fetchTasks = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v2/getTasks/${id}`);
                    setArray(response.data.list);
                } catch (error) {
                    toast.error("Error fetching tasks.");
                }
            } else {
                toast.error("User is not logged in.");
            }
        };

        fetchTasks();
    }, [submit]);
    

    return (
        <>
            <div className='todo'>
                <ToastContainer />
                <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
                    <div className="d-flex flex-column todo-inputs-div w-lg-50  w-100 p-1">
                        <input type='text'
                            placeholder='TITLE'
                            className='my-2 p-2 todo-inputs'
                            name='title'
                            value={Inputs.title}
                            onClick={show}
                            onChange={change}>
                        </input>

                        <textarea id='textarea'
                            type='text'
                            name='body'
                            placeholder='body'
                            value={Inputs.body}
                            className='p-2 todo-inputs'
                            onChange={change}>
                        </textarea>
                    </div>
                    <div className='w-lg-50 w-100 d-flex justify-content-end my-3'>
                        <button className='home-btn px-2 py-1' onClick={submit}>Add</button>
                    </div>
                </div>
                <div className="todo-body">
                    <div className="container-fluid">
                        <div className="row">
                            {Array && Array.map((item, index) => (
                                <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2" key={index}>
                                    <TodoCards
                                        title={item.title}
                                        body={item.body}
                                        id={item._id}
                                        delid={del}
                                        display={dis}
                                        updateid={index}
                                        toBeUpdate={update}
                                        />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="todo-update" id='todo-upate'>
                <div className="container update">
                    <Update display={dis} update={toUpdateArray}/>
                </div>
            </div>
        </>
    )
}

export default Todo