import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Details from './pages/Details';
import Auth from './pages/Auth';
import Profile from './pages/profile';
import Result from './pages/Result';
import Search from './pages/search';

const App: React.FC = () => {


  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen ">
          <Navbar />
          <br />
          
          <br />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details" element={<Details />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/Result" element={<Result/>} />
              <Route path="/search" element={<Search/>} />
            </Routes>
          </div>
         
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


