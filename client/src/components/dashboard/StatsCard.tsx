import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Clock, LayoutGrid, AlertTriangle, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeText?: string;
  icon: 'time' | 'apps' | 'privacy' | 'goals';
  variant?: 'neutral' | 'positive' | 'negative' | 'warning';
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  changeText, 
  icon,
  variant = 'neutral'
}: StatsCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'time':
        return <Clock className="h-6 w-6 text-primary" />;
      case 'apps':
        return <LayoutGrid className="h-6 w-6 text-secondary" />;
      case 'privacy':
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      case 'goals':
        return <BarChart2 className="h-6 w-6 text-indigo-600" />;
      default:
        return <Clock className="h-6 w-6 text-primary" />;
    }
  };
  
  const getIconBackground = () => {
    switch (icon) {
      case 'time':
        return 'bg-primary-100';
      case 'apps':
        return 'bg-secondary-100';
      case 'privacy':
        return 'bg-yellow-100';
      case 'goals':
        return 'bg-indigo-100';
      default:
        return 'bg-primary-100';
    }
  };
  
  const getChangeColor = () => {
    if (variant === 'positive') return 'text-green-600';
    if (variant === 'negative') return 'text-red-600';
    if (variant === 'warning') return 'text-yellow-600';
    if (variant === 'neutral') return 'text-indigo-600';
    
    // If no variant is specified, determine by change direction
    if (change === undefined) return 'text-gray-600';
    return change > 0 ? 'text-red-600' : 'text-green-600';
  };
  
  const getChangeIcon = () => {
    if (change === undefined) return null;
    return change > 0 ? 
      <ArrowUpRight className="self-center flex-shrink-0 h-5 w-5" /> : 
      <ArrowDownRight className="self-center flex-shrink-0 h-5 w-5" />;
  };
  
  return (
    <Card className="bg-white overflow-hidden shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={cn("flex-shrink-0 rounded-md p-3", getIconBackground())}>
            {getIcon()}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                {change !== undefined && (
                  <div className={cn("ml-2 flex items-baseline text-sm font-semibold", getChangeColor())}>
                    {getChangeIcon()}
                    <span className="sr-only">{change > 0 ? 'Increased' : 'Decreased'} by</span>
                    {changeText || `${Math.abs(change)}%`}
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </Card>
  );
}
