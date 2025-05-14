
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'tourist',
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate login
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Login successful!');
    }, 1500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password match
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // Validate terms agreement
    if (!registerData.agreeToTerms) {
      toast.error('You must agree to the terms and conditions');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Registration successful!', {
        description: 'Your account has been created successfully.'
      });
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login to Your Account</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="your.email@example.com" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="••••••••" 
                    required 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="rememberMe"
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onCheckedChange={(checked) => 
                      setLoginData(prev => ({ ...prev, rememberMe: checked === true }))}
                  />
                  <Label htmlFor="rememberMe" className="text-sm">Remember me</Label>
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <TabsTrigger value="register" className="underline text-primary px-0">
                  Register
                </TabsTrigger>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>Register to book tours and manage your trips</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    name="fullName"
                    value={registerData.fullName}
                    onChange={handleRegisterChange}
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerEmail">Email</Label>
                  <Input 
                    id="registerEmail" 
                    name="email"
                    type="email" 
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder="your.email@example.com" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerPassword">Password</Label>
                  <Input 
                    id="registerPassword" 
                    name="password"
                    type="password" 
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    placeholder="••••••••" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type="password" 
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    placeholder="••••••••" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <div className="flex border rounded-md overflow-hidden">
                    <label 
                      className={`flex-1 text-center py-2 cursor-pointer ${registerData.userType === 'tourist' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                    >
                      <input 
                        type="radio" 
                        name="userType" 
                        value="tourist" 
                        checked={registerData.userType === 'tourist'}
                        onChange={handleRegisterChange}
                        className="sr-only"
                      />
                      Tourist
                    </label>
                    <label 
                      className={`flex-1 text-center py-2 cursor-pointer ${registerData.userType === 'agency' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                    >
                      <input 
                        type="radio" 
                        name="userType" 
                        value="agency" 
                        checked={registerData.userType === 'agency'}
                        onChange={handleRegisterChange}
                        className="sr-only"
                      />
                      Travel Agency
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={registerData.agreeToTerms}
                    onCheckedChange={(checked) => 
                      setRegisterData(prev => ({ ...prev, agreeToTerms: checked === true }))}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I agree to the 
                    <Link to="/terms" className="text-primary hover:underline ml-1">
                      terms and conditions
                    </Link>
                  </Label>
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Registering...' : 'Register'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <TabsTrigger value="login" className="underline text-primary px-0">
                  Login
                </TabsTrigger>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
