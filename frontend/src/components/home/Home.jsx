import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='home d-flex justify-content-center align-items-center'>
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <h1 className='text-center'>Organize your <br /> work and life, finally.</h1>
                <p>Become focused, organized, and calm with <br />todo app. </p>
                <button className='home-btn p-2'>
                <Link to='/todo' className="nav-link active" aria-current="page">Make Todo List</Link>
                </button>
            </div>
        </div>
    )
}

export default Home
