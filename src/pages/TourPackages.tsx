
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Sample tour data
const toursData = [
  {
    id: 1,
    title: 'Paris City Tour',
    description: 'Explore the beautiful city of Paris including Eiffel Tower and Louvre Museum.',
    price: 199,
    duration: '3 days',
    location: 'France',
    category: 'City',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Tokyo Adventure',
    description: 'Discover the vibrant culture and modern attractions of Tokyo.',
    price: 299,
    duration: '5 days',
    location: 'Japan',
    category: 'City',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'African Safari',
    description: 'Experience wildlife up close in the stunning savannahs of Kenya.',
    price: 499,
    duration: '7 days',
    location: 'Kenya',
    category: 'Adventure',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Bali Beach Retreat',
    description: 'Relax on beautiful beaches and explore Balinese culture.',
    price: 349,
    duration: '6 days',
    location: 'Indonesia',
    category: 'Beach',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Machu Picchu Expedition',
    description: 'Trek the Inca Trail and visit the ancient ruins of Machu Picchu.',
    price: 599,
    duration: '8 days',
    location: 'Peru',
    category: 'Adventure',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Greek Islands Tour',
    description: 'Island hop through the beautiful Greek islands of Santorini and Mykonos.',
    price: 449,
    duration: '10 days',
    location: 'Greece',
    category: 'Beach',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop'
  }
];

const TourPackages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Filter tours based on search term and selected categories
  const filteredTours = toursData.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(tour.category);
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories
  const categories = Array.from(new Set(toursData.map(tour => tour.category)));
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Tour Packages</h1>
      <p className="text-gray-500 mb-8">Explore our wide range of tour packages for your next adventure</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar with filters */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="font-bold text-lg mb-4">Search</h2>
            <Input 
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            
            <h2 className="font-bold text-lg mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category} className="flex items-center">
                  <Checkbox 
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label 
                    htmlFor={`category-${category}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tour listings */}
        <div className="lg:col-span-3">
          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTours.map(tour => (
                <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition duration-300">
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={tour.image} 
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                  <CardHeader>
                    <CardTitle>{tour.title}</CardTitle>
                    <CardDescription>
                      <div className="flex justify-between">
                        <span>${tour.price}</span>
                        <span>{tour.duration}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{tour.description}</p>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="ml-1 text-sm">{tour.rating}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link 
                      to={`/tours/${tour.id}`} 
                      className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition text-center"
                    >
                      View Details
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">No tours found</h3>
              <p className="text-gray-500">Try changing your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourPackages;
