import React from 'react';
import { CategoryBreakdown } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface CategoryBreakdownProps {
  categories: CategoryBreakdown[];
}

const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export default function CategoryBreakdownChart({ categories }: CategoryBreakdownProps) {
  // Sort categories by percentage in descending order
  const sortedCategories = [...categories].sort((a, b) => b.percentage - a.percentage);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Digital Activity by Category</h3>
          <span className="text-sm text-gray-500">This Week</span>
        </div>

        <div className="space-y-4">
          {sortedCategories.map((category) => (
            <div key={category.id}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{category.percentage}%</span>
                  {category.trend === 'up' && (
                    <div className="flex items-center text-green-600 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {category.trendPercentage}%
                    </div>
                  )}
                  {category.trend === 'down' && (
                    <div className="flex items-center text-red-600 text-xs">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      {category.trendPercentage}%
                    </div>
                  )}
                  {category.trend === 'stable' && (
                    <div className="flex items-center text-gray-600 text-xs">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      {category.trendPercentage}%
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress 
                  value={category.percentage} 
                  className="flex-1 h-2"
                  style={{ 
                    '--progress-background': category.color
                  } as React.CSSProperties} 
                />
                <span className="text-xs text-gray-500 min-w-[60px]">
                  {formatTime(category.timeSpent)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-600">Total Time</h4>
            <p className="text-2xl font-bold mt-1">
              {formatTime(categories.reduce((sum, cat) => sum + cat.timeSpent, 0))}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-600">Top Category</h4>
            <p className="text-2xl font-bold mt-1">
              {sortedCategories[0]?.name || 'N/A'}
            </p>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>
            Your {sortedCategories[0]?.name || 'Social Media'} usage has increased by {sortedCategories[0]?.trendPercentage || 8}% compared to last week. Consider setting limits to maintain digital balance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}