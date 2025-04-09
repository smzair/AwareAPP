import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Chart, registerables } from 'chart.js';
import { TimeDistributionData } from '@shared/schema';

Chart.register(...registerables);

interface TimeDistributionChartProps {
  data: TimeDistributionData[];
}

type ChartPeriod = 'daily' | 'weekly' | 'monthly';

export default function TimeDistributionChart({ data }: TimeDistributionChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const [period, setPeriod] = useState<ChartPeriod>('weekly');
  
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        // Destroy previous chart instance if it exists
        if (chartInstance) {
          chartInstance.destroy();
        }
        
        // Create new chart
        const newChartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.map(d => d.day),
            datasets: [
              {
                label: 'Social',
                data: data.map(d => d.social),
                backgroundColor: 'rgba(59, 130, 246, 0.8)'
              },
              {
                label: 'Productivity',
                data: data.map(d => d.productivity),
                backgroundColor: 'rgba(16, 185, 129, 0.8)'
              },
              {
                label: 'Entertainment',
                data: data.map(d => d.entertainment),
                backgroundColor: 'rgba(251, 191, 36, 0.8)'
              },
              {
                label: 'Other',
                data: data.map(d => d.other),
                backgroundColor: 'rgba(239, 68, 68, 0.8)'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true
              },
              y: {
                stacked: true,
                title: {
                  display: true,
                  text: 'Minutes'
                }
              }
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += context.parsed.y + ' minutes';
                    return label;
                  }
                }
              }
            }
          }
        });
        
        setChartInstance(newChartInstance);
      }
    }
    
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, period]);
  
  return (
    <Card className="bg-white shadow rounded-lg h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-gray-900">Time Distribution by Platform</h3>
          <div className="flex space-x-2">
            <Button 
              variant={period === 'daily' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setPeriod('daily')}
            >
              Daily
            </Button>
            <Button 
              variant={period === 'weekly' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setPeriod('weekly')}
            >
              Weekly
            </Button>
            <Button 
              variant={period === 'monthly' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setPeriod('monthly')}
            >
              Monthly
            </Button>
          </div>
        </div>
        <div className="relative h-64">
          <canvas ref={chartRef}></canvas>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
          <div>
            <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto"></div>
            <span className="block mt-1 text-gray-500">Social</span>
          </div>
          <div>
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto"></div>
            <span className="block mt-1 text-gray-500">Productivity</span>
          </div>
          <div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto"></div>
            <span className="block mt-1 text-gray-500">Entertainment</span>
          </div>
          <div>
            <div className="w-3 h-3 bg-red-500 rounded-full mx-auto"></div>
            <span className="block mt-1 text-gray-500">Other</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
