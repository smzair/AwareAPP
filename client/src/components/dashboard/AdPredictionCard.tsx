import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdPrediction } from '@shared/schema';

interface AdPredictionCardProps {
  predictions: AdPrediction[];
}

export default function AdPredictionCard({ predictions }: AdPredictionCardProps) {
  const getTagColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'travel':
        return 'bg-blue-100 text-blue-800';
      case 'electronics':
        return 'bg-purple-100 text-purple-800';
      case 'subscription':
        return 'bg-green-100 text-green-800';
      case 'fitness':
        return 'bg-red-100 text-red-800';
      case 'fashion':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-white shadow rounded-lg h-full">
      <CardContent className="p-6">
        <h3 className="text-base font-medium text-gray-900 mb-4">Ad Prediction Engine</h3>
        <p className="text-sm text-gray-500 mb-6">Based on your recent activity, you're likely to see ads in these categories:</p>
        
        <div className="space-y-4 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
          {predictions.map(prediction => (
            <div key={prediction.id} className="flex border border-gray-200 rounded-lg overflow-hidden">
              <div className="w-1/3 bg-gray-100">
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <img 
                    className="h-full w-full object-cover" 
                    src={prediction.imageUrl} 
                    alt={prediction.title} 
                  />
                </div>
              </div>
              <div className="w-2/3 p-4">
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTagColor(prediction.category)}`}>
                    {prediction.category}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">Likelihood: {prediction.likelihood}</span>
                </div>
                <h4 className="mt-2 text-sm font-medium text-gray-900">{prediction.title}</h4>
                <p className="mt-1 text-xs text-gray-500">{prediction.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500">These predictions are based on your digital behavior patterns</span>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
