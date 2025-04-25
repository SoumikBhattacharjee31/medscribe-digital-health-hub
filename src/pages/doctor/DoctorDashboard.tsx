
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from '@/components/layout/PageLayout';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in as doctor
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'doctor') {
      toast({
        title: "Access denied",
        description: "You must be logged in as a doctor to view this page.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast]);
  
  // Mock data for dashboard stats
  const stats = [
    { title: "Total Patients", value: "54" },
    { title: "Prescriptions Written", value: "127" },
    { title: "Recent Patients", value: "12" },
    { title: "Follow-ups Due", value: "3" },
  ];
  
  // Mock data for recent prescriptions
  const recentPrescriptions = [
    { id: 1, patient: "John Smith", date: "2023-04-21", condition: "Bronchitis" },
    { id: 2, patient: "Emma Wilson", date: "2023-04-20", condition: "Hypertension" },
    { id: 3, patient: "Robert Johnson", date: "2023-04-19", condition: "Diabetes Type 2" },
  ];
  
  return (
    <PageLayout>
      <div className="medical-container py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
            <p className="text-gray-600">Welcome back, Doctor</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/doctor/new-prescription">
              <Button className="bg-medical-primary hover:bg-medical-secondary">
                Write New Prescription
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium text-gray-700">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-medical-primary">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Recent Prescriptions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold">Recent Prescriptions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condition
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
                      <div className="font-medium text-gray-900">{prescription.patient}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-600">{prescription.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-600">{prescription.condition}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/doctor/prescriptions/${prescription.id}`} className="text-medical-primary hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50 text-right">
            <Link to="/doctor/prescriptions" className="text-medical-primary hover:underline text-sm">
              View All Prescriptions
            </Link>
          </div>
        </div>
        
        {/* Upcoming Follow-ups Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Upcoming Follow-ups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Robert Johnson</CardTitle>
                <CardDescription>Diabetes Follow-up</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  <strong>Date:</strong> April 25, 2023
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Notes:</strong> Check blood sugar levels and medication efficacy
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reschedule</Button>
                <Button className="bg-medical-primary hover:bg-medical-secondary">Prepare Notes</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Emma Wilson</CardTitle>
                <CardDescription>Blood Pressure Check</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  <strong>Date:</strong> April 27, 2023
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Notes:</strong> Monitor blood pressure and potential medication adjustment
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reschedule</Button>
                <Button className="bg-medical-primary hover:bg-medical-secondary">Prepare Notes</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sarah Thompson</CardTitle>
                <CardDescription>Post-Surgery Check</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  <strong>Date:</strong> April 30, 2023
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Notes:</strong> Evaluate recovery progress and wound healing
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reschedule</Button>
                <Button className="bg-medical-primary hover:bg-medical-secondary">Prepare Notes</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DoctorDashboard;
