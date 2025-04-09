import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PrivacyScore, PrivacyData, AppPermission } from '@shared/schema';
import { appPermissions } from '@/data/mockData';
import { 
  MapPin,
  Mic,
  Camera,
  Calendar,
  HardDrive,
  Music,
  AlertTriangle
} from 'lucide-react';

interface PrivacyMeterProps {
  score: PrivacyScore;
  appData: PrivacyData[];
}

export default function PrivacyMeter({ score, appData }: PrivacyMeterProps) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'high':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
  
  const getRiskBgColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getAppIconBackground = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return 'bg-green-100';
      case 'medium':
        return 'bg-yellow-100';
      case 'high':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };
  
  const getAppIcon = (appName: string) => {
    switch (appName.toLowerCase()) {
      case 'tiktok':
        return <Music className="h-5 w-5 text-red-600" />;
      case 'facebook':
        return <AlertTriangle className="h-5 w-5 text-blue-600" />;
      case 'notes':
        return <Calendar className="h-5 w-5 text-green-600" />;
      case 'instagram':
        return <Camera className="h-5 w-5 text-purple-600" />;
      case 'whatsapp':
        return <Mic className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };
  
  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case 'location':
        return <MapPin className="mr-1 h-3 w-3 text-gray-400" />;
      case 'microphone':
        return <Mic className="mr-1 h-3 w-3 text-gray-400" />;
      case 'camera':
        return <Camera className="mr-1 h-3 w-3 text-gray-400" />;
      case 'contacts':
        return <Calendar className="mr-1 h-3 w-3 text-gray-400" />;
      case 'storage':
        return <HardDrive className="mr-1 h-3 w-3 text-gray-400" />;
      default:
        return <AlertTriangle className="mr-1 h-3 w-3 text-gray-400" />;
    }
  };
  
  return (
    <Card className="bg-white shadow rounded-lg h-full">
      <CardContent className="p-6">
        <h3 className="text-base font-medium text-gray-900 mb-4">Privacy Exposure Meter</h3>
        <div className="flex items-center mb-6">
          <div className="w-1/2">
            <div className="relative pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    Overall Privacy Risk
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold inline-block ${getRiskColor(score.riskLevel)}`}>
                    {score.score}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div 
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getRiskBgColor(score.riskLevel)}`} 
                  style={{ width: `${score.score}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-6">
            <div className="text-center">
              <div className={`text-xl font-bold ${getRiskColor(score.riskLevel)}`}>
                {score.riskLevel === 'low' ? 'Low Risk' : score.riskLevel === 'medium' ? 'Medium Risk' : 'High Risk'}
              </div>
              <div className="text-xs text-gray-500 mt-1">{score.appsWithHighAccess} apps with high data access</div>
            </div>
          </div>
        </div>
        
        <h4 className="text-sm font-medium text-gray-900 mb-2">App Permissions Breakdown</h4>
        <div className="space-y-3 max-h-56 overflow-y-auto pr-2 scrollbar-hide">
          {appData.map(app => (
            <div key={app.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full ${getAppIconBackground(app.riskLevel)} flex items-center justify-center`}>
                    {getAppIcon(app.appName)}
                  </div>
                  <div className="ml-3">
                    <h5 className="text-sm font-medium text-gray-900">{app.appName}</h5>
                    <span className={`text-xs ${getRiskColor(app.riskLevel)}`}>
                      {app.riskLevel === 'low' ? 'Low risk' : app.riskLevel === 'medium' ? 'Medium risk' : 'High risk'}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-primary hover:text-indigo-800">
                  Review
                </Button>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-1">
                {(app.permissions.items as string[]).map((permission, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                    {getPermissionIcon(permission)}
                    {appPermissions[permission]?.name || permission}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button className="w-full">
            <ShieldCheck className="mr-2 h-5 w-5 text-gray-400" />
            Run Privacy Audit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ShieldCheck(props: React.ComponentProps<typeof AlertTriangle>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
