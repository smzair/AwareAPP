import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GoalsList from '@/components/dashboard/GoalsList';
import GoalCompletionChart from '@/components/dashboard/GoalCompletionChart';
import PlatformIntegration from '@/components/dashboard/PlatformIntegration';
import { goalsData } from '@/data/mockData';
import { PlusCircle, Target, Layers, Settings } from 'lucide-react';

export default function Goals() {
  return (
    <MainLayout>
      <div className="md:flex md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Digital Behavior Goals</h1>
          <p className="mt-1 text-sm text-gray-500">Set and track goals to improve your digital wellness</p>
        </div>
        
        <Button className="mt-4 md:mt-0">
          <PlusCircle className="mr-2 h-5 w-5" />
          Create New Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <GoalsList goals={goalsData} />
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Target className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-base font-medium text-gray-900">Goal Suggestions</h3>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900">Digital Detox Hours</h4>
                <p className="mt-1 text-xs text-gray-500">
                  Set specific hours each day where you don't use any digital devices
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Add This Goal
                </Button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900">App Usage Limits</h4>
                <p className="mt-1 text-xs text-gray-500">
                  Set time limits for specific apps that tend to consume too much time
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Add This Goal
                </Button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900">Regular Privacy Reviews</h4>
                <p className="mt-1 text-xs text-gray-500">
                  Schedule regular reviews of app permissions and privacy settings
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Add This Goal
                </Button>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Start with small, achievable goals. Gradual changes to your digital habits are more likely to stick than dramatic shifts.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="progress" className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="progress">
            <Target className="h-4 w-4 mr-2" />
            Goal Progress
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Layers className="h-4 w-4 mr-2" />
            Platform Integrations
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="progress">
          <GoalCompletionChart goals={goalsData} />
        </TabsContent>
        
        <TabsContent value="integrations">
          <PlatformIntegration />
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">Goal Settings</h3>
              <p className="text-sm text-gray-500 mb-6">
                Configure your goal tracking settings and notification preferences
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Notification Preferences</h4>
                  <p className="text-xs text-gray-500 mb-4">
                    Configure how and when you receive notifications about your goals
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Daily progress summary</span>
                      <div className="flex items-center">
                        <select className="text-sm border rounded-md px-2 py-1">
                          <option>8:00 AM</option>
                          <option>12:00 PM</option>
                          <option>6:00 PM</option>
                          <option>9:00 PM</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Goal deadline reminders</span>
                      <div className="flex items-center">
                        <select className="text-sm border rounded-md px-2 py-1">
                          <option>1 day before</option>
                          <option>3 days before</option>
                          <option>1 week before</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Achievement celebrations</span>
                      <div className="flex items-center">
                        <select className="text-sm border rounded-md px-2 py-1">
                          <option>Always</option>
                          <option>Major milestones only</option>
                          <option>Never</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Data Collection</h4>
                  <p className="text-xs text-gray-500 mb-4">
                    Configure how your data is collected and used for goal tracking
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Allow automated data collection</span>
                      <div className="flex items-center">
                        <select className="text-sm border rounded-md px-2 py-1">
                          <option>All platforms</option>
                          <option>Selected platforms</option>
                          <option>Manual only</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data retention period</span>
                      <div className="flex items-center">
                        <select className="text-sm border rounded-md px-2 py-1">
                          <option>30 days</option>
                          <option>90 days</option>
                          <option>1 year</option>
                          <option>Forever</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
