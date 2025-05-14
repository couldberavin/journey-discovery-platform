
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the dashboard
const bookingsData = [
  { id: 1, customerName: 'John Smith', tour: 'Paris City Tour', date: '2025-06-15', participants: 2, status: 'Confirmed', totalAmount: 398 },
  { id: 2, customerName: 'Sarah Johnson', tour: 'Tokyo Adventure', date: '2025-06-20', participants: 3, status: 'Pending', totalAmount: 897 },
  { id: 3, customerName: 'Michael Chen', tour: 'African Safari', date: '2025-07-05', participants: 2, status: 'Confirmed', totalAmount: 998 },
  { id: 4, customerName: 'Emily Davis', tour: 'Bali Beach Retreat', date: '2025-06-10', participants: 4, status: 'Confirmed', totalAmount: 1396 },
  { id: 5, customerName: 'Alex Rodriguez', tour: 'Greek Islands Tour', date: '2025-06-25', participants: 2, status: 'Pending', totalAmount: 898 }
];

const feedbackData = [
  { id: 1, customerName: 'John Smith', tour: 'Paris City Tour', date: '2025-04-15', rating: 5, comment: 'Amazing experience! The Eiffel Tower visit was the highlight of our trip.' },
  { id: 2, customerName: 'Sarah Johnson', tour: 'Tokyo Adventure', date: '2025-04-10', rating: 4, comment: 'Great tour with lots of interesting cultural insights.' },
  { id: 3, customerName: 'Michael Chen', tour: 'African Safari', date: '2025-04-05', rating: 5, comment: 'Absolutely stunning! We saw all the Big Five animals.' }
];

const tourStatistics = [
  { name: 'Paris City Tour', bookings: 15 },
  { name: 'Tokyo Adventure', bookings: 12 },
  { name: 'African Safari', bookings: 9 },
  { name: 'Bali Beach Retreat', bookings: 8 },
  { name: 'Machu Picchu Expedition', bookings: 6 },
  { name: 'Greek Islands Tour', bookings: 10 }
];

const monthlyBookings = [
  { name: 'Jan', bookings: 5, revenue: 2495 },
  { name: 'Feb', bookings: 8, revenue: 3992 },
  { name: 'Mar', bookings: 12, revenue: 5988 },
  { name: 'Apr', bookings: 15, revenue: 7485 },
  { name: 'May', bookings: 18, revenue: 8982 }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const totalBookings = bookingsData.length;
  const confirmedBookings = bookingsData.filter(booking => booking.status === 'Confirmed').length;
  const pendingBookings = bookingsData.filter(booking => booking.status === 'Pending').length;
  const totalRevenue = bookingsData.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const averageRating = feedbackData.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbackData.length;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">Manage your tours, bookings, and view statistics</p>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Bookings</CardDescription>
                <CardTitle className="text-3xl">{totalBookings}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Confirmed Bookings</CardDescription>
                <CardTitle className="text-3xl">{confirmedBookings}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pending Bookings</CardDescription>
                <CardTitle className="text-3xl">{pendingBookings}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Revenue</CardDescription>
                <CardTitle className="text-3xl">${totalRevenue}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Monthly Bookings Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Bookings</CardTitle>
                <CardDescription>Booking trends over the past months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyBookings}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#9b87f5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Tour Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Tour Popularity</CardTitle>
                <CardDescription>Number of bookings per tour</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={tourStatistics}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={80} />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#7E69AB" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest bookings from customers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Tour</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingsData.slice(0, 3).map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.customerName}</TableCell>
                      <TableCell>{booking.tour}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">${booking.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Bookings Tab */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>Manage all customer bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Tour</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingsData.map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">#{booking.id}</TableCell>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{booking.tour}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>{booking.participants}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">${booking.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Feedback Tab */}
        <TabsContent value="feedback">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Feedback Summary</CardTitle>
              <CardDescription>Overview of customer ratings and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">{averageRating.toFixed(1)}</div>
                  <div className="text-sm text-gray-500">Average Rating</div>
                </div>
              </div>
              
              <div className="space-y-4">
                {feedbackData.map(feedback => (
                  <div key={feedback.id} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold">{feedback.customerName}</div>
                      <div className="text-sm text-gray-500">{feedback.date}</div>
                    </div>
                    <div className="mb-2">Tour: {feedback.tour}</div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="currentColor" 
                          className={`w-5 h-5 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700">{feedback.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
