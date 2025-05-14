
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, User, Check, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Sample tour data
const toursData = [
  {
    id: 1,
    title: 'Paris City Tour',
    description: 'Explore the beautiful city of Paris including Eiffel Tower and Louvre Museum.',
    longDescription: 'Experience the magic of Paris with our comprehensive city tour. Walk along the charming streets, visit iconic landmarks such as the Eiffel Tower, Notre-Dame Cathedral, and the Louvre Museum. Enjoy French cuisine at local restaurants and immerse yourself in the rich culture and history of the City of Lights. This tour includes professional guides, accommodation in a central hotel, and all entrance fees to major attractions.',
    price: 199,
    duration: '3 days',
    location: 'France',
    category: 'City',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523496618250-2324a741c1ad?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551634979-2b11f8c946fe?q=80&w=1000&auto=format&fit=crop',
    ],
    highlights: [
      'Visit the iconic Eiffel Tower and enjoy panoramic views of the city',
      'Explore the world-famous Louvre Museum and see the Mona Lisa',
      'Walk along the historic Champs-Elysées and Arc de Triomphe',
      'Enjoy a Seine River cruise to view Paris from the water',
    ],
    included: [
      'Professional English-speaking guide',
      '3-star hotel accommodation',
      'Daily breakfast',
      'Skip-the-line entrance tickets to all attractions',
      'Seine River cruise ticket',
    ],
    groupSize: 15,
    meetingPoint: 'Paris Charles de Gaulle Airport',
    availableDates: [
      new Date(2025, 5, 15),
      new Date(2025, 6, 10),
      new Date(2025, 7, 5),
      new Date(2025, 8, 12),
    ]
  },
  // Additional tour details would be here
];

const TourDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [groupSize, setGroupSize] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const tourId = parseInt(id || '1');
  const tour = toursData.find(t => t.id === tourId);
  
  if (!tour) {
    return <div className="text-center py-16">Tour not found</div>;
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleGroupSizeChange = (value: number[]) => {
    setGroupSize(value[0]);
  };
  
  const handleBookNow = () => {
    if (!selectedDate) {
      toast.error('Please select a date before booking');
      return;
    }
    
    toast.success('Tour booked successfully!', {
      description: `You've booked ${tour.title} for ${selectedDate.toLocaleDateString()} with ${groupSize} people`
    });
  };
  
  const totalPrice = tour.price * groupSize;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Link to="/tours" className="text-primary hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span className="ml-1">Back to Tours</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tour details - left side */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center mr-4">
              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">{tour.location}</span>
            </div>
            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">{tour.duration}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="ml-1 text-sm">{tour.rating}</span>
            </div>
          </div>
          
          {/* Image gallery */}
          <div className="mb-8">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
              <img 
                src={tour.images[currentImageIndex]} 
                alt={`${tour.title} - image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {tour.images.map((image, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer rounded-md overflow-hidden ${currentImageIndex === index ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={image} 
                      alt={`${tour.title} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Tour Description</h2>
            <p className="text-gray-700 mb-4">{tour.longDescription}</p>
          </div>
          
          {/* Highlights */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Tour Highlights</h2>
            <ul className="space-y-2">
              {tour.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* What's included */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">What's Included</h2>
            <ul className="space-y-2">
              {tour.included.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Important info */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Important Information</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Meeting Point</h3>
                      <p className="text-gray-600">{tour.meetingPoint}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Maximum Group Size</h3>
                      <p className="text-gray-600">{tour.groupSize} people</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Booking form - right side */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-primary">${tour.price}</p>
                <p className="text-sm text-gray-500">per person</p>
              </div>
              
              <div className="mb-6">
                <Label htmlFor="date-select" className="mb-2 block font-medium">
                  Select Date
                </Label>
                <div className="space-y-2">
                  {tour.availableDates.map((date, index) => (
                    <div 
                      key={index} 
                      className={`p-3 border rounded-md cursor-pointer ${selectedDate && selectedDate.getTime() === date.getTime() ? 'bg-primary/10 border-primary' : 'hover:bg-gray-50'}`}
                      onClick={() => handleDateSelect(date)}
                    >
                      {date.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <Label htmlFor="group-size" className="mb-2 block font-medium">
                  Number of People: <span className="text-primary">{groupSize}</span>
                </Label>
                <Slider 
                  id="group-size"
                  defaultValue={[1]} 
                  min={1} 
                  max={10}
                  step={1}
                  onValueChange={handleGroupSizeChange}
                  className="my-4" 
                />
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <div className="flex justify-between mb-2">
                  <span>Price per person</span>
                  <span>${tour.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>People</span>
                  <span>× {groupSize}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 mt-2">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleBookNow}
                className="w-full"
                size="lg"
              >
                Book Now
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                No payment required now. You'll pay during the tour.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
