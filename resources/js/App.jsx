import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import About from './Pages/About';
import Home from './Pages/Home';
import ContactUs from './Pages/ContactUs';
import NavBar from './Layouts/NavBar';
import Properties from './Pages/Properties/Properties';
import Property from './Pages/Properties/Property';
import Login from './Pages/Register-Login/Login';
import Register from './Pages/Register-Login/Register';
import CreateForm from './Pages/Listing/CreateForm';
import EditForm from './Pages/Listing/EditForm';
import UserProperties from './Pages/Properties/UserProperties';
import { PropertyContext } from './Context/PropertyContext';
import CategoryPage from './Pages/Properties/CategoryPage';


function App() {

  const {retrieveUser } = useContext(PropertyContext);

  useEffect(()=> {
    retrieveUser();
  }, [])

  return (
    <Routes>
        <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="create" element={<CreateForm />} />
            <Route path="user/:id" element={<UserProperties />} />
            <Route path="properties" element={<Properties />} />
            <Route path="properties/category/:id" element={<CategoryPage />} />
            <Route path="properties/:id" element={<Property />} />
            <Route path="properties/edit/:id" element={<EditForm />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default App
