
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import ProductFactorsCard from '@/components/dashboard/ProductFactorsCard';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [selectedProduct, setSelectedProduct] = useState('all');
  
  // Mock data
  const conversionData = [
    { name: 'Jan', visits: 1000, purchases: 400 },
    { name: 'Feb', visits: 1200, purchases: 600 },
    { name: 'Mar', visits: 1500, purchases: 750 },
    { name: 'Apr', visits: 1300, purchases: 850 },
    { name: 'May', visits: 1700, purchases: 1000 },
    { name: 'Jun', visits: 1600, purchases: 1200 },
  ];
  
  const trafficSources = [
    { name: 'Organic Search', value: 42 },
    { name: 'Social Media', value: 23 },
    { name: 'Direct', value: 18 },
    { name: 'Email', value: 12 },
    { name: 'Referral', value: 5 },
  ];
  
  const productPerformance = [
    { name: 'Bamboo Utensils', visits: 130, purchased: 87, ratio: 67 },
    { name: 'Reusable Bags', visits: 210, purchased: 132, ratio: 63 },
    { name: 'Water Bottles', visits: 180, purchased: 99, ratio: 55 },
    { name: 'Organic Soap', visits: 165, purchased: 105, ratio: 64 },
    { name: 'Compostable Plates', visits: 140, purchased: 67, ratio: 48 },
  ];
  
  const customerDemographics = [
    { name: '18-24', value: 15 },
    { name: '25-34', value: 35 },
    { name: '35-44', value: 25 },
    { name: '45-54', value: 15 },
    { name: '55+', value: 10 },
  ];
  
  const COLORS = ['#65d069', '#3fb843', '#2d9832', '#25782a', '#215f26'];
  
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
    <DashboardLayout title="Analytics">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-eco-900">Product Performance Analysis</h2>
        <p className="text-eco-700">Analyze your eco-friendly products' performance metrics.</p>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-eco-100 mb-6 flex flex-wrap gap-4">
        <div className="w-full sm:w-auto">
          <label className="text-sm text-eco-700 block mb-1">Time Range</label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-auto">
          <label className="text-sm text-eco-700 block mb-1">Product</label>
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="bambooUtensils">Bamboo Utensils</SelectItem>
              <SelectItem value="reusableBags">Reusable Bags</SelectItem>
              <SelectItem value="waterBottles">Water Bottles</SelectItem>
              <SelectItem value="organicSoap">Organic Soap</SelectItem>
              <SelectItem value="compostablePlates">Compostable Plates</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Tabs and Charts */}
      <Tabs defaultValue="performance" className="w-full mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Chart */}
            <div className="lg:col-span-2">
              <Card className="border border-eco-100">
                <CardHeader>
                  <CardTitle className="text-eco-900">Visit to Purchase Conversion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={conversionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Bar dataKey="visits" name="Visits" fill="#65d069" />
                        <Bar dataKey="purchases" name="Purchases" fill="#215f26" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Product Factors */}
            <div>
              <ProductFactorsCard factors={productFactors} />
            </div>
          </div>
          
          {/* Product Performance Table */}
          <div className="mt-6">
            <Card className="border border-eco-100">
              <CardHeader>
                <CardTitle className="text-eco-900">Product Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-eco-100">
                        <th className="text-left py-3 px-4 font-semibold text-eco-900">Product</th>
                        <th className="text-left py-3 px-4 font-semibold text-eco-900">Visits</th>
                        <th className="text-left py-3 px-4 font-semibold text-eco-900">Purchases</th>
                        <th className="text-left py-3 px-4 font-semibold text-eco-900">Conversion Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productPerformance.map((product, index) => (
                        <tr key={index} className={index !== productPerformance.length - 1 ? "border-b border-eco-100" : ""}>
                          <td className="py-3 px-4">{product.name}</td>
                          <td className="py-3 px-4">{product.visits}</td>
                          <td className="py-3 px-4">{product.purchased}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <span className="font-medium">{product.ratio}%</span>
                              <div className="w-24 h-2 bg-eco-100 rounded-full ml-3">
                                <div 
                                  className="h-2 bg-eco-500 rounded-full"
                                  style={{ width: `${product.ratio}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="traffic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Traffic Sources Chart */}
            <div className="lg:col-span-2">
              <Card className="border border-eco-100">
                <CardHeader>
                  <CardTitle className="text-eco-900">Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { month: 'Jan', organic: 400, social: 240, direct: 200, email: 120 },
                        { month: 'Feb', organic: 500, social: 250, direct: 220, email: 180 },
                        { month: 'Mar', organic: 600, social: 300, direct: 250, email: 190 },
                        { month: 'Apr', organic: 550, social: 320, direct: 230, email: 220 },
                        { month: 'May', organic: 700, social: 400, direct: 280, email: 250 },
                        { month: 'Jun', organic: 800, social: 450, direct: 300, email: 270 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="organic" name="Organic Search" stroke="#65d069" />
                        <Line type="monotone" dataKey="social" name="Social Media" stroke="#3fb843" />
                        <Line type="monotone" dataKey="direct" name="Direct" stroke="#25782a" />
                        <Line type="monotone" dataKey="email" name="Email" stroke="#215f26" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Traffic Sources Pie Chart */}
            <div>
              <Card className="border border-eco-100">
                <CardHeader>
                  <CardTitle className="text-eco-900">Traffic Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height="80%">
                      <PieChart>
                        <Pie
                          data={trafficSources}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {trafficSources.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 w-full">
                      <div className="flex flex-wrap justify-center gap-2">
                        {trafficSources.map((source, index) => (
                          <div key={index} className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-1"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="text-xs">{source.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="demographics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Demographics */}
            <Card className="border border-eco-100">
              <CardHeader>
                <CardTitle className="text-eco-900">Age Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerDemographics}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {customerDemographics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Interest Demographics */}
            <Card className="border border-eco-100">
              <CardHeader>
                <CardTitle className="text-eco-900">Eco Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={[
                        { name: 'Zero Waste', value: 65 },
                        { name: 'Sustainable', value: 78 },
                        { name: 'Organic', value: 60 },
                        { name: 'Vegan', value: 45 },
                        { name: 'Plastic-Free', value: 72 },
                      ]}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="value" fill="#3fb843" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Analytics;
