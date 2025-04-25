
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from '@/components/layout/PageLayout';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in as patient
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'patient') {
      toast({
        title: "Access denied",
        description: "You must be logged in as a patient to view this page.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast]);
  
  // Mock data for prescriptions
  const recentPrescriptions = [
    { 
      id: 1, 
      doctor: "Dr. Sarah Williams", 
      specialization: "Cardiologist",
      date: "2023-04-18", 
      condition: "Hypertension",
      status: "active" 
    },
    { 
      id: 2, 
      doctor: "Dr. Michael Chen", 
      specialization: "General Practitioner",
      date: "2023-03-10", 
      condition: "Upper Respiratory Infection",
      status: "completed" 
    },
    { 
      id: 3, 
      doctor: "Dr. Elizabeth Taylor", 
      specialization: "Endocrinologist",
      date: "2023-02-25", 
      condition: "Hypothyroidism",
      status: "active" 
    }
  ];
  
  // Status badge colors
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium";
      case 'completed':
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium";
      default:
        return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium";
    }
  };
  
  return (
    <PageLayout>
      <div className="medical-container py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
            <p className="text-gray-600">Welcome back, John Smith</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Active Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-medical-primary">2</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Next Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-gray-700">April 30, 2023</p>
              <p className="text-sm text-gray-500">Dr. Sarah Williams</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Recent Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">New prescription on Apr 18</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Prescriptions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-10">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Prescriptions</h2>
            <Link to="/patient/prescriptions">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condition
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPrescriptions.map((prescription) => (
                  <tr key={prescription.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{prescription.doctor}</div>
                      <div className="text-sm text-gray-500">{prescription.specialization}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-600">{prescription.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-600">{prescription.condition}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(prescription.status)}>
                        {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/patient/prescriptions/${prescription.id}`} className="text-medical-primary hover:underline">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Health Tips */}
        <div className="bg-medical-accent p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Health Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium mb-2">Stay Hydrated</h3>
              <p className="text-gray-600 text-sm">
                Remember to drink at least 8 glasses of water daily to maintain proper hydration and support overall health.
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium mb-2">Take Medications Regularly</h3>
              <p className="text-gray-600 text-sm">
                Follow your prescription schedule carefully. Set reminders if needed to ensure you don't miss any doses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PatientDashboard;
