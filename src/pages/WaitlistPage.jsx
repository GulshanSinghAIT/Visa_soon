import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, Loader2, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

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

      // Send welcome email via secure API
      const emailResponse = await axios.post('/api/send-email', {
        userData: formData
      });

      /*
      await sendEmail({
        to: formData.email,
        subject: " 🎉 You’re On the List! Here’s What’s Next",
        text: `Hi ${formData.fullName}, thanks for signing up!`, // Plain text fallback
        html: `
          <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Waitlist Confirmation - VisaFriendly</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f0f4f8;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 32px rgba(59, 130, 246, 0.1); overflow: hidden;">
          
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                🎯 You're on the List!
              </h1>
              <p style="margin: 10px 0 0 0; color: #dbeafe; font-size: 16px; opacity: 0.9;">
                Early access to your visa-sponsored career awaits
              </p>
            </td>
          </tr>
          
          <!-- Main content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1e40af; font-size: 24px; font-weight: 600;">
                Hi ${formData.fullName}! 👋
              </h2>
              
              <p style="margin: 0 0 25px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                <strong>Thank you for joining the VisaFriendly Early Access Waitlist!</strong>
              </p>
              
              <p style="margin: 0 0 25px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                We're excited to help you unlock your U.S. career opportunities — with zero visa guesswork. 🌟
              </p>
              
              <!-- Feature highlights -->
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                <h3 style="margin: 0 0 15px 0; color: #1e40af; font-size: 18px; font-weight: 600;">
                  Here's what makes VisaFriendly different:
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 15px; line-height: 1.7;">
                  <li style="margin-bottom: 12px;">
                    <strong style="color: #1e40af;">✅ Verified Visa Sponsorship</strong><br>
                    <span style="color: #6b7280; font-size: 14px;">No more wasted time — find jobs, internships, and co-ops at companies that actually sponsor H-1B and Green Cards.</span>
                  </li>
                  <li style="margin-bottom: 12px;">
                    <strong style="color: #1e40af;">✅ Personalized Job Matches</strong><br>
                    <span style="color: #6b7280; font-size: 14px;">Get roles tailored to your visa status, experience, and career goals.</span>
                  </li>
                  <li style="margin-bottom: 12px;">
                    <strong style="color: #1e40af;">✅ Faster, Smarter Applications</strong><br>
                    <span style="color: #6b7280; font-size: 14px;">Save jobs, track applications, and follow up — all in one place.</span>
                  </li>
                  <li style="margin-bottom: 8px;">
                    <strong style="color: #1e40af;">✅ Real Insights for F-1 and H-1B Holders</strong><br>
                    <span style="color: #6b7280; font-size: 14px;">Resources, checklists, and hiring trends designed just for you.</span>
                  </li>
                </ul>
              </div>
              
              <!-- What's Next Section -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 18px; font-weight: 600;">
                  👀 What's Next?
                </h3>
                <p style="margin: 0; color: #78350f; font-size: 15px; line-height: 1.6;">
                  We'll email you as soon as your early access is ready. Until then, stay tuned — and get ready to land your visa-sponsored dream job faster.
                </p>
              </div>
              
              <p style="margin: 25px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Thank you for being part of our growing community. We're building VisaFriendly for you — and we can't wait to support your journey!
              </p>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 35px 0;">
                <a href="https://visafriendly.com" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3); transition: all 0.3s ease;">
                  Visit VisaFriendly →
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
                Questions? Reply to this email
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 13px;">
                © 2024 VisaFriendly Team. Helping dreams become reality, with no visa barriers.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `
      });
      */

      if (response.status === 200 && emailResponse.data.success) {
        setIsSubmitted(true);
      } else if (!emailResponse.data.success) {
        console.warn('Data saved but email failed to send');
        setIsSubmitted(true); // Still proceed even if email fails
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

      <header className="flex justify-between items-center px-1 py-6 lg:p-8">
        <Button asChild variant="ghost" className="flex items-center">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <div className="flex items-center space-x-2">
          <img src={logo} alt="VisaFriendly" className="w-8 h-8 text-white" />
          <span className="text-2xl font-bold text-gray-900">VisaFriendly</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Intro Section */}
          <div className="text-center mb-8">

            <p className="md:text-lg text-gray-600 mb-6">
              🎯 Be among the first to access exclusive H-1B job opportunities.
              We'll notify you the moment we launch!
            </p>
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