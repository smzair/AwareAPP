import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import TimeDistributionChart from '@/components/dashboard/TimeDistributionChart';
import AppUsageList from '@/components/dashboard/AppUsageList';
import AdPredictionCard from '@/components/dashboard/AdPredictionCard';
import PrivacyMeter from '@/components/dashboard/PrivacyMeter';
import GoalsList from '@/components/dashboard/GoalsList';
import RecommendationsList from '@/components/dashboard/RecommendationsList';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { 
  appUsageData, 
  timeDistributionData, 
  adPredictions, 
  privacyData,
  privacyScore,
  goalsData,
  recommendationsData,
  dashboardStats
} from '@/data/mockData';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="md:flex md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500">Your digital behavior analysis and insights for the past 7 days</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <div className="relative inline-block text-left">
            <select className="block appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-primary focus:border-primary">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Custom range</option>
            </select>
          </div>
          
          <Button variant="outline" className="ml-3" size="sm">
            <Download className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Daily Screen Time" 
          value={dashboardStats.screenTime.value} 
          change={dashboardStats.screenTime.change} 
          variant="negative"
          icon="time" 
        />
        <StatsCard 
          title="Apps Used Today" 
          value={dashboardStats.appsUsed.value} 
          change={dashboardStats.appsUsed.change} 
          variant="positive"
          icon="apps" 
        />
        <StatsCard 
          title="Privacy Risk Score" 
          value={dashboardStats.privacyRisk.value} 
          changeText={dashboardStats.privacyRisk.level}
          variant="warning"
          icon="privacy" 
        />
        <StatsCard 
          title="Digital Goals Progress" 
          value={`${dashboardStats.goalsProgress.completed}/${dashboardStats.goalsProgress.total}`} 
          change={dashboardStats.goalsProgress.change} 
          changeText="1 goal"
          variant="neutral"
          icon="goals" 
        />
      </div>

      {/* Digital Footprint */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Digital Footprint Analyzer</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TimeDistributionChart data={timeDistributionData} />
          <AppUsageList apps={appUsageData} />
        </div>
      </div>

      {/* Ad Prediction & Privacy Exposure */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdPredictionCard predictions={adPredictions} />
        <PrivacyMeter score={privacyScore} appData={privacyData} />
      </div>

      {/* Goals & Recommendations */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <GoalsList goals={goalsData} />
        </div>
        <RecommendationsList recommendations={recommendationsData} />
      </div>
    </MainLayout>
  );
}
