import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrivacyMeter from '@/components/dashboard/PrivacyMeter';
import PrivacyTimeline from '@/components/dashboard/PrivacyTimeline';
import { privacyData, privacyScore, privacyTimelineData } from '@/data/mockData';
import { Shield, AlertTriangle, Lock, Eye, Clock } from 'lucide-react';

export default function Privacy() {
  return (
    <MainLayout>
      <div className="md:flex md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Privacy Exposure</h1>
          <p className="mt-1 text-sm text-gray-500">Monitor and manage how apps and services access your personal data</p>
        </div>
        
        <Button className="mt-4 md:mt-0">
          <Shield className="mr-2 h-5 w-5" />
          Run Privacy Audit
        </Button>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="permissions">App Permissions</TabsTrigger>
          <TabsTrigger value="data">Data Access</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PrivacyMeter score={privacyScore} appData={privacyData} />
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">Privacy Risk Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">High-Risk Issues</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        2 apps have excessive permissions (microphone, location, and contacts access).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Eye className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Data Collection</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Social media apps are collecting data on your usage patterns and contacts.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Lock className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Secure Apps</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        3 apps follow best practices for data handling and have minimal permissions.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Background Activity</h4>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex justify-between">
                      <span>Facebook accessed your location</span>
                      <span className="text-gray-400">18 min ago</span>
                    </li>
                    <li className="flex justify-between">
                      <span>TikTok used your microphone</span>
                      <span className="text-gray-400">2 hours ago</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Instagram accessed your contacts</span>
                      <span className="text-gray-400">Yesterday</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-4">
          <PrivacyTimeline data={privacyTimelineData} currentScore={privacyScore.score} />
        </TabsContent>
        
        <TabsContent value="permissions">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">App Permissions</h3>
              <p className="text-sm text-gray-500 mb-6">
                Review and manage what personal data your apps can access
              </p>
              
              {/* Permissions content would go here */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">Data Access History</h3>
              <p className="text-sm text-gray-500">
                See which apps have accessed your data and when
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">Privacy Recommendations</h3>
              <p className="text-sm text-gray-500">
                Steps you can take to improve your privacy posture
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
