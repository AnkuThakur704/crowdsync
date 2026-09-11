import {Link, Routes, Route} from 'react-router'
import Landing from './components/landing'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Signup from './components/signup'
import Login from './components/login'
import Dashboard from './components/dashboard'
import Studio from './components/studio/studio'
import Drafts from './components/drafts'
import Hostques from './components/hostques'
import Joinques from './components/joinques'
import Ques from './components/ques'
import Quizques from './components/quizques'
import Live from './components/live'
import Quizlive from './components/quizlive'
import Pastpolls from './components/past/pastpolls'
import Viewpastpoll from './components/past/viewpastpoll'
import Pastquizzes from './components/past/pastquizzes'
import Viewpastquiz from './components/past/viewpastquiz'

const App = () => {
  return (
    <>
    <Navbar/>
    
    <Routes>
      <Route path='/' element={<Landing />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/studio' element={<Studio />}></Route>
      <Route path='/drafts' element={<Drafts/>}></Route>
      <Route path='/hostques' element={<Hostques/>}></Route>
      <Route path='/joinques' element={<Joinques/>}></Route>
      <Route path='/pollques' element={<Ques/>}></Route>
      <Route path='/quizques' element={<Quizques/>}></Route>
      <Route path='/live' element={<Live/>}></Route>
      <Route path='/quizlive' element={<Quizlive/>}></Route>
      <Route path='/pastpolls' element={<Pastpolls/>}></Route>
      <Route path='/viewpastpoll' element={<Viewpastpoll/>}></Route>
      <Route path='/pastquizzes' element={<Pastquizzes/>}></Route>
      <Route path='/viewpastquiz' element={<Viewpastquiz/>}></Route>
    </Routes>
    <Footer/>
    </>
  )
}

export default App  
