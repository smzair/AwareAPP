import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { userData } from '@/data/mockData';
import { Settings as SettingsIcon, User, Bell, Shield, Upload, Database } from 'lucide-react';

export default function Settings() {
  return (
    <MainLayout>
      <div className="md:flex md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your account and application preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="mb-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-base font-medium text-gray-900">Profile Settings</h3>
              </div>
              
              <div className="flex items-center mb-6">
                <img 
                  src={userData.avatar} 
                  alt="Profile" 
                  className="h-16 w-16 rounded-full object-cover mr-4" 
                />
                <Button variant="outline">Change Photo</Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" defaultValue={userData.displayName} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue={userData.username} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="emma.johnson@example.com" type="email" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone" 
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    <option>Eastern Time (US & Canada)</option>
                    <option>Central Time (US & Canada)</option>
                    <option>Pacific Time (US & Canada)</option>
                    <option>UTC</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <Bell className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-base font-medium text-gray-900">Notification Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Daily Summary</p>
                    <p className="text-xs text-gray-500">Receive a daily summary of your digital activity</p>
                  </div>
                  <Switch id="daily-summary" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Goal Alerts</p>
                    <p className="text-xs text-gray-500">Get notified when you're close to exceeding your set limits</p>
                  </div>
                  <Switch id="goal-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Privacy Alerts</p>
                    <p className="text-xs text-gray-500">Be alerted when apps access sensitive permissions</p>
                  </div>
                  <Switch id="privacy-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Weekly Reports</p>
                    <p className="text-xs text-gray-500">Receive weekly analysis of your digital behavior</p>
                  </div>
                  <Switch id="weekly-reports" defaultChecked />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-base font-medium text-gray-900">Privacy Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Usage Analytics</p>
                    <p className="text-xs text-gray-500">Allow Aware to analyze your app and website usage</p>
                  </div>
                  <Switch id="usage-analytics" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Permission Monitoring</p>
                    <p className="text-xs text-gray-500">Monitor when apps access device permissions</p>
                  </div>
                  <Switch id="permission-monitoring" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Data Sharing</p>
                    <p className="text-xs text-gray-500">Share anonymized usage data to improve recommendations</p>
                  </div>
                  <Switch id="data-sharing" />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <Database className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-base font-medium text-gray-900">Data Management</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Import Data</h4>
                  <p className="text-xs text-gray-500 mb-3">
                    Upload app usage data from other devices or services
                  </p>
                  <Button variant="outline" className="flex items-center">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Data
                  </Button>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Export Your Data</h4>
                  <p className="text-xs text-gray-500 mb-3">
                    Download a copy of your activity data and settings
                  </p>
                  <Button variant="outline">Export Data</Button>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Data Retention</h4>
                  <p className="text-xs text-gray-500 mb-3">
                    Control how long your data is stored
                  </p>
                  <select 
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    <option>90 days</option>
                    <option>6 months</option>
                    <option>1 year</option>
                    <option>Forever</option>
                  </select>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Delete Account Data</h4>
                  <p className="text-xs text-gray-500 mb-3">
                    Permanently delete all your data from Aware
                  </p>
                  <Button variant="destructive">Delete All Data</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
