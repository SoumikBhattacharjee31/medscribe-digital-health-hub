
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from '@/components/layout/PageLayout';
import { Search } from 'lucide-react';

// Mock prescription data (in a real app, this would be fetched from an API)
const prescriptionsData = [
  { 
    id: "1", 
    doctor: "Dr. Sarah Williams", 
    specialization: "Cardiologist",
    date: "2023-04-18", 
    condition: "Hypertension",
    status: "active",
    medicines: ["Lisinopril 10mg", "Hydrochlorothiazide 12.5mg"]
  },
  { 
    id: "2", 
    doctor: "Dr. Michael Chen", 
    specialization: "General Practitioner",
    date: "2023-03-10", 
    condition: "Upper Respiratory Infection",
    status: "completed",
    medicines: ["Amoxicillin 500mg", "Guaifenesin 400mg"]
  },
  { 
    id: "3", 
    doctor: "Dr. Elizabeth Taylor", 
    specialization: "Endocrinologist",
    date: "2023-02-25", 
    condition: "Hypothyroidism",
    status: "active",
    medicines: ["Levothyroxine 50mcg"]
  },
  { 
    id: "4", 
    doctor: "Dr. Robert Johnson", 
    specialization: "Pulmonologist",
    date: "2023-01-15", 
    condition: "Bronchitis",
    status: "completed",
    medicines: ["Azithromycin 250mg", "Albuterol Inhaler"]
  },
  { 
    id: "5", 
    doctor: "Dr. Jennifer Lopez", 
    specialization: "Dermatologist",
    date: "2022-12-05", 
    condition: "Eczema",
    status: "completed",
    medicines: ["Hydrocortisone 1% Cream", "Cetirizine 10mg"]
  }
];

const Prescriptions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [prescriptions, setPrescriptions] = useState(prescriptionsData);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Check if user is logged in as patient
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'patient') {
      toast({
        title: "Access denied",
        description: "You must be logged in as a patient to view prescriptions.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast]);
  
  // Filter prescriptions based on status and search term
  useEffect(() => {
    let filtered = prescriptionsData;
    
    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(p => p.status === filterStatus);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.doctor.toLowerCase().includes(term) || 
        p.condition.toLowerCase().includes(term) ||
        p.medicines.some(m => m.toLowerCase().includes(term))
      );
    }
    
    setPrescriptions(filtered);
  }, [filterStatus, searchTerm]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled in the useEffect
  };
  
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Prescriptions</h1>
          <p className="text-gray-600">View and manage all your prescriptions</p>
        </div>
        
        {/* Filters and Search */}
        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="w-full md:w-48">
            <Select 
              value={filterStatus} 
              onValueChange={setFilterStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prescriptions</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <form onSubmit={handleSearch} className="w-full md:w-80 relative">
            <Input
              type="text"
              placeholder="Search by doctor, condition, or medicine"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </form>
        </div>
        
        {/* Prescriptions List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
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
                    Medicine
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {prescriptions.length > 0 ? (
                  prescriptions.map((prescription) => (
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
                      <td className="px-6 py-4">
                        <div className="text-gray-600 text-sm">
                          {prescription.medicines.slice(0, 2).map((med, i) => (
                            <div key={i}>{med}</div>
                          ))}
                          {prescription.medicines.length > 2 && (
                            <div className="text-gray-400">+{prescription.medicines.length - 2} more</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/patient/prescriptions/${prescription.id}`} className="text-medical-primary hover:underline">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No prescriptions found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Prescriptions;
