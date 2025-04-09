import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TimeDistributionChart from '@/components/dashboard/TimeDistributionChart';
import AppUsageList from '@/components/dashboard/AppUsageList';
import WebsiteUsageList from '@/components/dashboard/WebsiteUsageList';
import CategoryBreakdownChart from '@/components/dashboard/CategoryBreakdown';
import { 
  appUsageData, 
  timeDistributionData,
  websiteUsageData,
  categoryBreakdownData
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
              <p className="text-sm text-gray-500 mb-6">
                Detailed breakdown of your most visited websites
              </p>
              
              <WebsiteUsageList websites={websiteUsageData} />
              
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 h-4 w-4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Privacy Insight</h4>
                    <p className="mt-1 text-xs text-blue-700">
                      Browsing activity from these websites may be used for targeted advertising and user profiling. 
                      Consider using private browsing mode or a privacy-focused browser extension to reduce tracking.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CategoryBreakdownChart categories={categoryBreakdownData} />
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">Digital Wellness Insights</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900">Screen Time Balance</h4>
                    <div className="mt-2 flex items-center">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-500">65%</span>
                    </div>
                    <p className="mt-2 text-xs text-gray-600">
                      Your digital activities are mostly balanced, but consider reducing social media time.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900">Weekly Trend</h4>
                    <p className="mt-2 text-sm text-gray-600">
                      Social media and entertainment categories increased by 8% and 12% respectively.
                      Productivity decreased by 5%.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900">Recommendations</h4>
                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
                      <li>Set a social media time limit of 2 hours per day</li>
                      <li>Increase productivity apps usage</li>
                      <li>Schedule screen-free time blocks</li>
                      <li>Enable app usage notifications when limits are reached</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
