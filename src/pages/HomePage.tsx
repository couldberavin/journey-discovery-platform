
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Sample featured tour data
const featuredTours = [
  {
    id: 1,
    title: 'Paris City Tour',
    description: 'Explore the beautiful city of Paris including Eiffel Tower and Louvre Museum.',
    price: 199,
    duration: '3 days',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Tokyo Adventure',
    description: 'Discover the vibrant culture and modern attractions of Tokyo.',
    price: 299,
    duration: '5 days',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'African Safari',
    description: 'Experience wildlife up close in the stunning savannahs of Kenya.',
    price: 499,
    duration: '7 days',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop'
  }
];

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-24 mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1000&auto=format&fit=crop")' }}
        ></div>
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Amazing Places</h1>
          <p className="text-xl md:text-2xl mb-8">Explore top destinations with our premium tour packages</p>
          <div className="flex justify-center">
            <Link 
              to="/tours" 
              className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition duration-300 font-medium"
            >
              Browse Tours
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Tours Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Featured Tours</h2>
          <p className="text-center text-gray-500 mb-8">Handpicked destinations for your next adventure</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map(tour => (
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
                  <CardDescription>${tour.price} | {tour.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{tour.description}</p>
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
          
          <div className="text-center mt-10">
            <Link 
              to="/tours" 
              className="text-primary hover:underline font-medium"
            >
              View All Tours →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-2">Why Choose Us</h2>
          <p className="text-center text-gray-500 mb-12">We offer the best travel experience for our customers</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Handpicked Destinations</h3>
              <p className="text-gray-600">We carefully select the best destinations for an unforgettable experience.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
              <p className="text-gray-600">Our professional guides ensure top-notch service throughout your journey.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 2v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="M20 12h2" />
                  <path d="m19.07 4.93-1.41 1.41" />
                  <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
                  <path d="M13 18H7a2 2 0 0 1-2-2v-1.5a2 2 0 0 1 2-2h3.5" />
                  <path d="M16 18h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-4 0v1a2 2 0 0 0 1 2Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">We offer competitive prices with no hidden costs for all our tours.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="max-w-5xl mx-auto text-center mb-16 px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied travelers who have experienced our tours. Register now and start planning your dream vacation!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/register" 
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition duration-300 font-medium"
          >
            Sign Up Now
          </Link>
          <Link 
            to="/tours" 
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition duration-300 font-medium"
          >
            Explore Tours
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
