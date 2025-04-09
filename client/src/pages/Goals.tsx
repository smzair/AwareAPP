import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GoalsList from '@/components/dashboard/GoalsList';
import { goalsData } from '@/data/mockData';
import { PlusCircle, Target } from 'lucide-react';

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
      
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Progress Over Time</h3>
          <p className="text-sm text-gray-500 mb-6">
            Your goal completion rate has improved by 15% compared to last month
          </p>
          
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Goal progress chart will appear here</p>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
