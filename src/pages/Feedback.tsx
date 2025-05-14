
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Sample reviews
const sampleReviews = [
  {
    id: 1,
    name: 'John Smith',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    date: '2025-04-15',
    tour: 'Paris City Tour',
    comment: 'Amazing experience! The Eiffel Tower visit was the highlight of our trip. Our guide was knowledgeable and friendly, making the tour extremely enjoyable.'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=2',
    rating: 4,
    date: '2025-04-10',
    tour: 'Tokyo Adventure',
    comment: 'Great tour with lots of interesting cultural insights. I would definitely recommend it to anyone visiting Tokyo for the first time.'
  },
  {
    id: 3,
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    date: '2025-04-05',
    tour: 'African Safari',
    comment: 'Absolutely stunning! We saw all the Big Five animals and the accommodations were luxurious. The guides were extremely knowledgeable about wildlife.'
  }
];

const StarRating = ({ rating, setRating }: { rating: number, setRating?: (rating: number) => void }) => {
  const handleClick = (index: number) => {
    if (setRating) setRating(index + 1);
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-6 h-6 ${i < rating ? 'text-yellow-400' : 'text-gray-300'} ${setRating ? 'cursor-pointer' : ''}`}
          onClick={() => handleClick(i)}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
};

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tourName, setTourName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Thank you for your feedback!', {
        description: 'Your review has been submitted successfully.'
      });
      
      // Reset form
      setName('');
      setEmail('');
      setTourName('');
      setRating(0);
      setComment('');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Feedback</h1>
      <p className="text-gray-500 mb-8">Share your experience and help us improve our tours</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Feedback Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Feedback</CardTitle>
              <CardDescription>We value your opinion and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name (Optional)</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Your name" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Your email" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="tourName">Tour Name</Label>
                  <Input 
                    id="tourName" 
                    value={tourName} 
                    onChange={(e) => setTourName(e.target.value)} 
                    placeholder="Name of the tour you took" 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="rating" className="block mb-2">Rating</Label>
                  <StarRating rating={rating} setRating={setRating} />
                </div>
                
                <div>
                  <Label htmlFor="comment">Comments</Label>
                  <Textarea 
                    id="comment" 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder="Share your experience with us" 
                    required 
                    rows={5}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Reviews Display */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          
          <div className="space-y-4">
            {sampleReviews.map(review => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={review.avatar} alt={review.name} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold mr-2">{review.name}</h3>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Tour: {review.tour}</p>
                      <div className="mb-2">
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
