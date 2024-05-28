import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

//Pages
import Home from './components/pages/Home';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Container from './components/layout/Container';

//context
import { UserProvider } from './context/UserContext';




function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar/>
        <Container>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/> 
          </Routes>
        </Container>
        <Footer/>
      </UserProvider>
    </Router>
  );
};

export default App;
