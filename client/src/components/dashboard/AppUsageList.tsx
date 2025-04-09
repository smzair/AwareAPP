import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AppUsage } from '@shared/schema';
import { 
  MessageSquare, 
  Camera, 
  Youtube, 
  Mail, 
  Globe,
  MessageCircle
} from 'lucide-react';

interface AppUsageListProps {
  apps: AppUsage[];
}

export default function AppUsageList({ apps }: AppUsageListProps) {
  // Sort apps by time spent (descending)
  const sortedApps = [...apps].sort((a, b) => b.timeSpent - a.timeSpent);
  
  // Get the max time spent to calculate percentages
  const maxTimeSpent = sortedApps[0]?.timeSpent || 0;
  
  const getAppIcon = (appName: string) => {
    switch (appName.toLowerCase()) {
      case 'whatsapp':
        return <MessageSquare className="h-6 w-6 text-blue-600" />;
      case 'instagram':
        return <Camera className="h-6 w-6 text-purple-600" />;
      case 'youtube':
        return <Youtube className="h-6 w-6 text-red-600" />;
      case 'gmail':
        return <Mail className="h-6 w-6 text-green-600" />;
      case 'chrome':
        return <Globe className="h-6 w-6 text-indigo-600" />;
      case 'tiktok':
        return <MessageCircle className="h-6 w-6 text-red-600" />;
      default:
        return <Globe className="h-6 w-6 text-gray-600" />;
    }
  };
  
  const getAppIconBackground = (appName: string) => {
    switch (appName.toLowerCase()) {
      case 'whatsapp':
        return 'bg-blue-100';
      case 'instagram':
        return 'bg-purple-100';
      case 'youtube':
        return 'bg-red-100';
      case 'gmail':
        return 'bg-green-100';
      case 'chrome':
        return 'bg-indigo-100';
      case 'tiktok':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };
  
  const getAppProgressColor = (appName: string) => {
    switch (appName.toLowerCase()) {
      case 'whatsapp':
        return 'bg-blue-600';
      case 'instagram':
        return 'bg-purple-600';
      case 'youtube':
        return 'bg-red-600';
      case 'gmail':
        return 'bg-green-600';
      case 'chrome':
        return 'bg-indigo-600';
      case 'tiktok':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };
  
  const formatTimeSpent = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes > 0 ? remainingMinutes + 'm' : ''}`;
  };
  
  return (
    <Card className="bg-white shadow rounded-lg h-full">
      <CardContent className="p-6">
        <h3 className="text-base font-medium text-gray-900 mb-4">Most Used Applications</h3>
        <div className="space-y-4">
          {sortedApps.map((app) => (
            <div key={app.id} className="flex items-center">
              <div className={`flex-shrink-0 h-10 w-10 rounded-full ${getAppIconBackground(app.appName)} flex items-center justify-center`}>
                {getAppIcon(app.appName)}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{app.appName}</h4>
                  <span className="text-sm text-gray-500">{formatTimeSpent(app.timeSpent)}</span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${getAppProgressColor(app.appName)} h-2 rounded-full`} 
                    style={{ width: `${(app.timeSpent / maxTimeSpent) * 100}%` }}
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
