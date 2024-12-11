import React from 'react'
import "./Navbar.css"
import { PiListChecksFill } from "react-icons/pi";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { authActions } from '../../store'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const history = useNavigate();
    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    const dispatch = useDispatch()
    const logout = () => {
        sessionStorage.removeItem("id")
        dispatch(authActions.logout())
        window.location.reload()
        history("/todo")
    }

    console.log(isLoggedIn)
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <a className="navbar-brand" href="#"><b><PiListChecksFill /> &nbsp; todo</b></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <Link to='/' className="nav-link active" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link to='/about' className="nav-link active" aria-current="page">About Us</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link to='/todo' className="nav-link active" aria-current="page">Todo</Link>
                            </li>
                            {!isLoggedIn && (<>
                            <div className='d-flex'>
                            <li className="nav-item mx-2">
                                    <Link to='/signup' className="nav-link active btn-nav p-2" aria-current="page">SignUp</Link>
                                </li>
                            </div>
                                <div className='d-flex my-lg-0 my-2'> 
                                <li className="nav-item mx-2">
                                    <Link to='/signin' className="nav-link active btn-nav p-2" aria-current="page">SignIn</Link>
                                </li>
                                </div>
                                
                            </>)}
                            {isLoggedIn && (
                                <div className='d-flex'>
                                     <li className="nav-item mx-2">
                                    <Link to='' className="nav-link active btn-nav p-2" aria-current="page" onClick={logout}>Logout</Link>
                                </li>
                                </div>
                               
                            )}

                            {/* <li className="nav-item mx-2">
                                <Link to='' className="nav-link active" aria-current="page" href="#">
                                    <img className="img-fluid user-png" src='https://imgs.search.brave.com/FJh89KY6hteZeZXt75pW39nTfpcpEluHbebYwZ8NwQ4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL3RodW1icy81/ODVlNGJjNGNiMTFi/MjI3NDkxYzMzOTUu/cG5n' alt=''></img></Link>
                            </li> */}


                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
