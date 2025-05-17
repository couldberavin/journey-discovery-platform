
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Plus, Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

// Tour interface
interface Tour {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  category: string;
  image: string;
  availableDates: string[];
  status: 'Active' | 'Draft';
  rating?: number;
}

// Initial data for tours
const initialTours: Tour[] = [
  {
    id: 1,
    title: 'Paris City Tour',
    description: 'Explore the beautiful city of Paris including Eiffel Tower and Louvre Museum.',
    price: 199,
    duration: '3 days',
    location: 'France',
    category: 'City',
    rating: 4.8,
    availableDates: ['2025-06-15', '2025-07-10', '2025-08-05'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop',
    status: 'Active'
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
    availableDates: ['2025-06-20', '2025-07-15', '2025-08-10'],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop',
    status: 'Active'
  },
  {
    id: 3,
    title: 'Bali Beach Retreat',
    description: 'Relax on beautiful beaches and explore Balinese culture.',
    price: 349,
    duration: '6 days',
    location: 'Indonesia',
    category: 'Beach',
    rating: 4.6,
    availableDates: ['2025-06-10', '2025-07-20', '2025-08-25'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop',
    status: 'Draft'
  }
];

const TourManagement = () => {
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTour, setCurrentTour] = useState<Tour | null>(null);
  
  const form = useForm<Tour>({
    defaultValues: {
      id: 0,
      title: '',
      description: '',
      price: 0,
      duration: '',
      location: '',
      category: 'City',
      availableDates: [],
      image: '',
      status: 'Draft'
    }
  });

  // Open dialog for adding a new tour
  const handleAddTour = () => {
    setCurrentTour(null);
    form.reset({
      id: Date.now(), // Simple ID generation
      title: '',
      description: '',
      price: 0,
      duration: '',
      location: '',
      category: 'City',
      availableDates: [''],
      image: '',
      status: 'Draft'
    });
    setIsDialogOpen(true);
  };

  // Open dialog for editing an existing tour
  const handleEditTour = (tour: Tour) => {
    setCurrentTour(tour);
    form.reset({
      ...tour,
      availableDates: tour.availableDates || ['']
    });
    setIsDialogOpen(true);
  };

  // Delete a tour
  const handleDeleteTour = (id: number) => {
    setTours(tours.filter(tour => tour.id !== id));
    toast.success("Tour deleted successfully");
  };

  // Save the tour (create or update)
  const onSubmit = (data: Tour) => {
    if (currentTour) {
      // Update existing tour
      setTours(tours.map(tour => tour.id === currentTour.id ? { ...data, id: currentTour.id } : tour));
      toast.success("Tour updated successfully");
    } else {
      // Add new tour
      setTours([...tours, { ...data, id: Date.now() }]);
      toast.success("Tour created successfully");
    }
    setIsDialogOpen(false);
  };

  // Add/edit form fields for available dates
  const [datesFields, setDatesFields] = useState<string[]>(['']);

  const addDateField = () => {
    const currentDates = form.getValues().availableDates || [];
    form.setValue('availableDates', [...currentDates, '']);
    setDatesFields([...datesFields, '']);
  };

  const removeDateField = (index: number) => {
    const currentDates = form.getValues().availableDates || [];
    const newDates = currentDates.filter((_, i) => i !== index);
    form.setValue('availableDates', newDates);
    setDatesFields(datesFields.filter((_, i) => i !== index));
  };

  // Handle date change
  const handleDateChange = (index: number, value: string) => {
    const currentDates = [...(form.getValues().availableDates || [])];
    currentDates[index] = value;
    form.setValue('availableDates', currentDates);
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Tour Packages</CardTitle>
            <CardDescription>Manage your tour packages</CardDescription>
          </div>
          <Button onClick={handleAddTour} className="flex items-center">
            <Plus className="h-4 w-4 mr-1" /> Add New Tour
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tours.map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell className="font-medium">{tour.title}</TableCell>
                  <TableCell>{tour.location}</TableCell>
                  <TableCell>${tour.price}</TableCell>
                  <TableCell>{tour.duration}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${tour.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {tour.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditTour(tour)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteTour(tour.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {tours.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No tour packages found. Add your first tour package.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Tour Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentTour ? 'Edit Tour Package' : 'Add New Tour Package'}</DialogTitle>
            <DialogDescription>
              {currentTour 
                ? 'Update the details of your tour package.' 
                : 'Fill in the details to create a new tour package.'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Tour title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tour description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Tour price" 
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 3 days" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Country or city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. City, Adventure, Beach" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Image URL for tour" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label>Available Dates</Label>
                {(form.getValues().availableDates || []).map((date, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input 
                      type="date" 
                      value={date} 
                      onChange={(e) => handleDateChange(index, e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => removeDateField(index)}
                      className="flex-shrink-0"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addDateField}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Date
                </Button>
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Publish Tour</FormLabel>
                      <FormDescription>
                        Set to Active to make this tour visible to customers
                      </FormDescription>
                    </div>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value === 'Active'}
                        onChange={(e) => {
                          field.onChange(e.target.checked ? 'Active' : 'Draft');
                        }}
                        className="form-checkbox h-4 w-4"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {currentTour ? 'Update Tour' : 'Create Tour'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TourManagement;
