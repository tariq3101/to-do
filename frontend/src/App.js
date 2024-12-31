import React, { useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Footer from './components/footer/footer'
import About from './components/about/About'
import Signup from './components/signup/Signup'
import Signin from './components/signup/Signin'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Todo from './todo/Todo'
import { authActions } from './store'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const id = sessionStorage.getItem("id")
    if(id){
      dispatch(authActions.login())
    }
  }, [])
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exaqct path='/' element={<Home />}/>
          <Route exaqct path='/about' element={<About/>}/>
          <Route exaqct path='/signup' element={<Signup />}/>
          <Route exaqct path='/signin' element={<Signin />}/>
          <Route exaqct path='/todo' element={<Todo />}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App