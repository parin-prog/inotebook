import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <div className="App">
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert msg=''/>
          <div className='container'>
            <Routes>
              <Route exact path='/home' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<SignUp />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
