
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from '@/components/layout/PageLayout';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would typically call an API to authenticate the user
    setTimeout(() => {
      // For demo purposes, we're just storing the role in localStorage
      // In a real application, you would validate credentials and get user data from backend
      localStorage.setItem('userRole', role);
      
      toast({
        title: "Login successful",
        description: "Redirecting you to your dashboard...",
      });
      
      // Redirect based on user role
      if (role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <PageLayout>
      <div className="medical-container py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Log in to access your account</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Label htmlFor="role" className="block font-medium mb-2">
                  I am a:
                </Label>
                <RadioGroup 
                  id="role" 
                  value={role} 
                  onValueChange={setRole} 
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="doctor" id="doctor" />
                    <Label htmlFor="doctor">Doctor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="patient" id="patient" />
                    <Label htmlFor="patient">Patient</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="email" className="block font-medium mb-1">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="password" className="block font-medium">
                    Password
                  </Label>
                  <Link to="/forgot-password" className="text-sm text-medical-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-medical-primary hover:bg-medical-secondary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-medical-primary hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
