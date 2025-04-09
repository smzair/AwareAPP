import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Goal } from '@shared/schema';
import AddGoalDialog from './AddGoalDialog';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  MinusCircle,
  PlusCircle
} from 'lucide-react';

interface GoalsListProps {
  goals: Goal[];
}

export default function GoalsList({ goals }: GoalsListProps) {
  const [addGoalOpen, setAddGoalOpen] = useState(false);
  const getGoalIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'time':
        return <Clock className="h-5 w-5 text-secondary mr-2" />;
      case 'notifications':
        return <MinusCircle className="h-5 w-5 text-red-500 mr-2" />;
      case 'health':
        return <CheckCircle className="h-5 w-5 text-secondary mr-2" />;
      case 'privacy':
        return <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />;
      default:
        return <Clock className="h-5 w-5 text-secondary mr-2" />;
    }
  };
  
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on track':
        return 'bg-green-100 text-green-800';
      case 'off track':
        return 'bg-red-100 text-red-800';
      case 'due soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getProgressColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on track':
        return 'bg-secondary';
      case 'off track':
        return 'bg-red-500';
      case 'due soon':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const calculateProgress = (current: number | null | undefined, target: number) => {
    if (current === undefined || current === null) return 0;
    const percent = (current / target) * 100;
    // Cap at 100%
    return Math.min(percent, 100);
  };
  
  const formatProgressDetail = (goal: Goal) => {
    if (!goal.currentValue) return '';
    
    switch (goal.category) {
      case 'time':
        return `Today's usage: ${Math.floor(goal.currentValue / 60)}h ${goal.currentValue % 60}m`;
      case 'notifications':
        return `Today: ${goal.currentValue} notifications`;
      case 'health':
        return `Last violation: 3 days ago`;
      case 'privacy':
        return `Last check: ${goal.currentValue} days ago`;
      default:
        return `Current: ${goal.currentValue} ${goal.unit}`;
    }
  };
  
  const formatProgressPercentage = (goal: Goal) => {
    if (!goal.currentValue) return '';
    
    const percent = (goal.currentValue / goal.targetValue) * 100;
    
    switch (goal.category) {
      case 'time':
      case 'notifications':
        return `${Math.round(percent)}% of limit`;
      case 'health':
        return `100% success this week`;
      case 'privacy':
        return `Due in ${goal.targetValue - goal.currentValue} day${goal.targetValue - goal.currentValue !== 1 ? 's' : ''}`;
      default:
        return `${Math.round(percent)}%`;
    }
  };
  
  return (
    <Card className="bg-white shadow rounded-lg h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-gray-900">Digital Behavior Goals</h3>
          <Button size="sm" onClick={() => setAddGoalOpen(true)}>
            <PlusCircle className="-ml-0.5 mr-2 h-4 w-4" />
            Add Goal
          </Button>
          <AddGoalDialog 
            open={addGoalOpen}
            onClose={() => setAddGoalOpen(false)}
          />
        </div>
        
        <div className="space-y-4">
          {goals.map(goal => (
            <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    {getGoalIcon(goal.category)}
                    <h4 className="text-sm font-medium text-gray-900">{goal.title}</h4>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{goal.description}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(goal.status)}`}>
                  {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                </span>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{formatProgressDetail(goal)}</span>
                  <span>{formatProgressPercentage(goal)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`${getProgressColor(goal.status)} h-2.5 rounded-full`} 
                    style={{ width: `${calculateProgress(goal.currentValue, goal.targetValue)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
