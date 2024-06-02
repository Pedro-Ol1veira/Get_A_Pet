import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

//Pages
import Home from './components/pages/Home';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Container from './components/layout/Container';
import Message from './components/layout/Message';
import Profile from './components/pages/user/Profile';
import MyPets from './components/pages/pets/MyPets';
import AddPets from './components/pages/pets/AddPets';
import EditPet from './components/pages/pets/EditPet';
import PetDetails from './components/pages/pets/PetDetails';
import MyAdoptions from './components/pages/pets/MyAdoptions';

//context
import { UserProvider } from './context/UserContext';








function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/pets/mypets' element={<MyPets />} />
            <Route path='/pets/add' element={<AddPets />} />
            <Route path='/pets/edit/:id' element={<EditPet />} />
            <Route path='/pets/:id' element={<PetDetails />} />
            <Route path='/pets/myadoptions' element={<MyAdoptions />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
};

export default App;
