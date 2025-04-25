
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from '@/components/layout/PageLayout';

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    // Doctor specific fields
    specialization: '',
    phoneNumber: '',
    // Patient specific fields
    age: '',
    gender: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Here you would typically call an API to register the user
    setTimeout(() => {
      // Store role in localStorage for demo purposes
      localStorage.setItem('userRole', formData.role);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created!",
      });
      
      // Redirect based on user role
      if (formData.role === 'doctor') {
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
            <h1 className="text-3xl font-bold">Create Your Account</h1>
            <p className="text-gray-600 mt-2">Join MedScribe to manage prescriptions digitally</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Label htmlFor="role" className="block font-medium mb-2">
                  I am a:
                </Label>
                <RadioGroup 
                  id="role" 
                  value={formData.role} 
                  onValueChange={(value) => handleSelectChange('role', value)} 
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
                <Label htmlFor="name" className="block font-medium mb-1">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="email" className="block font-medium mb-1">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              {/* Role-specific fields */}
              {formData.role === 'doctor' ? (
                <>
                  <div className="mb-4">
                    <Label htmlFor="specialization" className="block font-medium mb-1">
                      Specialization
                    </Label>
                    <Select 
                      value={formData.specialization} 
                      onValueChange={(value) => handleSelectChange('specialization', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Practitioner</SelectItem>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="gynecology">Gynecology</SelectItem>
                        <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                        <SelectItem value="urology">Urology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="phoneNumber" className="block font-medium mb-1">
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <Label htmlFor="age" className="block font-medium mb-1">
                      Age
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Enter your age"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="gender" className="block font-medium mb-1">
                      Gender
                    </Label>
                    <Select 
                      value={formData.gender} 
                      onValueChange={(value) => handleSelectChange('gender', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              
              <div className="mb-4">
                <Label htmlFor="password" className="block font-medium mb-1">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </div>
              
              <div className="mb-6">
                <Label htmlFor="confirmPassword" className="block font-medium mb-1">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-medical-primary hover:bg-medical-secondary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-medical-primary hover:underline">
                    Log In
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

export default SignUp;
