import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LandingHeader from '@/components/LandingHeader';
import Logo from '@/components/Logo';
import { Leaf, BarChart3, Award, ShoppingBag } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-eco-400 to-eco-700 py-20 px-4 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Grow your eco-friendly business with insights that matter
              </h1>
              <p className="text-xl opacity-90">
                EcoSellersHub helps sustainable product sellers analyze performance, showcase certifications, and make data-driven decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-eco-700 hover:bg-eco-50" asChild>
                  <Link to="/signup">Join for Free</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-eco-700 hover:bg-white/10 hover:text-white" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl w-full max-w-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white text-eco-700 p-2 rounded-md">
                    <BarChart3 size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Your Product Analytics</h3>
                    <p className="text-sm opacity-80">Eco Bamboo Utensils</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/20 rounded-md p-3">
                    <div className="flex justify-between text-sm">
                      <span>Visited/Bought Ratio</span>
                      <span className="font-medium">67%</span>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full mt-2">
                      <div className="w-2/3 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-md p-3">
                    <div className="flex justify-between text-sm">
                      <span>Sustainability Score</span>
                      <span className="font-medium">92/100</span>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full mt-2">
                      <div className="w-[92%] h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-md p-3">
                    <div className="flex justify-between text-sm">
                      <span>Customer Retention</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full mt-2">
                      <div className="w-[78%] h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-eco-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to grow your eco-friendly business?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of sustainable sellers who are making a bigger impact with EcoSellersHub
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-eco-700 hover:bg-eco-50" asChild>
              <Link to="/signup">Get Started Today</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-eco-700 hover:bg-white/10 hover:text-white" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-eco-900">Features Built for Eco-friendly Sellers</h2>
            <p className="mt-4 text-lg text-eco-700 max-w-2xl mx-auto">
              Everything you need to grow your sustainable business and make a bigger impact
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="eco-card p-6">
              <div className="h-12 w-12 bg-eco-100 text-eco-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-semibold text-eco-900 mb-2">Performance Analytics</h3>
              <p className="text-eco-700">
                Track your products' performance with detailed analytics on visitor-to-buyer conversion rates.
              </p>
            </div>
            
            <div className="eco-card p-6">
              <div className="h-12 w-12 bg-eco-100 text-eco-600 rounded-lg flex items-center justify-center mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-semibold text-eco-900 mb-2">Certification Management</h3>
              <p className="text-eco-700">
                Showcase your eco-certifications and sustainability credentials to build trust with customers.
              </p>
            </div>
            
            <div className="eco-card p-6">
              <div className="h-12 w-12 bg-eco-100 text-eco-600 rounded-lg flex items-center justify-center mb-4">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-xl font-semibold text-eco-900 mb-2">Product Insights</h3>
              <p className="text-eco-700">
                Understand the positive and negative factors affecting your product performance.
              </p>
            </div>
            
            <div className="eco-card p-6">
              <div className="h-12 w-12 bg-eco-100 text-eco-600 rounded-lg flex items-center justify-center mb-4">
                <Leaf size={24} />
              </div>
              <h3 className="text-xl font-semibold text-eco-900 mb-2">Eco Community</h3>
              <p className="text-eco-700">
                Connect with like-minded businesses and share sustainable practices.
              </p>
            </div>
            
            <div className="eco-card p-6">
              <div className="h-12 w-12 bg-eco-100 text-eco-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-line-chart"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-eco-900 mb-2">Growth Trends</h3>
              <p className="text-eco-700">
                Monitor your business growth and identify opportunities for expansion.
              </p>
            </div>
            
            <div className="eco-card p-6">
              <div className="h-12 w-12 bg-eco-100 text-eco-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 1 0 7.75"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-eco-900 mb-2">Customer Insights</h3>
              <p className="text-eco-700">
                Understand your customer base and their preferences for eco-friendly products.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-eco-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-eco-900 mb-6">About EcoSellersHub</h2>
              <p className="text-lg text-eco-700 mb-6">
                We believe that sustainable businesses deserve powerful tools to grow their impact. 
                Our platform is designed specifically for eco-friendly product sellers who want to 
                make informed decisions based on real data.
              </p>
              <p className="text-lg text-eco-700 mb-6">
                With EcoSellersHub, you can showcase your certifications, analyze your product 
                performance, and identify opportunities for improvement—all in one place.
              </p>
              <Button className="bg-eco-500 hover:bg-eco-600" asChild>
                <Link to="/signup">Join Our Community</Link>
              </Button>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl p-6 shadow-md border border-eco-100">
                <div className="flex items-center gap-3 mb-6">
                  <Logo />
                </div>
                <blockquote className="border-l-4 border-eco-400 pl-4 italic text-eco-800">
                  "Our mission is to help sustainable businesses thrive by providing them with 
                  the insights and tools they need to make a bigger impact on the world."
                </blockquote>
                <p className="mt-4 text-right text-eco-600 font-medium">
                  - The EcoSellersHub Team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-eco-900">What Our Sellers Say</h2>
            <p className="mt-4 text-lg text-eco-700 max-w-2xl mx-auto">
              Hear from eco-friendly businesses that have grown with our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="eco-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-eco-200 rounded-full flex items-center justify-center text-eco-700 font-bold">
                  AB
                </div>
                <div>
                  <p className="font-semibold text-eco-900">Amelia Brown</p>
                  <p className="text-sm text-eco-600">GreenLeaf Products</p>
                </div>
              </div>
              <p className="text-eco-700">
                "EcoSellersHub has transformed how we understand our product performance. 
                The analytics have helped us increase conversion rates by 23% in just three months!"
              </p>
            </div>
            
            <div className="eco-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-eco-200 rounded-full flex items-center justify-center text-eco-700 font-bold">
                  JL
                </div>
                <div>
                  <p className="font-semibold text-eco-900">James Liu</p>
                  <p className="text-sm text-eco-600">Sustainable Living Co.</p>
                </div>
              </div>
              <p className="text-eco-700">
                "Being able to showcase our certifications in one place has built credibility with 
                our customers. Our eco-credentials are now a key part of our brand story."
              </p>
            </div>
            
            <div className="eco-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-eco-200 rounded-full flex items-center justify-center text-eco-700 font-bold">
                  SR
                </div>
                <div>
                  <p className="font-semibold text-eco-900">Sofia Rodriguez</p>
                  <p className="text-sm text-eco-600">Earth Friendly Goods</p>
                </div>
              </div>
              <p className="text-eco-700">
                "The product factors analysis helped us identify that our packaging was a concern for 
                customers. After making changes, our reviews improved dramatically!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-eco-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Logo size="md" />
              <p className="mt-4 text-eco-100 text-sm">
                Helping sustainable businesses make a bigger impact through data-driven insights.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-eco-100 hover:text-white">Features</a></li>
                <li><a href="#about" className="text-eco-100 hover:text-white">About</a></li>
                <li><a href="#testimonials" className="text-eco-100 hover:text-white">Testimonials</a></li>
                <li><Link to="/login" className="text-eco-100 hover:text-white">Login</Link></li>
                <li><Link to="/signup" className="text-eco-100 hover:text-white">Sign Up</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-eco-100 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-eco-100 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-eco-100 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-eco-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span>contact@ecosellershub.com</span>
                </li>
                <li className="flex items-center gap-2 text-eco-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
              <div className="mt-4 flex gap-4">
                <a href="#" className="text-eco-100 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="text-eco-100 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="text-eco-100 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="text-eco-100 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-eco-800 mt-8 pt-8 text-center text-eco-100 text-sm">
            <p>&copy; {new Date().getFullYear()} EcoSellersHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
