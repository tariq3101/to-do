import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
let id = sessionStorage.getItem("id")

const Update = ({ display, update }) => {
  useEffect(() => {
    setInputs({
      title: update.title,
      body: update.body
    })
  }, [update])
  const [Inputs, setInputs] = useState({ title: "", body: "" })
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value })
  }

  const submit = async () => {
    if(id){
      await axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/api/v2/updateTask/${update._id}`, Inputs)
      .then((response) => {
      toast.success(response.data.message)
      })
    display("none")
    } else {
      toast.error("Please Sign Up first!")
    }
  }
  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>

      <h3>Update yout Task</h3>
      <input type='text' className='todo-inputs my-4 w-100 p-3' value={Inputs.title} onChange={change} name='title'></input>
      <textarea className='todo-inputs w-100 p-3' value={Inputs.body} onChange={change} name='body'></textarea>
      <div>
        <button className='btn btn-dark my-4' onClick={submit}>Update</button>
        <button className='btn btn-danger my-4 mx-3' onClick={() => {
          display("none")
        }}>Close</button>
      </div>
    </div>
  )
}

export default Update