import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PlatformIntegration from '@/components/dashboard/PlatformIntegration';
import { Layers, HelpCircle } from 'lucide-react';

export default function Integrations() {
  return (
    <MainLayout>
      <div className="md:flex md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Integrations</h1>
          <p className="mt-1 text-sm text-gray-500">Connect and manage platforms to track your digital behavior</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <PlatformIntegration />
      </div>
      
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <HelpCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-900">About Platform Integrations</h3>
              <p className="mt-1 text-sm text-gray-500">
                Platform integrations allow Aware to analyze your digital activity to provide personalized insights about your online behavior. 
                Connect various platforms to get a comprehensive understanding of your digital footprint, identify potential privacy issues, 
                and set meaningful goals for improving your digital well-being.
              </p>
              
              <h4 className="mt-4 text-sm font-medium text-gray-900">How It Works</h4>
              <ol className="mt-2 ml-5 list-decimal text-sm text-gray-500 space-y-2">
                <li>Connect your platforms using the platform integration tool</li>
                <li>Customize which data Aware can access from each platform</li>
                <li>Receive tailored insights based on your activity across all connected platforms</li>
                <li>Set goals based on real usage data and track your progress automatically</li>
              </ol>
              
              <div className="mt-4 flex flex-wrap gap-4">
                <Button variant="outline" size="sm">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Integration Guide
                </Button>
                <Button variant="outline" size="sm">
                  <Layers className="mr-2 h-4 w-4" />
                  Supported Platforms
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}