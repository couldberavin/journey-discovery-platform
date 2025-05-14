
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

const AccountSettings = () => {
  const handlePasswordUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success('Password updated successfully');
  };
  
  const handleNotificationSettingsUpdate = () => {
    toast.success('Notification settings saved');
  };
  
  const handleDeleteAccount = () => {
    toast.error('Account deletion initiated', {
      description: 'In a real app, this would require additional confirmation.'
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      
      <div className="space-y-6">
        {/* Password Change */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <Button type="submit">Update Password</Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive email updates about your account activity</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Booking Updates</h3>
                  <p className="text-sm text-gray-500">Receive notifications about your booking status</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Marketing Emails</h3>
                  <p className="text-sm text-gray-500">Receive promotional offers and new tour updates</p>
                </div>
                <Switch />
              </div>
              
              <Button onClick={handleNotificationSettingsUpdate}>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>
              Manage your privacy preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox id="profile-visibility" defaultChecked />
                  <div>
                    <Label htmlFor="profile-visibility" className="font-medium">Public Profile</Label>
                    <p className="text-sm text-gray-500">Allow other users to see your profile information</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox id="location-services" defaultChecked />
                  <div>
                    <Label htmlFor="location-services" className="font-medium">Location Services</Label>
                    <p className="text-sm text-gray-500">Allow the app to access your location for tour recommendations</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox id="data-collection" />
                  <div>
                    <Label htmlFor="data-collection" className="font-medium">Data Collection</Label>
                    <p className="text-sm text-gray-500">Allow us to collect usage data to improve our services</p>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleNotificationSettingsUpdate}>Save Privacy Settings</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Permanent actions that cannot be undone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Delete Account</h3>
                <p className="text-sm text-gray-500 mb-3">
                  This will permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountSettings;
