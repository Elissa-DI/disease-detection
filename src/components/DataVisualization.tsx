
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Disease {
  name: string;
  probability: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  advice?: string;
}

interface DataVisualizationProps {
  data: Disease[] | null;
  loading: boolean;
}

const COLORS = ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md text-sm">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-muted-foreground">{`Probability: ${(payload[0].value * 100).toFixed(1)}%`}</p>
      </div>
    );
  }
  return null;
};

const DataVisualization: React.FC<DataVisualizationProps> = ({ data, loading }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (data) {
      // Process data for chart
      const processedData = data.map(disease => ({
        name: disease.name,
        value: disease.probability,
        severity: disease.severity
      }));
      
      setChartData(processedData);
      
      // Trigger animation
      setTimeout(() => {
        setAnimate(true);
      }, 100);
    }
  }, [data]);

  if (loading) {
    return (
      <Card className="w-full animate-pulse">
        <CardHeader>
          <CardTitle className="h-6 w-1/3 bg-muted rounded"></CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <div className="h-64 w-64 rounded-full bg-muted opacity-50"></div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">Probability Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={animate ? 80 : 0}
                fill="#8884d8"
                dataKey="value"
                className="transition-all duration-1000 ease-out"
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    className="transition-all duration-500"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataVisualization;
