
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from '@/components/layout/PageLayout';
import { X, Plus } from 'lucide-react';

// Mock data for medicine list (in a real app, this would come from an API)
const medicineDatabase = [
  "Amoxicillin 250mg", "Amoxicillin 500mg", "Aspirin 81mg", "Aspirin 325mg", 
  "Atorvastatin 10mg", "Atorvastatin 20mg", "Atorvastatin 40mg", "Atorvastatin 80mg", 
  "Lisinopril 5mg", "Lisinopril 10mg", "Lisinopril 20mg",
  "Metformin 500mg", "Metformin 850mg", "Metformin 1000mg",
  "Simvastatin 10mg", "Simvastatin 20mg", "Simvastatin 40mg",
  "Levothyroxine 25mcg", "Levothyroxine 50mcg", "Levothyroxine 75mcg", 
  "Levothyroxine 100mcg", "Levothyroxine 125mcg",
  "Amlodipine 5mg", "Amlodipine 10mg", 
  "Omeprazole 20mg", "Omeprazole 40mg",
  "Albuterol Inhaler 90mcg", 
  "Gabapentin 100mg", "Gabapentin 300mg", "Gabapentin 600mg", 
  "Hydrochlorothiazide 12.5mg", "Hydrochlorothiazide 25mg",
  "Metoprolol 25mg", "Metoprolol 50mg", "Metoprolol 100mg",
  "Losartan 25mg", "Losartan 50mg", "Losartan 100mg",
  "Sertraline 25mg", "Sertraline 50mg", "Sertraline 100mg",
  "Fluoxetine 10mg", "Fluoxetine 20mg", "Fluoxetine 40mg",
  "Escitalopram 5mg", "Escitalopram 10mg", "Escitalopram 20mg"
];

// Mock patient data (in a real app, this would come from an API)
const patientsList = [
  { id: "p1", name: "John Smith" },
  { id: "p2", name: "Emma Wilson" },
  { id: "p3", name: "Michael Johnson" },
  { id: "p4", name: "Sarah Thompson" },
  { id: "p5", name: "Robert Davis" },
  { id: "p6", name: "Jennifer Garcia" },
  { id: "p7", name: "David Martinez" },
  { id: "p8", name: "Lisa Rodriguez" },
  { id: "p9", name: "James Anderson" },
  { id: "p10", name: "Patricia Thomas" }
];

const NewPrescription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [prescriptionData, setPrescriptionData] = useState({
    patientId: '',
    diseaseDescription: '',
    followUpDate: null as Date | null,
    advice: '',
  });
  
  // Medicines state (multiple medicines can be added)
  const [medicines, setMedicines] = useState([
    { medicine: '', dosage: '', timing: '', instructions: '' }
  ]);
  
  const [medicineSearchQuery, setMedicineSearchQuery] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState<string[]>([]);
  const [showMedicineDropdown, setShowMedicineDropdown] = useState(false);
  const [activeSearchIndex, setActiveSearchIndex] = useState(-1);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in as doctor
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'doctor') {
      toast({
        title: "Access denied",
        description: "You must be logged in as a doctor to write prescriptions.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast]);
  
  // Filter medicines based on search query
  useEffect(() => {
    if (medicineSearchQuery.length > 1 && activeSearchIndex >= 0) {
      const filtered = medicineDatabase.filter(medicine => 
        medicine.toLowerCase().includes(medicineSearchQuery.toLowerCase())
      );
      setFilteredMedicines(filtered);
      setShowMedicineDropdown(filtered.length > 0);
    } else {
      setShowMedicineDropdown(false);
    }
  }, [medicineSearchQuery, activeSearchIndex]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPrescriptionData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setPrescriptionData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDateChange = (date: Date | undefined) => {
    setPrescriptionData(prev => ({ ...prev, followUpDate: date || null }));
  };
  
  const handleMedicineChange = (index: number, field: string, value: string) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index] = { ...updatedMedicines[index], [field]: value };
    setMedicines(updatedMedicines);
    
    if (field === 'medicine') {
      setMedicineSearchQuery(value);
      setActiveSearchIndex(index);
    }
  };
  
  const handleMedicineSelect = (index: number, medicine: string) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index] = { ...updatedMedicines[index], medicine };
    setMedicines(updatedMedicines);
    setShowMedicineDropdown(false);
    setMedicineSearchQuery('');
  };
  
  const addMedicineField = () => {
    setMedicines([...medicines, { medicine: '', dosage: '', timing: '', instructions: '' }]);
  };
  
  const removeMedicineField = (index: number) => {
    if (medicines.length > 1) {
      const updatedMedicines = medicines.filter((_, i) => i !== index);
      setMedicines(updatedMedicines);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!prescriptionData.patientId) {
      toast({
        title: "Error",
        description: "Please select a patient.",
        variant: "destructive",
      });
      return;
    }
    
    if (!prescriptionData.diseaseDescription) {
      toast({
        title: "Error",
        description: "Please enter a disease description.",
        variant: "destructive",
      });
      return;
    }
    
    if (medicines.some(m => !m.medicine || !m.dosage || !m.timing)) {
      toast({
        title: "Error",
        description: "Please complete all medicine fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Here you would typically call an API to save the prescription
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Prescription has been created successfully.",
      });
      
      navigate('/doctor/dashboard');
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <PageLayout>
      <div className="medical-container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Prescription</h1>
          <p className="text-gray-600">Fill out the form below to write a prescription for a patient.</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Card className="p-6">
            {/* Patient Selection */}
            <div className="mb-6">
              <Label htmlFor="patientId" className="text-lg font-medium">Patient Information</Label>
              <div className="mt-2">
                <Select 
                  value={prescriptionData.patientId} 
                  onValueChange={(value) => handleSelectChange('patientId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patientsList.map(patient => (
                      <SelectItem key={patient.id} value={patient.id}>{patient.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Disease Description */}
            <div className="mb-6">
              <Label htmlFor="diseaseDescription" className="text-lg font-medium">Diagnosis / Disease Description</Label>
              <div className="mt-2">
                <Textarea
                  id="diseaseDescription"
                  name="diseaseDescription"
                  value={prescriptionData.diseaseDescription}
                  onChange={handleInputChange}
                  placeholder="Enter diagnosis or disease description"
                  className="h-24"
                  required
                />
              </div>
            </div>
            
            {/* Medicines Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <Label className="text-lg font-medium">Medicines</Label>
                <Button 
                  type="button" 
                  onClick={addMedicineField} 
                  variant="outline" 
                  size="sm"
                  className="flex items-center text-medical-primary border-medical-primary"
                >
                  <Plus className="mr-1" size={16} /> Add Medicine
                </Button>
              </div>
              
              {medicines.map((medicine, index) => (
                <div 
                  key={index} 
                  className="p-4 mb-4 border border-gray-200 rounded-md bg-gray-50 relative"
                >
                  {medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMedicineField(index)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                      <X size={16} />
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <Label htmlFor={`medicine-${index}`} className="block mb-1">Medicine Name</Label>
                      <div className="relative">
                        <Input
                          id={`medicine-${index}`}
                          value={medicine.medicine}
                          onChange={(e) => handleMedicineChange(index, 'medicine', e.target.value)}
                          onFocus={() => {
                            setActiveSearchIndex(index);
                            if (medicine.medicine.length > 1) {
                              setMedicineSearchQuery(medicine.medicine);
                            }
                          }}
                          placeholder="Search for medicine"
                          required
                        />
                        
                        {showMedicineDropdown && activeSearchIndex === index && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {filteredMedicines.map((med, i) => (
                              <div
                                key={i}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleMedicineSelect(index, med)}
                              >
                                {med}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`dosage-${index}`} className="block mb-1">Dosage</Label>
                      <Select 
                        value={medicine.dosage}
                        onValueChange={(value) => handleMedicineChange(index, 'dosage', value)}
                      >
                        <SelectTrigger id={`dosage-${index}`}>
                          <SelectValue placeholder="Select dosage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Once daily</SelectItem>
                          <SelectItem value="2">Twice daily</SelectItem>
                          <SelectItem value="3">Three times daily</SelectItem>
                          <SelectItem value="4">Four times daily</SelectItem>
                          <SelectItem value="sos">When required (SOS)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`timing-${index}`} className="block mb-1">When to Take</Label>
                      <Select 
                        value={medicine.timing}
                        onValueChange={(value) => handleMedicineChange(index, 'timing', value)}
                      >
                        <SelectTrigger id={`timing-${index}`}>
                          <SelectValue placeholder="Select timing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="before_meal">Before meals</SelectItem>
                          <SelectItem value="after_meal">After meals</SelectItem>
                          <SelectItem value="with_meal">With meals</SelectItem>
                          <SelectItem value="empty_stomach">On empty stomach</SelectItem>
                          <SelectItem value="bedtime">At bedtime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor={`instructions-${index}`} className="block mb-1">Special Instructions (Optional)</Label>
                      <Input
                        id={`instructions-${index}`}
                        value={medicine.instructions}
                        onChange={(e) => handleMedicineChange(index, 'instructions', e.target.value)}
                        placeholder="Any special instructions"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Follow-up Date */}
            <div className="mb-6">
              <Label htmlFor="followUpDate" className="text-lg font-medium mb-2 block">Follow-up Date (Optional)</Label>
              <DatePicker
                selected={prescriptionData.followUpDate}
                onSelect={handleDateChange}
                disabled={(date) => date < new Date()}
              />
            </div>
            
            {/* Advice/Notes */}
            <div className="mb-6">
              <Label htmlFor="advice" className="text-lg font-medium">Additional Advice / Notes</Label>
              <div className="mt-2">
                <Textarea
                  id="advice"
                  name="advice"
                  value={prescriptionData.advice}
                  onChange={handleInputChange}
                  placeholder="Enter any additional advice or notes for the patient"
                  className="h-24"
                />
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/doctor/dashboard')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-medical-primary hover:bg-medical-secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Create Prescription'}
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </PageLayout>
  );
};

export default NewPrescription;
