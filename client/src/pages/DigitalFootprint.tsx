import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TimeDistributionChart from '@/components/dashboard/TimeDistributionChart';
import AppUsageList from '@/components/dashboard/AppUsageList';
import { 
  appUsageData, 
  timeDistributionData 
} from '@/data/mockData';

export default function DigitalFootprint() {
  return (
    <MainLayout>
      <div className="md:flex md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Digital Footprint</h1>
          <p className="mt-1 text-sm text-gray-500">Detailed analysis of your app and website usage</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="apps">Apps</TabsTrigger>
          <TabsTrigger value="websites">Websites</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TimeDistributionChart data={timeDistributionData} />
            <AppUsageList apps={appUsageData} />
          </div>
          
          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">Usage Patterns</h3>
              <p className="text-sm text-gray-500">
                Your screen time has increased by 12% compared to last week. Social media usage has also increased, particularly on the weekends.
              </p>
              
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-800">Peak Usage Time</h4>
                  <p className="mt-1 text-2xl font-bold text-blue-900">8-10 PM</p>
                  <p className="mt-1 text-xs text-blue-700">Daily average</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-purple-800">Most Active Day</h4>
                  <p className="mt-1 text-2xl font-bold text-purple-900">Sunday</p>
                  <p className="mt-1 text-xs text-purple-700">3.2 hours screen time</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-green-800">Top Category</h4>
                  <p className="mt-1 text-2xl font-bold text-green-900">Social</p>
                  <p className="mt-1 text-xs text-green-700">48% of total time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="apps">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">App Usage Analysis</h3>
              <p className="text-sm text-gray-500 mb-6">
                Detailed breakdown of time spent on individual applications
              </p>
              
              <AppUsageList apps={appUsageData} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="websites">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">Website Usage Analysis</h3>
              <p className="text-sm text-gray-500">
                Detailed information on website usage will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">Category Analysis</h3>
              <p className="text-sm text-gray-500">
                Detailed breakdown by content category will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
