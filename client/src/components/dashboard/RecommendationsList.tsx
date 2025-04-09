import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Recommendation } from '@shared/schema';
import { RefreshCw } from 'lucide-react';

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export default function RecommendationsList({ recommendations }: RecommendationsListProps) {
  const getRecommendationBorderColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'alert':
        return 'border-primary';
      case 'privacy':
        return 'border-red-500';
      case 'goal':
        return 'border-yellow-500';
      case 'productivity':
        return 'border-green-500';
      default:
        return 'border-gray-300';
    }
  };
  
  const getActionButtonColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'alert':
        return 'bg-primary hover:bg-indigo-700';
      case 'privacy':
        return 'bg-red-600 hover:bg-red-700';
      case 'goal':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'productivity':
        return 'bg-green-600 hover:bg-green-700';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  const getActionButtonText = (type: string) => {
    switch (type.toLowerCase()) {
      case 'alert':
        return 'Set Timer';
      case 'privacy':
        return 'Review Settings';
      case 'goal':
        return 'Show Details';
      case 'productivity':
        return 'View Trends';
      default:
        return 'Take Action';
    }
  };
  
  return (
    <Card className="bg-white shadow rounded-lg h-full">
      <CardContent className="p-6">
        <h3 className="text-base font-medium text-gray-900 mb-4">Smart Recommendations</h3>
        <div className="space-y-4">
          {recommendations.map(rec => (
            <div key={rec.id} className={`border-l-4 ${getRecommendationBorderColor(rec.type)} pl-3 py-2`}>
              <h4 className="text-sm font-medium text-gray-900">{rec.title}</h4>
              <p className="mt-1 text-xs text-gray-500">{rec.description}</p>
              <div className="mt-2 flex space-x-2">
                <Button 
                  size="sm" 
                  className={getActionButtonColor(rec.type)}
                >
                  {getActionButtonText(rec.type)}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button variant="outline" className="w-full">
            <RefreshCw className="mr-2 h-5 w-5 text-gray-400" />
            Refresh Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
