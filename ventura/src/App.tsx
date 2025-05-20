
import './App.css'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import { ParallaxProvider } from 'react-scroll-parallax';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import ItinerariesList from './pages/ItinerariesList';
import ItineraryPage from './pages/ItineraryPage';
import CreateItinerary from './pages/CreateItinerary';
import InvitedItinerariesList from './pages/InvitedItinerariesList';
import Account from './pages/Account';

function App() {

  return (
    <>
    <ParallaxProvider>
      <Router>
        <Routes>
          <Route path='/Ventura' element={<LandingPage/>}/>
          <Route path='/Ventura/login' element={<Login/>}/>
          <Route path='/Ventura/register' element={<Register/>}/>
          <Route path='/Ventura/*' element={
            <PrivateRoute>
              <Routes>
                <Route path='/itineraries' element={<ItinerariesList/>}/>
                <Route path='/itineraries/:id' element={<ItineraryPage/>}/>
                <Route path='/create' element={<CreateItinerary/>}/>
                <Route path='/account' element={<Account/>}/>
                <Route path='/'/>
                <Route path='/explore'/>
              </Routes>
            </PrivateRoute>
          }/>
            
          
        </Routes>
      </Router>
    </ParallaxProvider>
    </>
  )
}

export default App
