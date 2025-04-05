
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProductPerformanceData {
  name: string;
  visits: number;
  purchased: number;
}

interface ProductPerformanceChartProps {
  data: ProductPerformanceData[];
}

const ProductPerformanceChart: React.FC<ProductPerformanceChartProps> = ({ data }) => {
  return (
    <Card className="border border-eco-100">
      <CardHeader>
        <CardTitle className="text-eco-900">Product Performance</CardTitle>
        <CardDescription>Visited to purchase conversion ratio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
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
              <Bar dataKey="visits" fill="#65d069" name="Visits" />
              <Bar dataKey="purchased" fill="#3fb843" name="Purchased" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPerformanceChart;
