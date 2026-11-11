import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Message from './components/layout/Message';

import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';
import Profile from './components/pages/User/Profile';
import AddPet from './components/pages/Pet/AddPet';
import PetDetails from './components/pages/Pet/PetDetails';

import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar/>
          <Message/>
            <Container>
              <Routes>
                <Route path='/login'element={<Login/>}/>
                <Route path='/register'element={<Register/>}/>
                <Route path='/User/Profile'element={<Profile/>}/>
                <Route path='/pet/add'element={<AddPet/>}/>
                <Route path='/pet/:id'element={<PetDetails/>}/>
                <Route path='/'element={<Home/>}/>
              </Routes>
            </Container>
        <Footer/>
      </UserProvider>
    </Router>
  );
}

export default App;
