import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PrivacyTimelineEntry } from '@/data/mockData';
import { format } from 'date-fns';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Shield, 
  Download, 
  Settings, 
  TrendingUp, 
  TrendingDown,
  Eye
} from 'lucide-react';

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

interface PrivacyTimelineProps {
  data: PrivacyTimelineEntry[];
  currentScore: number;
}

export default function PrivacyTimeline({ data, currentScore }: PrivacyTimelineProps) {
  const [selectedEntry, setSelectedEntry] = useState<PrivacyTimelineEntry | null>(data.length > 0 ? data[data.length - 1] : null);
  
  // Sort data chronologically
  const sortedData = [...data].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Prepare data for chart
  const chartLabels = sortedData.map(entry => format(new Date(entry.date), 'MMM yyyy'));
  
  // Score chart data
  const scoreChartData: ChartData<'line'> = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Privacy Score',
        data: sortedData.map(entry => entry.score),
        borderColor: '#8b5cf6', // violet-500
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        tension: 0.3,
        fill: true,
        pointBackgroundColor: sortedData.map(entry => 
          entry.riskLevel === 'low' ? '#22c55e' : // green-500
          entry.riskLevel === 'medium' ? '#f59e0b' : // amber-500
          '#ef4444' // red-500 for high
        ),
        pointRadius: 5,
        pointHoverRadius: 7,
      }
    ]
  };
  
  // Chart option for score
  const scoreChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function(context) {
            return `${context[0].label}`;
          },
          label: function(context) {
            const index = context.dataIndex;
            const entry = sortedData[index];
            return [
              `Privacy Score: ${entry.score}/100`,
              `Risk Level: ${entry.riskLevel.charAt(0).toUpperCase() + entry.riskLevel.slice(1)}`
            ];
          },
          afterLabel: function(context) {
            const index = context.dataIndex;
            const entry = sortedData[index];
            if (entry.significantEvents.length > 0) {
              return `Event: ${entry.significantEvents[0].description}`;
            }
            return '';
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
          text: 'Privacy Score'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    onClick: (_, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedEntry(sortedData[index]);
      }
    }
  };
  
  // Data sharing chart
  const getDataSharingChartData = (entry: PrivacyTimelineEntry) => {
    return {
      labels: entry.dataShared.map(item => item.category),
      datasets: [
        {
          label: 'Data Exposure (%)',
          data: entry.dataShared.map(item => item.amount),
          backgroundColor: [
            'rgba(239, 68, 68, 0.7)', // red
            'rgba(245, 158, 11, 0.7)', // amber
            'rgba(16, 185, 129, 0.7)', // emerald
            'rgba(59, 130, 246, 0.7)', // blue
            'rgba(139, 92, 246, 0.7)', // violet
          ],
          borderColor: [
            'rgba(239, 68, 68, 1)',
            'rgba(245, 158, 11, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(139, 92, 246, 1)',
          ],
          borderWidth: 1
        }
      ]
    };
  };

  // Function to get trend icon and color
  const getTrendInfo = (previousScore: number, currentScore: number) => {
    const diff = currentScore - previousScore;
    if (diff > 0) {
      return { 
        icon: <TrendingUp className="h-5 w-5 text-green-500" />,
        color: 'text-green-500',
        text: `+${diff} points`
      };
    } else if (diff < 0) {
      return { 
        icon: <TrendingDown className="h-5 w-5 text-red-500" />,
        color: 'text-red-500',
        text: `${diff} points`
      };
    } else {
      return { 
        icon: <Eye className="h-5 w-5 text-gray-500" />,
        color: 'text-gray-500',
        text: 'No change'
      };
    }
  };
  
  // Icon for event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'app_install':
        return <Download className="h-4 w-4 text-blue-500" />;
      case 'permission_change':
        return <Settings className="h-4 w-4 text-amber-500" />;
      case 'data_breach':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'privacy_audit':
        return <Shield className="h-4 w-4 text-green-500" />;
      case 'setting_change':
        return <Settings className="h-4 w-4 text-violet-500" />;
      default:
        return <Eye className="h-4 w-4 text-gray-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  // Display comparison with current score if available
  const renderComparison = () => {
    if (!selectedEntry) return null;
    
    const diff = currentScore - selectedEntry.score;
    const trend = getTrendInfo(selectedEntry.score, currentScore);
    
    return (
      <div className="mt-4 border-t pt-4">
        <h4 className="text-sm font-medium mb-2">Comparison with Current Score</h4>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-500">Then</div>
            <div className={`text-lg font-semibold ${getScoreColor(selectedEntry.score)}`}>
              {selectedEntry.score}/100
            </div>
          </div>
          <div className="flex flex-col items-center">
            {trend.icon}
            <span className={`text-xs ${trend.color} mt-1`}>{diff !== 0 ? `${diff > 0 ? '+' : ''}${diff}` : ''}</span>
          </div>
          <div className="flex-1 bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-500">Now</div>
            <div className={`text-lg font-semibold ${getScoreColor(currentScore)}`}>
              {currentScore}/100
            </div>
          </div>
        </div>
        
        {diff !== 0 && (
          <p className="text-xs text-gray-600 mt-2">
            {diff > 0 
              ? 'Your privacy score has improved since this time, good job!' 
              : 'Your privacy score has decreased since this time. Consider reviewing your privacy settings.'}
          </p>
        )}
      </div>
    );
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Privacy Score Timeline</h3>
        <p className="text-sm text-gray-500 mb-6">
          Track how your privacy score has changed over time, and what events impacted it
        </p>
        
        {/* Chart Section */}
        <div className="h-64 w-full mb-6">
          <Line data={scoreChartData} options={scoreChartOptions} />
        </div>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Event Details</TabsTrigger>
            <TabsTrigger value="comparison">Historical Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            {selectedEntry && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        {format(new Date(selectedEntry.date), 'MMMM yyyy')}
                      </h4>
                      <div className="flex items-center gap-1 mt-1">
                        <span className={`text-sm font-medium ${getScoreColor(selectedEntry.score)}`}>
                          Score: {selectedEntry.score}/100
                        </span>
                        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-700">
                          {selectedEntry.riskLevel.charAt(0).toUpperCase() + selectedEntry.riskLevel.slice(1)} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Significant Events</h4>
                  <ScrollArea className="h-32 w-full rounded-md border">
                    <div className="p-4 space-y-3">
                      {selectedEntry.significantEvents.map((event, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {getEventIcon(event.type)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{event.description}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className={`text-xs ${event.impact > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                Impact: {event.impact > 0 ? '+' : ''}{event.impact} points
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Data Shared</h4>
                  <div className="space-y-2">
                    {selectedEntry.dataShared.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm">{item.category}</span>
                        <div className="w-2/3 flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="bg-blue-500 h-full" 
                              style={{ width: `${item.amount}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 w-10 text-right">
                            {item.amount}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {renderComparison()}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="comparison">
            {selectedEntry && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium">Then ({format(new Date(selectedEntry.date), 'MMM yyyy')})</h4>
                    <div className={`text-2xl font-bold mt-2 ${getScoreColor(selectedEntry.score)}`}>
                      {selectedEntry.score}/100
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedEntry.riskLevel.charAt(0).toUpperCase() + selectedEntry.riskLevel.slice(1)} risk level
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium">Now (June 2023)</h4>
                    <div className={`text-2xl font-bold mt-2 ${getScoreColor(currentScore)}`}>
                      {currentScore}/100
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {currentScore >= 75 ? 'Low' : currentScore >= 50 ? 'Medium' : 'High'} risk level
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-3">What's Changed</h4>
                  <div className="space-y-3">
                    {sortedData
                      .filter(entry => 
                        new Date(entry.date) > new Date(selectedEntry.date) && 
                        new Date(entry.date) <= new Date('2023-06-01')
                      )
                      .map((entry, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="mt-1">
                            {entry.significantEvents[0] && getEventIcon(entry.significantEvents[0].type)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {format(new Date(entry.date), 'MMMM yyyy')}
                            </p>
                            {entry.significantEvents[0] && (
                              <p className="text-xs text-gray-600 mt-1">
                                {entry.significantEvents[0].description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-3">Recommendations</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                      Perform regular privacy audits to improve your score
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                      Review app permissions, especially for social media apps
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                      Limit location and personal data sharing
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                      Use encrypted communication apps when possible
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}