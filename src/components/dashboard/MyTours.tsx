
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Plus } from 'lucide-react';
import { toast } from 'sonner';

// Sample tours data for agency/guide
const tours = [
  {
    id: 1,
    title: 'Paris City Tour',
    description: 'Explore the beautiful city of Paris including Eiffel Tower and Louvre Museum.',
    price: 199,
    duration: '3 days',
    location: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop',
    status: 'Active',
    bookings: 12
  },
  {
    id: 2,
    title: 'Tokyo Adventure',
    description: 'Discover the vibrant culture and modern attractions of Tokyo.',
    price: 299,
    duration: '5 days',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop',
    status: 'Active',
    bookings: 8
  },
  {
    id: 3,
    title: 'Bali Beach Retreat',
    description: 'Relax on beautiful beaches and explore Balinese culture.',
    price: 349,
    duration: '6 days',
    location: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop',
    status: 'Draft',
    bookings: 0
  }
];

const MyTours = () => {
  const [toursList, setToursList] = useState(tours);
  
  const handleDeleteTour = (id: number) => {
    setToursList(toursList.filter(tour => tour.id !== id));
    toast.success("Tour deleted successfully", {
      description: "The tour has been removed from your listings"
    });
  };
  
  const handleEditTour = (id: number) => {
    toast.info("Edit functionality", {
      description: "In a real application, this would open a tour edit form"
    });
  };
  
  const handleAddTour = () => {
    toast.info("Add functionality", {
      description: "In a real application, this would open a new tour creation form"
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tours</h1>
        <Button onClick={handleAddTour} className="flex items-center">
          <Plus className="h-4 w-4 mr-1" />
          Add New Tour
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Tours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {toursList.map((tour) => (
              <div key={tour.id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden">
                <div className="w-full md:w-1/4 h-40 md:h-auto">
                  <img 
                    src={tour.image} 
                    alt={tour.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <h3 className="text-lg font-bold mb-1 md:mb-0">{tour.title}</h3>
                    <Badge className={tour.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}>
                      {tour.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{tour.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm mb-4">
                    <div>
                      <span className="font-medium">Price:</span> ${tour.price}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {tour.duration}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {tour.location}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Current Bookings:</span> {tour.bookings}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditTour(tour.id)}
                      className="flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit Tour
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteTour(tour.id)}
                      className="flex items-center"
                    >
                      <Trash className="h-4 w-4 mr-1" /> Delete
                    </Button>
                    {tour.status === 'Active' && (
                      <Button size="sm">Manage Bookings</Button>
                    )}
                    {tour.status === 'Draft' && (
                      <Button size="sm">Publish</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {toursList.length === 0 && (
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold mb-2">No tours found</h3>
                <p className="text-gray-500 mb-4">You haven't created any tours yet.</p>
                <Button onClick={handleAddTour}>Add Your First Tour</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyTours;
