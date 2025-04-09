import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { format, subDays } from 'date-fns';

// Define Goal interface here since it's not exported from mockData
interface Goal {
  id: number;
  userId: number;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  category: string;
  status: string;
  dueDate: Date;
}

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface GoalCompletionChartProps {
  goals: Goal[];
}

export default function GoalCompletionChart({ goals }: GoalCompletionChartProps) {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');
  
  // Generate historical data points for each goal
  const generateHistoricalData = (goal: Goal, days: number) => {
    const data = [];
    const completion = goal.currentValue / goal.targetValue * 100;
    
    // Start with current completion rate
    let currentRate = Math.min(completion, 100);
    
    // Generate data points with some randomness but trending up
    for (let i = days; i >= 0; i--) {
      // For older dates, show lower completion rates
      // Ensure progress increases over time
      let factor = (days - i) / days;
      let randomFactor = Math.random() * 5 - 2.5; // Small random variations
      
      // Calculate a value that gradually increases from 0 to current rate
      let historicalRate = Math.max(0, currentRate * factor + randomFactor);
      
      // Ensure the most recent value matches the current completion rate
      if (i === 0) {
        historicalRate = currentRate;
      }
      
      data.push({
        date: subDays(new Date(), i),
        value: historicalRate
      });
    }
    
    return data;
  };
  
  // Get days to look back based on timeframe
  const getDaysForTimeframe = (): number => {
    switch (timeframe) {
      case 'week': return 7;
      case 'month': return 30;
      case 'year': return 365;
      default: return 7;
    }
  };
  
  // Generate labels based on selected timeframe
  const generateLabels = () => {
    const days = getDaysForTimeframe();
    const labels = [];
    
    for (let i = days; i >= 0; i--) {
      const date = subDays(new Date(), i);
      if (timeframe === 'week') {
        labels.push(format(date, 'EEE'));
      } else if (timeframe === 'month') {
        // For month view, only show every 5 days
        if (i % 5 === 0 || i === 0) {
          labels.push(format(date, 'MMM d'));
        } else {
          labels.push('');
        }
      } else {
        // For year view, only show every month
        if (date.getDate() === 1 || i === 0) {
          labels.push(format(date, 'MMM'));
        } else {
          labels.push('');
        }
      }
    }
    
    return labels;
  };
  
  // Generate datasets for the chart
  const generateDatasets = () => {
    return goals.map((goal, index) => {
      // Assign different colors to each goal
      const colors = [
        { border: 'rgba(59, 130, 246, 1)', background: 'rgba(59, 130, 246, 0.1)' }, // blue
        { border: 'rgba(236, 72, 153, 1)', background: 'rgba(236, 72, 153, 0.1)' }, // pink
        { border: 'rgba(16, 185, 129, 1)', background: 'rgba(16, 185, 129, 0.1)' }, // emerald
        { border: 'rgba(245, 158, 11, 1)', background: 'rgba(245, 158, 11, 0.1)' }, // amber
      ];
      
      const colorIndex = index % colors.length;
      const color = colors[colorIndex];
      
      // Generate historical data for this goal
      const historicalData = generateHistoricalData(goal, getDaysForTimeframe());
      
      return {
        label: goal.title,
        data: historicalData.map(point => point.value),
        borderColor: color.border,
        backgroundColor: color.background,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      };
    });
  };
  
  // Chart data
  const chartData: ChartData<'line'> = {
    labels: generateLabels(),
    datasets: generateDatasets(),
  };
  
  // Chart options
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Completion (%)'
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };
  
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value as 'week' | 'month' | 'year');
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Goal Completion Progress</h3>
            <p className="text-sm text-gray-500">Track how your goals progress over time</p>
          </div>
          
          <Tabs 
            value={timeframe} 
            onValueChange={handleTimeframeChange}
            className="mt-4 md:mt-0"
          >
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="h-80">
          <Line data={chartData} options={chartOptions} />
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Goal Summary</h4>
          <div className="space-y-4">
            {goals.map((goal, index) => {
              const completion = (goal.currentValue / goal.targetValue) * 100;
              const colors = [
                { light: 'bg-blue-100', text: 'text-blue-800', bar: 'bg-blue-500' },
                { light: 'bg-pink-100', text: 'text-pink-800', bar: 'bg-pink-500' },
                { light: 'bg-emerald-100', text: 'text-emerald-800', bar: 'bg-emerald-500' },
                { light: 'bg-amber-100', text: 'text-amber-800', bar: 'bg-amber-500' },
              ];
              const colorIndex = index % colors.length;
              const color = colors[colorIndex];
              
              return (
                <div key={goal.id} className="flex items-center gap-4">
                  <div className={`flex-shrink-0 h-8 w-8 ${color.light} rounded-full flex items-center justify-center`}>
                    <span className={`text-xs font-medium ${color.text}`}>{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-900">{goal.title}</span>
                      <span className="text-sm text-gray-500">{completion.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={color.bar}
                        style={{ width: `${completion}%`, height: '100%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}