
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const DashboardOverview = () => {
  // In a real application, this data would come from a backend API
  const upcomingBookings = 2;
  const completedTours = 5;
  const savedTours = 3;
  const notifications = 2;
  const username = "John Doe";
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <CardHeader>
            <CardTitle>Welcome back, {username}!</CardTitle>
            <CardDescription className="text-blue-100">
              Here's a summary of your tourism activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Ready to explore more destinations? Check out our latest tours or manage your existing bookings.</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{upcomingBookings}</p>
            <p className="text-sm text-muted-foreground">Tours booked</p>
            <Link to="/dashboard/bookings" className="text-primary text-sm block mt-2 hover:underline">
              View bookings →
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completed Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{completedTours}</p>
            <p className="text-sm text-muted-foreground">Tours completed</p>
            <Link to="/dashboard/bookings" className="text-primary text-sm block mt-2 hover:underline">
              View history →
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Saved Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{savedTours}</p>
            <p className="text-sm text-muted-foreground">Tours saved for later</p>
            <Link to="/tours" className="text-primary text-sm block mt-2 hover:underline">
              Browse tours →
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{notifications}</p>
            <p className="text-sm text-muted-foreground">Unread notifications</p>
            <button className="text-primary text-sm block mt-2 hover:underline">
              View all →
            </button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium">Paris City Tour</h4>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Upcoming</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">June 15, 2025 • 3 days</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">$199</span>
                  <Link to="/dashboard/bookings" className="text-primary text-sm hover:underline">
                    View details
                  </Link>
                </div>
              </div>
              
              <div className="border-b pb-3">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium">Bali Beach Retreat</h4>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded">Confirmed</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">July 10, 2025 • 6 days</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">$349</span>
                  <Link to="/dashboard/bookings" className="text-primary text-sm hover:underline">
                    View details
                  </Link>
                </div>
              </div>
              
              <div>
                <Link to="/dashboard/bookings" className="text-primary text-sm hover:underline">
                  View all bookings →
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommended Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop" 
                      alt="Greek Islands" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Greek Islands Tour</h4>
                    <p className="text-sm text-gray-600 mb-1">10 days • Greece</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">$449</span>
                      <Link to="/tours/6" className="text-primary text-sm hover:underline">
                        View details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-b pb-3">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop" 
                      alt="Machu Picchu" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Machu Picchu Expedition</h4>
                    <p className="text-sm text-gray-600 mb-1">8 days • Peru</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">$599</span>
                      <Link to="/tours/5" className="text-primary text-sm hover:underline">
                        View details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Link to="/tours" className="text-primary text-sm hover:underline">
                  Browse all tours →
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
