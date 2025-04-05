
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import ProductPerformanceChart from '@/components/dashboard/ProductPerformanceChart';
import CertificationCard from '@/components/dashboard/CertificationCard';
import ProductFactorsCard from '@/components/dashboard/ProductFactorsCard';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShoppingBag, TrendingUp, Award, Plus } from 'lucide-react';
import PromoCodeGenerator from '@/components/dashboard/PromoCodeGenerator';

const Dashboard: React.FC = () => {
  // Mock data
  const [userInfo] = useState(() => {
    const userJSON = localStorage.getItem('user');
    return userJSON ? JSON.parse(userJSON) : { companyName: 'Company Name', email: 'user@example.com' };
  });
  
  const chartData = [
    { name: 'Bamboo Utensils', visits: 130, purchased: 87 },
    { name: 'Reusable Bags', visits: 210, purchased: 132 },
    { name: 'Water Bottles', visits: 180, purchased: 99 },
    { name: 'Organic Soap', visits: 165, purchased: 105 },
    { name: 'Compostable Plates', visits: 140, purchased: 67 },
  ];
  
  const certifications = [
    { 
      name: 'Green Business Certified', 
      issuer: 'Green Business Alliance',
      date: 'June 15, 2024'
    },
    { 
      name: 'Zero Waste Certification', 
      issuer: 'Environmental Standards Board',
      date: 'March 3, 2024'
    },
  ];
  
  const productFactors = [
    { label: 'Sustainable Materials', positive: true },
    { label: 'Carbon Neutral Shipping', positive: true },
    { label: 'Biodegradable Packaging', positive: true },
    { label: 'Great User Reviews', positive: true },
    { label: 'High Shipping Cost', positive: false },
    { label: 'Limited Color Options', positive: false },
    { label: 'Delivery Time', positive: false },
  ];

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-eco-900">
          Welcome, {userInfo.companyName || userInfo.email}!
        </h2>
        <p className="text-eco-700">
          Here's an overview of your eco-friendly business performance.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Products"
          value="12"
          icon={<ShoppingBag size={24} className="text-eco-600" />}
          trend={{ value: "25%", positive: true }}
        />
        <StatsCard
          title="Visit to Purchase"
          value="67%"
          icon={<TrendingUp size={24} className="text-eco-600" />}
          trend={{ value: "5%", positive: true }}
        />
        <StatsCard
          title="Certifications"
          value="5"
          icon={<Award size={24} className="text-eco-600" />}
          trend={{ value: "2", positive: true }}
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Chart */}
        <div className="lg:col-span-2">
          <ProductPerformanceChart data={chartData} />
          
          {/* Product Factors */}
          <div className="mt-6">
            <ProductFactorsCard factors={productFactors} />
          </div>
          
          {/* Promo Code Generator */}
          <div className="mt-6">
            <PromoCodeGenerator />
          </div>
        </div>
        
        {/* Right Column: Profile and Certifications */}
        <div className="space-y-6">
          {/* User Profile Card */}
          <Card className="border border-eco-100">
            <CardHeader>
              <CardTitle className="text-eco-900">Company Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-center py-4">
                  <div className="h-20 w-20 bg-eco-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {userInfo.companyName?.charAt(0) || userInfo.email?.charAt(0)}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-eco-600 font-medium">Company Name</p>
                  <p className="text-eco-900">{userInfo.companyName || 'Not specified'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-eco-600 font-medium">Email</p>
                  <p className="text-eco-900">{userInfo.email}</p>
                </div>
                <Button variant="outline" className="w-full text-eco-600 border-eco-200 hover:bg-eco-50">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Certifications */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-eco-900">Certifications</h3>
              <Button size="sm" className="bg-eco-500 hover:bg-eco-600">
                <Plus size={16} className="mr-1" /> Add New
              </Button>
            </div>
            
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <CertificationCard
                  key={index}
                  name={cert.name}
                  issuer={cert.issuer}
                  date={cert.date}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
