import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import AdPredictionCard from '@/components/dashboard/AdPredictionCard';
import { adPredictions } from '@/data/mockData';
import { Radar } from 'lucide-react';

export default function AdPredictions() {
  return (
    <MainLayout>
      <div className="md:flex md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ad Prediction Engine</h1>
          <p className="mt-1 text-sm text-gray-500">See what advertisers likely know about you based on your digital behavior</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdPredictionCard predictions={adPredictions} />
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-base font-medium text-gray-900 mb-4">Your Interest Profile</h3>
            <p className="text-sm text-gray-500 mb-6">
              Based on your digital behavior, advertisers may have categorized you with these interests
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Travel', 'Technology', 'Music', 'Fitness', 'Food & Dining', 'Fashion', 'Home Improvement', 'Education', 'Gaming'].map((interest, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-3 text-center">
                  <span className="text-sm font-medium text-gray-800">{interest}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Radar className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-base font-medium text-gray-900">How Ad Prediction Works</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Data Collection</h4>
              <p className="text-sm text-gray-500">
                Advertisers collect data on your browsing history, app usage, search queries, 
                and content interactions to build a profile of your interests and behaviors.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Interest Categorization</h4>
              <p className="text-sm text-gray-500">
                This data is analyzed to place you in interest categories that predict what products 
                or services you're likely to engage with.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Targeted Delivery</h4>
              <p className="text-sm text-gray-500">
                Ads are then served to you based on these categories, with advertisers bidding in 
                real-time to reach people with profiles similar to yours.
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Privacy Tip:</strong> You can reset your advertising ID on your devices or use private browsing 
              to reduce ad targeting precision. Additionally, many platforms allow you to view and adjust your ad preferences.
            </p>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
