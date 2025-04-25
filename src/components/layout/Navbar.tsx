
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This would be replaced with actual auth state
  const isDoctor = localStorage.getItem('userRole') === 'doctor';
  const isPatient = localStorage.getItem('userRole') === 'patient';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="medical-container">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-medical-secondary font-bold text-2xl">Med</span>
              <span className="text-medical-primary font-bold text-2xl">Scribe</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-medical-primary px-3 py-2 rounded-md">
              Home
            </Link>
            
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="ml-2">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-medical-primary hover:bg-medical-secondary">Sign up</Button>
                </Link>
              </>
            ) : isDoctor ? (
              <>
                <Link to="/doctor/dashboard" className="text-gray-700 hover:text-medical-primary px-3 py-2 rounded-md">
                  Dashboard
                </Link>
                <Link to="/doctor/prescriptions" className="text-gray-700 hover:text-medical-primary px-3 py-2 rounded-md">
                  Prescriptions
                </Link>
                <Link to="/doctor/profile" className="text-gray-700 hover:text-medical-primary px-3 py-2 rounded-md">
                  Profile
                </Link>
                <Button 
                  variant="outline" 
                  className="ml-2"
                  onClick={() => {
                    localStorage.removeItem('userRole');
                    setIsLoggedIn(false);
                    // In real app, you'd call your auth logout function
                  }}
                >
                  Logout
                </Button>
              </>
            ) : isPatient ? (
              <>
                <Link to="/patient/dashboard" className="text-gray-700 hover:text-medical-primary px-3 py-2 rounded-md">
                  Dashboard
                </Link>
                <Link to="/patient/prescriptions" className="text-gray-700 hover:text-medical-primary px-3 py-2 rounded-md">
                  Prescriptions
                </Link>
                <Link to="/patient/profile" className="text-gray-700 hover:text-medical-primary px-3 py-2 rounded-md">
                  Profile
                </Link>
                <Button 
                  variant="outline" 
                  className="ml-2"
                  onClick={() => {
                    localStorage.removeItem('userRole');
                    setIsLoggedIn(false);
                    // In real app, you'd call your auth logout function
                  }}
                >
                  Logout
                </Button>
              </>
            ) : null}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-medical-primary">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-2 pb-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {!isLoggedIn ? (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link 
                    to="/signup" 
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              ) : isDoctor ? (
                <>
                  <Link 
                    to="/doctor/dashboard" 
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/doctor/prescriptions" 
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Prescriptions
                  </Link>
                  <Link 
                    to="/doctor/profile" 
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    className="text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                    onClick={() => {
                      localStorage.removeItem('userRole');
                      setIsLoggedIn(false);
                      setIsMenuOpen(false);
                      // In real app, you'd call your auth logout function
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : isPatient ? (
                <>
                  <Link 
                    to="/patient/dashboard" 
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/patient/prescriptions" 
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Prescriptions
                  </Link>
                  <Link 
                    to="/patient/profile" 
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    className="text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                    onClick={() => {
                      localStorage.removeItem('userRole');
                      setIsLoggedIn(false);
                      setIsMenuOpen(false);
                      // In real app, you'd call your auth logout function
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
