import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, Loader2, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const WaitlistPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    jobTitle: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Preferred job title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(''); // Clear any previous errors
    
    try {
      const response = await axios.post('https://visafriendly-b3d2a-default-rtdb.firebaseio.com/userdata.json', {
        userData: formData
      });
      
      if (response.status === 200) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitError('Failed to submit. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Thank You!</CardTitle>
            <CardDescription className="text-gray-600">
              You've successfully joined our H-1B job board waitlist. We'll notify you as soon as we launch!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• We'll send you launch updates via email</li>
                <li>• Get early access before public launch</li>
                <li>• Exclusive job opportunities from day one</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setSubmitError('');
                  setFormData({
                    fullName: '',
                    email: '',
                    jobTitle: '',
                    message: ''
                  });
                }}
                variant="outline"
                className="flex-1"
              >
                Submit Another
              </Button>
              <Button asChild className="flex-1">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

      <header className="flex justify-between items-center p-6 lg:p-8">
        <Button asChild variant="ghost" className="flex items-center">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">VisaFriendly</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Intro Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join the Waitlist
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Be among the first to access exclusive H-1B job opportunities.
              We'll notify you the moment we launch!
            </p>
            <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              🎯 Join 1,000+ professionals already waiting
            </div>
          </div>

          {/* Form */}
          <Card className="border-none shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Get Early Access</CardTitle>
              <CardDescription className="text-center">
                Fill out the form below and we'll keep you updated on our progress.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={errors.fullName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobTitle">
                    Preferred Job Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineer, Data Scientist, Product Manager"
                    className={errors.jobTitle ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  />
                  {errors.jobTitle && (
                    <p className="text-sm text-red-600">{errors.jobTitle}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your experience, what you're looking for, or any questions you have..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">What you'll get:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Early access to our job board before public launch</li>
                    <li>• Exclusive job opportunities from H-1B sponsoring companies</li>
                    <li>• Updates on new features and improvements</li>
                    <li>• Priority customer support</li>
                  </ul>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-600">{submitError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-lg py-6"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Joining Waitlist...
                    </>
                  ) : (
                    'Join the Waitlist'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 mb-4">
              Trusted by professionals from top companies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage; 