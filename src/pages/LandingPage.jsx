import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase, Users, CheckCircle, Globe, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const LandingPage = () => {
  const features = [
    {
      icon: Briefcase,
      title: "H-1B Focused Jobs",
      description: "Only companies that actively sponsor H-1B visas. No more wasting time on dead-end applications."
    },
    {
      icon: Users,
      title: "Verified Employers",
      description: "Pre-screened companies with proven H-1B sponsorship history and positive employee reviews."
    },
    {
      icon: Zap,
      title: "Fast Applications",
      description: "Streamlined application process designed specifically for visa-requiring candidates."
    },
    {
      icon: CheckCircle,
      title: "Success Tracking",
      description: "Real-time updates on your application status and visa sponsorship progress."
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Access to remote and on-site positions across the United States from top tech companies."
    },
    {
      icon: Star,
      title: "Premium Support",
      description: "Dedicated support team that understands the unique challenges of H-1B job searching."
    }
  ];

  const stats = [
    { number: "50k+", label: "Companies Ready to Sponsor" },
    { number: "100k+", label: "H-1B Jobs Posted Monthly" },
    { number: "92%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section - 100vh */}
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 lg:p-8">
          <div className="flex items-center space-x-2">
              <img src={logo} alt="VisaFriendly" className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-gray-900">VisaFriendly</span>
          </div>
          <Button asChild variant="outline">
            <Link to="/waitlist">Join Waitlist</Link>
          </Button>
        </header>

        {/* Main Hero Content */}
        <div className="flex-1 flex md:items-center justify-center px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="my-8">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs md:text-sm font-medium px-3 py-1 rounded-full mb-6">
                🚀 Launching Soon - Join 1,000+ Professionals
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Your Gateway to
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  H-1B Opportunities
                </span>
              </h1>
              <p className=" text-base md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                The first job board exclusively for H-1B visa opportunities. Connect with employers
                who understand your journey and are ready to sponsor your success.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/waitlist" className="flex items-center">
                  Get Early Access
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm lg:text-base text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center py-14 hidden md:block">
          <div className="inline-flex flex-col items-center text-gray-400">
            <span className="text-sm mb-2">Scroll to learn more</span>
            <div className="w-6 h-10 border border-gray-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose VisaFriendly?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We understand the unique challenges of H-1B job hunting. That's why we built
              a platform designed specifically for visa-requiring professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className="py-8 px-6 lg:px-8 border-t bg-white">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>© 2025 VisaFriendly. Connecting talent with opportunity!</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 