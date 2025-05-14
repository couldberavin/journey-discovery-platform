
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Sample bookings data
const bookings = [
  {
    id: 1,
    tourName: 'Paris City Tour',
    tourImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop',
    date: 'June 15, 2025',
    duration: '3 days',
    price: 199,
    status: 'Upcoming',
    paymentStatus: 'Pending',
  },
  {
    id: 2,
    tourName: 'Bali Beach Retreat',
    tourImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop',
    date: 'July 10, 2025',
    duration: '6 days',
    price: 349,
    status: 'Confirmed',
    paymentStatus: 'Pending',
  },
  {
    id: 3,
    tourName: 'Tokyo Adventure',
    tourImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop',
    date: 'March 5, 2025',
    duration: '5 days',
    price: 299,
    status: 'Completed',
    paymentStatus: 'Paid',
  },
  {
    id: 4,
    tourName: 'African Safari',
    tourImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop',
    date: 'January 20, 2025',
    duration: '7 days',
    price: 499,
    status: 'Completed',
    paymentStatus: 'Paid',
  },
  {
    id: 5,
    tourName: 'Greek Islands Tour',
    tourImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop',
    date: 'August 15, 2025',
    duration: '10 days',
    price: 449,
    status: 'Cancelled',
    paymentStatus: 'Refunded',
  }
];

const MyBookings = () => {
  const handleCancelBooking = (id: number) => {
    toast.success("Booking cancelled successfully", {
      description: "Your booking has been cancelled and refund has been initiated."
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return <Badge variant="secondary">{status}</Badge>;
      case 'Confirmed':
        return <Badge className="bg-blue-500">{status}</Badge>;
      case 'Completed':
        return <Badge className="bg-green-500">{status}</Badge>;
      case 'Cancelled':
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-green-500">{status}</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">{status}</Badge>;
      case 'Refunded':
        return <Badge variant="outline" className="text-gray-500 border-gray-500">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden">
                <div className="w-full md:w-1/4 h-40 md:h-auto">
                  <img 
                    src={booking.tourImage} 
                    alt={booking.tourName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <h3 className="text-lg font-bold mb-1 md:mb-0">{booking.tourName}</h3>
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                      {getStatusBadge(booking.status)}
                      {getPaymentStatusBadge(booking.paymentStatus)}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    <p>Date: {booking.date}</p>
                    <p>Duration: {booking.duration}</p>
                    <p>Price: ${booking.price}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm">View Details</Button>
                    
                    {booking.status === 'Upcoming' || booking.status === 'Confirmed' ? (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </Button>
                    ) : booking.status === 'Completed' ? (
                      <Button variant="outline" size="sm">Leave Review</Button>
                    ) : null}
                    
                    {booking.paymentStatus === 'Pending' && (
                      <Button size="sm">Pay Now</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {bookings.length === 0 && (
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
                <Button>Browse Tours</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyBookings;
