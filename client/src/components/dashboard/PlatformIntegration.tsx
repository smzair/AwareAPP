import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Check, 
  Plus, 
  Search, 
  Trash2, 
  Shield,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Github,
  Chrome,
  Smartphone,
  BookOpen,
  Mail,
  AlertCircle
} from 'lucide-react';

// Platform types
type PlatformType = 'social' | 'productivity' | 'entertainment' | 'communication' | 'other';

// Platform interface
interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: PlatformType;
  connected: boolean;
  permissions: {
    activity: boolean;
    contacts: boolean;
    content: boolean;
    location: boolean;
  };
}

export default function PlatformIntegration() {
  // Sample platform data
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      type: 'social',
      connected: true,
      permissions: {
        activity: true,
        contacts: true,
        content: true,
        location: true
      }
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="h-5 w-5" />,
      type: 'social',
      connected: true,
      permissions: {
        activity: true,
        contacts: true,
        content: true,
        location: false
      }
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      type: 'social',
      connected: false,
      permissions: {
        activity: false,
        contacts: false,
        content: false,
        location: false
      }
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <Youtube className="h-5 w-5" />,
      type: 'entertainment',
      connected: true,
      permissions: {
        activity: true,
        contacts: false,
        content: false,
        location: false
      }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      type: 'social',
      connected: false,
      permissions: {
        activity: false,
        contacts: false,
        content: false,
        location: false
      }
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: <Github className="h-5 w-5" />,
      type: 'productivity',
      connected: true,
      permissions: {
        activity: true,
        contacts: false,
        content: true,
        location: false
      }
    },
    {
      id: 'chrome',
      name: 'Chrome Browser',
      icon: <Chrome className="h-5 w-5" />,
      type: 'productivity',
      connected: true,
      permissions: {
        activity: true,
        contacts: false,
        content: false,
        location: false
      }
    },
    {
      id: 'android',
      name: 'Android Device',
      icon: <Smartphone className="h-5 w-5" />,
      type: 'other',
      connected: true,
      permissions: {
        activity: true,
        contacts: true,
        content: true,
        location: true
      }
    },
    {
      id: 'kindle',
      name: 'Kindle',
      icon: <BookOpen className="h-5 w-5" />,
      type: 'entertainment',
      connected: false,
      permissions: {
        activity: false,
        contacts: false,
        content: false,
        location: false
      }
    },
    {
      id: 'gmail',
      name: 'Gmail',
      icon: <Mail className="h-5 w-5" />,
      type: 'communication',
      connected: true,
      permissions: {
        activity: true,
        contacts: true,
        content: false,
        location: false
      }
    }
  ]);

  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Toggle platform connection
  const toggleConnection = (platformId: string) => {
    setPlatforms(platforms.map(platform => 
      platform.id === platformId 
        ? { 
            ...platform, 
            connected: !platform.connected,
            permissions: platform.connected 
              ? { activity: false, contacts: false, content: false, location: false }
              : { activity: true, contacts: false, content: false, location: false }
          } 
        : platform
    ));
  };
  
  // Toggle permission
  const togglePermission = (platformId: string, permission: keyof Platform['permissions']) => {
    setPlatforms(platforms.map(platform => 
      platform.id === platformId 
        ? { 
            ...platform, 
            permissions: { 
              ...platform.permissions, 
              [permission]: !platform.permissions[permission] 
            } 
          } 
        : platform
    ));
  };
  
  // Filter platforms based on active tab and search query
  const filteredPlatforms = platforms.filter(platform => {
    const matchesTab = activeTab === 'all' || platform.type === activeTab || 
                      (activeTab === 'connected' && platform.connected) ||
                      (activeTab === 'not-connected' && !platform.connected);
    
    const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Platform Integrations</h3>
            <p className="text-sm text-gray-500">Connect platforms to track your digital activity</p>
          </div>
          
          <Button className="mt-4 md:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Platform
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search platforms..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="md:w-auto"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-1">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="connected">Connected</TabsTrigger>
              <TabsTrigger value="not-connected">Available</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Tabs value={activeTab === 'all' ? 'all-platforms' : activeTab}>
          <TabsContent value="all-platforms" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredPlatforms.map(platform => (
                <div key={platform.id} className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {platform.icon}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{platform.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{platform.type}</p>
                      </div>
                    </div>
                    <Switch
                      checked={platform.connected}
                      onCheckedChange={() => toggleConnection(platform.id)}
                    />
                  </div>
                  
                  {platform.connected && (
                    <div className="p-4 border-t border-gray-200">
                      <h4 className="text-xs font-medium text-gray-900 mb-3">Data Access</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`activity-${platform.id}`} className="text-xs">
                            Activity Tracking
                          </Label>
                          <Switch
                            id={`activity-${platform.id}`}
                            checked={platform.permissions.activity}
                            onCheckedChange={() => togglePermission(platform.id, 'activity')}
                            className="scale-75"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`contacts-${platform.id}`} className="text-xs">
                            Contacts Data
                          </Label>
                          <Switch
                            id={`contacts-${platform.id}`}
                            checked={platform.permissions.contacts}
                            onCheckedChange={() => togglePermission(platform.id, 'contacts')}
                            className="scale-75"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`content-${platform.id}`} className="text-xs">
                            Content Analysis
                          </Label>
                          <Switch
                            id={`content-${platform.id}`}
                            checked={platform.permissions.content}
                            onCheckedChange={() => togglePermission(platform.id, 'content')}
                            className="scale-75"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`location-${platform.id}`} className="text-xs">
                            Location Data
                          </Label>
                          <Switch
                            id={`location-${platform.id}`}
                            checked={platform.permissions.location}
                            onCheckedChange={() => togglePermission(platform.id, 'location')}
                            className="scale-75"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="connected" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredPlatforms.map(platform => (
                <div key={platform.id} className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {platform.icon}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{platform.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{platform.type}</p>
                      </div>
                    </div>
                    <Switch
                      checked={platform.connected}
                      onCheckedChange={() => toggleConnection(platform.id)}
                    />
                  </div>
                  
                  {platform.connected && (
                    <div className="p-4 border-t border-gray-200">
                      <h4 className="text-xs font-medium text-gray-900 mb-3">Data Access</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`activity-c-${platform.id}`} className="text-xs">
                            Activity Tracking
                          </Label>
                          <Switch
                            id={`activity-c-${platform.id}`}
                            checked={platform.permissions.activity}
                            onCheckedChange={() => togglePermission(platform.id, 'activity')}
                            className="scale-75"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`contacts-c-${platform.id}`} className="text-xs">
                            Contacts Data
                          </Label>
                          <Switch
                            id={`contacts-c-${platform.id}`}
                            checked={platform.permissions.contacts}
                            onCheckedChange={() => togglePermission(platform.id, 'contacts')}
                            className="scale-75"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`content-c-${platform.id}`} className="text-xs">
                            Content Analysis
                          </Label>
                          <Switch
                            id={`content-c-${platform.id}`}
                            checked={platform.permissions.content}
                            onCheckedChange={() => togglePermission(platform.id, 'content')}
                            className="scale-75"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`location-c-${platform.id}`} className="text-xs">
                            Location Data
                          </Label>
                          <Switch
                            id={`location-c-${platform.id}`}
                            checked={platform.permissions.location}
                            onCheckedChange={() => togglePermission(platform.id, 'location')}
                            className="scale-75"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="not-connected" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredPlatforms.map(platform => (
                <div key={platform.id} className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {platform.icon}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{platform.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{platform.type}</p>
                      </div>
                    </div>
                    <Button size="sm" className="h-8" variant={platform.connected ? "outline" : "default"} onClick={() => toggleConnection(platform.id)}>
                      {platform.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <AlertCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900">About Platform Integrations</h4>
              <p className="mt-1 text-sm text-gray-500">
                Connect your digital platforms to track usage patterns, privacy exposure, and set goals. Your data is processed locally and never shared with third parties.
              </p>
              <div className="mt-3 flex items-center">
                <Shield className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">End-to-end encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}