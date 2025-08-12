// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import RSVP from './pages/RSVP';
import MyEvents from './pages/MyEvents';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/rsvp/:eventId" element={<RSVP />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
