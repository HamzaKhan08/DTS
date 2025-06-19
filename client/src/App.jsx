import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Document from './pages/Document';
import Report from './pages/Report';
import Settings from './pages/Setting';
import TrackingPage from './pages/TrackingPage';
import { ThemeProvider } from './context/ThemeProvider';
import Footer from './components/Footer';
import Features from './pages/features';
import Documentation from './pages/Documentations';
import Pricing from './pages/Pricing';
import API from './pages/API';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import Blog from './pages/Blogs';
import Contact from './pages/Contact';
import HelpCenter from './pages/HelpCenter';
import Security from './pages/Security';
import TermsOfService from './pages/Termsofservice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Cookies from './pages/Cookies';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 font-['Inter'] flex flex-col">
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex-grow">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/documents" element={<ProtectedRoute><Document /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute><Report /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/tracking" element={<ProtectedRoute><TrackingPage /></ProtectedRoute>} />
                <Route path='/features' element={<ProtectedRoute><Features /></ProtectedRoute>} />
                <Route path='/documentations' element={<ProtectedRoute><Documentation /></ProtectedRoute>} />
                <Route path='/pricing' element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
                <Route path='api' element={<ProtectedRoute><API /></ProtectedRoute>} />
                <Route path='about-us' element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
                <Route path='careers' element={<ProtectedRoute><Careers /></ProtectedRoute>} />
                <Route path='blog' element={<ProtectedRoute><Blog /></ProtectedRoute>} />
                <Route path='contact' element={<ProtectedRoute><Contact /></ProtectedRoute>} />
                <Route path='help' element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />
                <Route path='security' element={<ProtectedRoute><Security /></ProtectedRoute>} />
                <Route path='terms' element={<ProtectedRoute><TermsOfService /></ProtectedRoute>} />
                <Route path='privacy' element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
                <Route path='cookies' element={<ProtectedRoute><Cookies /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;