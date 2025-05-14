
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// Sample tour data
const toursData = [
  { id: 1, title: 'Paris City Tour', availableDates: ['2025-06-15', '2025-07-10', '2025-08-05'] },
  { id: 2, title: 'Tokyo Adventure', availableDates: ['2025-06-20', '2025-07-15', '2025-08-10'] },
  { id: 3, title: 'African Safari', availableDates: ['2025-07-05', '2025-08-15', '2025-09-10'] },
  { id: 4, title: 'Bali Beach Retreat', availableDates: ['2025-06-10', '2025-07-20', '2025-08-25'] },
  { id: 5, title: 'Machu Picchu Expedition', availableDates: ['2025-07-10', '2025-08-20', '2025-09-15'] },
  { id: 6, title: 'Greek Islands Tour', availableDates: ['2025-06-25', '2025-07-30', '2025-09-05'] }
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  tourId: string;
  date: string;
  participants: string;
  specialRequests: string;
}

const BookTour = () => {
  const [searchParams] = useSearchParams();
  const preselectedTourId = searchParams.get('tour');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    tourId: preselectedTourId || '',
    date: '',
    participants: '1',
    specialRequests: ''
  });

  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set available dates when tour is selected
  useEffect(() => {
    if (formData.tourId) {
      const selectedTour = toursData.find(tour => tour.id.toString() === formData.tourId);
      setAvailableDates(selectedTour?.availableDates || []);
    } else {
      setAvailableDates([]);
    }
  }, [formData.tourId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Booking submitted successfully!', {
        description: 'You will receive a confirmation email shortly.'
      });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto my-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl text-primary">Booking Confirmed!</CardTitle>
            <CardDescription className="text-center">Thank you for booking with us</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mx-auto mb-4">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h3 className="text-xl font-semibold mb-2">Your tour has been booked!</h3>
              <p className="text-gray-600">A confirmation email has been sent to {formData.email}</p>
            </div>
            <Separator className="my-4" />
            <div className="text-left">
              <h4 className="font-semibold mb-2">Booking Details:</h4>
              <p><span className="font-medium">Tour:</span> {toursData.find(t => t.id.toString() === formData.tourId)?.title}</p>
              <p><span className="font-medium">Date:</span> {formData.date}</p>
              <p><span className="font-medium">Number of Participants:</span> {formData.participants}</p>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                tourId: '',
                date: '',
                participants: '1',
                specialRequests: ''
              });
            }}>
              Book Another Tour
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Book a Tour</h1>
      <p className="text-gray-500 mb-8">Fill out the form below to book your dream vacation</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
          <CardDescription>Please provide your information to complete the booking</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Enter your full name" 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="your.email@example.com" 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="Enter your phone number" 
                    required 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="tourId">Select Tour</Label>
                <Select 
                  value={formData.tourId} 
                  onValueChange={(value) => handleSelectChange('tourId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tour package" />
                  </SelectTrigger>
                  <SelectContent>
                    {toursData.map(tour => (
                      <SelectItem key={tour.id} value={tour.id.toString()}>{tour.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Select 
                    value={formData.date} 
                    onValueChange={(value) => handleSelectChange('date', value)}
                    disabled={!formData.tourId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={!formData.tourId ? "Select a tour first" : "Select a date"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDates.map(date => (
                        <SelectItem key={date} value={date}>{date}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="participants">Number of Participants</Label>
                  <Select 
                    value={formData.participants} 
                    onValueChange={(value) => handleSelectChange('participants', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of participants" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                <Input 
                  id="specialRequests" 
                  name="specialRequests" 
                  value={formData.specialRequests} 
                  onChange={handleChange} 
                  placeholder="Any special requirements or requests" 
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Book Now'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookTour;
