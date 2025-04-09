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
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-900">Social Media Apps</h4>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      High Risk
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border rounded-md overflow-hidden">
                      <div className="flex items-center justify-between p-4 bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">FB</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              Facebook
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              Last accessed: 18 minutes ago
                            </p>
                          </div>
                        </div>
                        <div>
                          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            Review
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Location</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Microphone</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Contacts</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Photos</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Camera</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Storage</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 bg-red-50 p-3 rounded-md">
                          <p className="text-xs text-red-700">
                            <span className="font-medium">High risk:</span> Facebook has extensive permissions and accesses your data in the background. Consider limiting permissions.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md overflow-hidden">
                      <div className="flex items-center justify-between p-4 bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                            <span className="text-pink-600 font-semibold">IG</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              Instagram
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              Last accessed: 2 hours ago
                            </p>
                          </div>
                        </div>
                        <div>
                          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            Review
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-orange-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Location</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-gray-300 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Microphone</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Contacts</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Photos</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-orange-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Camera</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-orange-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Storage</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 bg-orange-50 p-3 rounded-md">
                          <p className="text-xs text-orange-700">
                            <span className="font-medium">Medium risk:</span> Instagram has access to your contacts and photos. Consider restricting these permissions.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md overflow-hidden">
                      <div className="flex items-center justify-between p-4 bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                            <span className="text-red-600 font-semibold">TT</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              TikTok
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              Last accessed: Yesterday
                            </p>
                          </div>
                        </div>
                        <div>
                          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            Review
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-orange-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Location</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Microphone</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-orange-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Contacts</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Photos</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Camera</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-orange-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Storage</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 bg-red-50 p-3 rounded-md">
                          <p className="text-xs text-red-700">
                            <span className="font-medium">High risk:</span> TikTok has been observed accessing microphone in the background. Consider revoking microphone access.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-900">Productivity Apps</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Low Risk
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border rounded-md overflow-hidden">
                      <div className="flex items-center justify-between p-4 bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">GD</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              Google Docs
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              Last accessed: 4 hours ago
                            </p>
                          </div>
                        </div>
                        <div>
                          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            Review
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-gray-300 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Location</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-gray-300 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Microphone</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-gray-300 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Contacts</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Photos</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-gray-300 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Camera</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">Storage</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 bg-green-50 p-3 rounded-md">
                          <p className="text-xs text-green-700">
                            <span className="font-medium">Low risk:</span> Google Docs only has necessary permissions for its functionality.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-900">Permission Management</h4>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 mb-4">
                    Manage access by permission type instead of by app
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border p-3 rounded-md bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-red-100 p-2 rounded-full mr-2">
                            <Eye className="h-4 w-4 text-red-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Location Services</span>
                        </div>
                        <button className="text-xs text-blue-600 font-medium">Manage</button>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        7 apps have location access
                      </p>
                    </div>
                    
                    <div className="border p-3 rounded-md bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-red-100 p-2 rounded-full mr-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Microphone Access</span>
                        </div>
                        <button className="text-xs text-blue-600 font-medium">Manage</button>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        3 apps have microphone access
                      </p>
                    </div>
                    
                    <div className="border p-3 rounded-md bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-orange-100 p-2 rounded-full mr-2">
                            <Lock className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Contacts</span>
                        </div>
                        <button className="text-xs text-blue-600 font-medium">Manage</button>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        5 apps have contacts access
                      </p>
                    </div>
                    
                    <div className="border p-3 rounded-md bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-orange-100 p-2 rounded-full mr-2">
                            <Shield className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Photos & Media</span>
                        </div>
                        <button className="text-xs text-blue-600 font-medium">Manage</button>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        6 apps have media access
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">Data Access History</h3>
                <p className="text-sm text-gray-500 mb-6">
                  See which apps have accessed your data and when
                </p>
                
                <div className="space-y-4">
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-amber-100 rounded-full p-2 mr-3">
                          <Eye className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-amber-900">Location Data Exposure</h4>
                          <p className="text-xs text-amber-700">High risk</p>
                        </div>
                      </div>
                      <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">
                        5 Apps
                      </span>
                    </div>
                    <p className="text-sm text-amber-700">
                      Your location data is being accessed by multiple apps, including while they run in the background.
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-amber-900">Facebook</span>
                        <span className="text-amber-700">42 times this week</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-amber-900">Instagram</span>
                        <span className="text-amber-700">28 times this week</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-amber-900">Maps</span>
                        <span className="text-amber-700">15 times this week</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-md border border-red-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-red-100 rounded-full p-2 mr-3">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-red-900">Microphone Access</h4>
                          <p className="text-xs text-red-700">Critical risk</p>
                        </div>
                      </div>
                      <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">
                        3 Apps
                      </span>
                    </div>
                    <p className="text-sm text-red-700">
                      Some apps are accessing your microphone in the background without active use.
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-red-900">TikTok</span>
                        <span className="text-red-700">12 times this week</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-red-900">Facebook</span>
                        <span className="text-red-700">8 times this week</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <Eye className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-blue-900">Contacts Access</h4>
                          <p className="text-xs text-blue-700">Medium risk</p>
                        </div>
                      </div>
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                        4 Apps
                      </span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Multiple apps have accessed your contact list in the last week.
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-blue-900">WhatsApp</span>
                        <span className="text-blue-700">Regular access</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-blue-900">Instagram</span>
                        <span className="text-blue-700">6 times this week</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-blue-900">LinkedIn</span>
                        <span className="text-blue-700">4 times this week</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">Data Sharing Overview</h3>
                
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Location Data</span>
                      <span className="text-sm text-gray-500">78%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full" style={{ width: '78%' }}></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">High exposure - 7 apps have access</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Contact List</span>
                      <span className="text-sm text-gray-500">65%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Medium exposure - 5 apps have access</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Photos & Media</span>
                      <span className="text-sm text-gray-500">54%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full" style={{ width: '54%' }}></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Medium exposure - 6 apps have access</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Microphone</span>
                      <span className="text-sm text-gray-500">42%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full" style={{ width: '42%' }}></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Moderate exposure - 3 apps have access</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Camera</span>
                      <span className="text-sm text-gray-500">38%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full" style={{ width: '38%' }}></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Moderate exposure - 4 apps have access</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Health Data</span>
                      <span className="text-sm text-gray-500">12%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: '12%' }}></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Low exposure - 1 app has access</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Data Brokers</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Your data may have been shared with these third-party data brokers through the apps you use:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h5 className="text-sm font-medium text-gray-900">AdvertisingIQ</h5>
                      <p className="text-xs text-gray-500 mt-1">
                        May have your browsing history and app usage patterns
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h5 className="text-sm font-medium text-gray-900">DataMetrics</h5>
                      <p className="text-xs text-gray-500 mt-1">
                        May have your location history and demographic information
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h5 className="text-sm font-medium text-gray-900">AcmeAnalytics</h5>
                      <p className="text-xs text-gray-500 mt-1">
                        May have your purchase history and interests
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h5 className="text-sm font-medium text-gray-900">ProfilePulse</h5>
                      <p className="text-xs text-gray-500 mt-1">
                        May have your social connections and online behavior
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Privacy Recommendations</h3>
                    <p className="text-sm text-gray-500">
                      Steps you can take to improve your privacy posture
                    </p>
                  </div>
                  <div className="bg-purple-100 rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-purple-800">Priority Actions: 3</span>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="bg-red-50 p-4 rounded-md border border-red-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-red-900">Revoke Microphone Access</h4>
                        <p className="mt-1 text-sm text-red-700">
                          TikTok and Facebook are accessing your microphone in the background. Consider revoking microphone permissions for these apps.
                        </p>
                        <div className="mt-3">
                          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700">
                            Take Action
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-amber-900">Limit Location Tracking</h4>
                        <p className="mt-1 text-sm text-amber-700">
                          Multiple apps are tracking your location. Set location permissions to "While Using" instead of "Always" for better privacy.
                        </p>
                        <div className="mt-3">
                          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-amber-600 hover:bg-amber-700">
                            Take Action
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Lock className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-blue-900">Update Privacy Settings</h4>
                        <p className="mt-1 text-sm text-blue-700">
                          Instagram, Facebook and TikTok have default settings that allow extensive data collection. Review and update your privacy settings in these apps.
                        </p>
                        <div className="mt-3">
                          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700">
                            View Settings Guide
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Clock className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Schedule Privacy Audit</h4>
                        <p className="mt-1 text-sm text-gray-700">
                          Set up a monthly privacy audit to review app permissions and data access.
                        </p>
                        <div className="mt-3">
                          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                            Schedule Audit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">Privacy Tools & Resources</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-full p-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <h4 className="ml-3 text-sm font-medium text-gray-900">Privacy VPN</h4>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Encrypt your internet connection and mask your location data.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <div className="bg-purple-100 rounded-full p-2">
                        <Eye className="h-5 w-5 text-purple-600" />
                      </div>
                      <h4 className="ml-3 text-sm font-medium text-gray-900">Ad Blockers</h4>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Block tracking cookies and intrusive advertisements.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <div className="bg-green-100 rounded-full p-2">
                        <Lock className="h-5 w-5 text-green-600" />
                      </div>
                      <h4 className="ml-3 text-sm font-medium text-gray-900">Password Manager</h4>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Secure your accounts with strong, unique passwords.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <div className="bg-orange-100 rounded-full p-2">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                      </div>
                      <h4 className="ml-3 text-sm font-medium text-gray-900">Data Removal Service</h4>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Remove your personal data from data broker databases.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Educational Resources</h4>
                  
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      <p className="ml-2 text-sm text-gray-600">
                        <span className="font-medium text-gray-900">Privacy Guide:</span> 10 Simple Steps to Secure Your Digital Life
                      </p>
                    </li>
                    <li className="flex items-center">
                      <div className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      <p className="ml-2 text-sm text-gray-600">
                        <span className="font-medium text-gray-900">Workshop:</span> Understanding Digital Privacy in 2023
                      </p>
                    </li>
                    <li className="flex items-center">
                      <div className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      <p className="ml-2 text-sm text-gray-600">
                        <span className="font-medium text-gray-900">Checklist:</span> Monthly Privacy Audit Template
                      </p>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
