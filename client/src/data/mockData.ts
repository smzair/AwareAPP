import { 
  AppUsage, 
  PrivacyData, 
  Goal, 
  Recommendation, 
  TimeDistributionData, 
  AdPrediction, 
  PrivacyScore, 
  AppPermission,
  DashboardStats 
} from '@shared/schema';

// Website usage data with visit statistics
export interface WebsiteUsage {
  id: number;
  domain: string;
  title: string;
  category: string;
  visitCount: number;
  timeSpent: number; // in minutes
  lastVisited: Date;
  icon?: string;
}

// Categories breakdown
export interface CategoryBreakdown {
  id: number;
  name: string;
  percentage: number;
  timeSpent: number; // in minutes
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  color: string;
}

// App usage data
export const appUsageData: AppUsage[] = [
  {
    id: 1,
    userId: 1,
    date: new Date('2023-06-01T00:00:00.000Z'),
    appName: 'WhatsApp',
    category: 'Social',
    timeSpent: 105, // in minutes
    openCount: 24,
    metadata: { color: 'blue' }
  },
  {
    id: 2,
    userId: 1,
    date: new Date('2023-06-01T00:00:00.000Z'),
    appName: 'Instagram',
    category: 'Social',
    timeSpent: 72,
    openCount: 18,
    metadata: { color: 'purple' }
  },
  {
    id: 3,
    userId: 1,
    date: new Date('2023-06-01T00:00:00.000Z'),
    appName: 'YouTube',
    category: 'Entertainment',
    timeSpent: 55,
    openCount: 8,
    metadata: { color: 'red' }
  },
  {
    id: 4,
    userId: 1,
    date: new Date('2023-06-01T00:00:00.000Z'),
    appName: 'Gmail',
    category: 'Productivity',
    timeSpent: 42,
    openCount: 15,
    metadata: { color: 'green' }
  },
  {
    id: 5,
    userId: 1,
    date: new Date('2023-06-01T00:00:00.000Z'),
    appName: 'Chrome',
    category: 'Productivity',
    timeSpent: 35,
    openCount: 10,
    metadata: { color: 'indigo' }
  },
  {
    id: 6,
    userId: 1,
    date: new Date('2023-06-01T00:00:00.000Z'),
    appName: 'TikTok',
    category: 'Social',
    timeSpent: 85,
    openCount: 12,
    metadata: { color: 'red' }
  }
];

// Time distribution data
export const timeDistributionData: TimeDistributionData[] = [
  { day: 'Mon', social: 90, productivity: 45, entertainment: 60, other: 20 },
  { day: 'Tue', social: 65, productivity: 80, entertainment: 45, other: 25 },
  { day: 'Wed', social: 80, productivity: 50, entertainment: 30, other: 15 },
  { day: 'Thu', social: 81, productivity: 60, entertainment: 70, other: 35 },
  { day: 'Fri', social: 56, productivity: 75, entertainment: 50, other: 40 },
  { day: 'Sat', social: 105, productivity: 30, entertainment: 90, other: 20 },
  { day: 'Sun', social: 120, productivity: 25, entertainment: 70, other: 30 }
];

// Dashboard stats
export const dashboardStats: DashboardStats = {
  screenTime: {
    value: '5h 24m',
    change: 12
  },
  appsUsed: {
    value: 12,
    change: -3
  },
  privacyRisk: {
    value: '65/100',
    score: 65,
    level: 'Medium Risk'
  },
  goalsProgress: {
    completed: 2,
    total: 4,
    change: 1
  }
};

// Privacy data
export const privacyData: PrivacyData[] = [
  {
    id: 1,
    userId: 1,
    appName: 'TikTok',
    riskLevel: 'high',
    permissions: {
      items: ['location', 'microphone', 'camera', 'contacts']
    }
  },
  {
    id: 2,
    userId: 1,
    appName: 'Facebook',
    riskLevel: 'medium',
    permissions: {
      items: ['location', 'camera', 'contacts']
    }
  },
  {
    id: 3,
    userId: 1,
    appName: 'Notes',
    riskLevel: 'low',
    permissions: {
      items: ['camera']
    }
  },
  {
    id: 4,
    userId: 1,
    appName: 'Instagram',
    riskLevel: 'medium',
    permissions: {
      items: ['location', 'camera', 'contacts', 'storage']
    }
  },
  {
    id: 5,
    userId: 1,
    appName: 'WhatsApp',
    riskLevel: 'medium',
    permissions: {
      items: ['contacts', 'microphone', 'camera', 'storage']
    }
  }
];

// App permissions
export const appPermissions: Record<string, AppPermission> = {
  location: {
    name: 'Location',
    icon: 'MapPin'
  },
  microphone: {
    name: 'Microphone',
    icon: 'Mic'
  },
  camera: {
    name: 'Camera',
    icon: 'Camera'
  },
  contacts: {
    name: 'Contacts',
    icon: 'Calendar'
  },
  storage: {
    name: 'Storage',
    icon: 'HardDrive'
  }
};

// Privacy score
export const privacyScore: PrivacyScore = {
  score: 65,
  riskLevel: 'medium',
  appsWithHighAccess: 8
};

// Privacy timeline data structure
export interface PrivacyTimelineEntry {
  id: number;
  date: Date;
  score: number; 
  riskLevel: 'low' | 'medium' | 'high';
  significantEvents: {
    type: 'app_install' | 'permission_change' | 'data_breach' | 'privacy_audit' | 'setting_change';
    description: string;
    impact: number; // Positive or negative impact on privacy score
  }[];
  dataShared: {
    category: string;
    amount: number; // Percentage or some metric
  }[];
}

// Historical privacy timeline data
export const privacyTimelineData: PrivacyTimelineEntry[] = [
  {
    id: 1,
    date: new Date('2023-01-01'),
    score: 78,
    riskLevel: 'low',
    significantEvents: [
      {
        type: 'privacy_audit',
        description: 'Initial privacy audit performed',
        impact: 5
      }
    ],
    dataShared: [
      { category: 'Location', amount: 25 },
      { category: 'Contacts', amount: 15 },
      { category: 'Media', amount: 10 }
    ]
  },
  {
    id: 2,
    date: new Date('2023-02-01'),
    score: 72,
    riskLevel: 'low',
    significantEvents: [
      {
        type: 'app_install',
        description: 'Installed social media app with high data access',
        impact: -6
      }
    ],
    dataShared: [
      { category: 'Location', amount: 28 },
      { category: 'Contacts', amount: 22 },
      { category: 'Media', amount: 15 }
    ]
  },
  {
    id: 3,
    date: new Date('2023-03-01'),
    score: 68,
    riskLevel: 'medium',
    significantEvents: [
      {
        type: 'permission_change',
        description: 'Increased permissions for 3 apps',
        impact: -4
      }
    ],
    dataShared: [
      { category: 'Location', amount: 35 },
      { category: 'Contacts', amount: 30 },
      { category: 'Media', amount: 20 }
    ]
  },
  {
    id: 4,
    date: new Date('2023-04-01'),
    score: 70,
    riskLevel: 'medium',
    significantEvents: [
      {
        type: 'setting_change',
        description: 'Enabled stricter privacy settings',
        impact: 2
      }
    ],
    dataShared: [
      { category: 'Location', amount: 32 },
      { category: 'Contacts', amount: 28 },
      { category: 'Media', amount: 18 }
    ]
  },
  {
    id: 5,
    date: new Date('2023-05-01'),
    score: 62,
    riskLevel: 'medium',
    significantEvents: [
      {
        type: 'data_breach',
        description: 'Minor data breach detected from a third-party app',
        impact: -8
      }
    ],
    dataShared: [
      { category: 'Location', amount: 38 },
      { category: 'Contacts', amount: 35 },
      { category: 'Media', amount: 25 }
    ]
  },
  {
    id: 6,
    date: new Date('2023-06-01'),
    score: 65,
    riskLevel: 'medium',
    significantEvents: [
      {
        type: 'privacy_audit',
        description: 'Monthly privacy review performed',
        impact: 3
      }
    ],
    dataShared: [
      { category: 'Location', amount: 36 },
      { category: 'Contacts', amount: 32 },
      { category: 'Media', amount: 22 }
    ]
  }
];

// Goals data
export const goalsData: Goal[] = [
  {
    id: 1,
    userId: 1,
    title: 'Limit Social Media Usage',
    description: 'Target: Max 2 hours daily',
    targetValue: 120,
    currentValue: 105,
    unit: 'minutes',
    category: 'time',
    status: 'on track',
    dueDate: new Date('2023-06-30T00:00:00.000Z')
  },
  {
    id: 2,
    userId: 1,
    title: 'Reduce App Notifications',
    description: 'Target: Max 50 notifications daily',
    targetValue: 50,
    currentValue: 68,
    unit: 'count',
    category: 'notifications',
    status: 'off track',
    dueDate: new Date('2023-06-30T00:00:00.000Z')
  },
  {
    id: 3,
    userId: 1,
    title: 'Screen-Free Time Window',
    description: 'Target: No screens 10pm - 7am',
    targetValue: 9,
    currentValue: 9,
    unit: 'hours',
    category: 'health',
    status: 'on track',
    dueDate: new Date('2023-06-30T00:00:00.000Z')
  },
  {
    id: 4,
    userId: 1,
    title: 'Privacy Checkups',
    description: 'Target: Weekly privacy review',
    targetValue: 7,
    currentValue: 6,
    unit: 'days',
    category: 'privacy',
    status: 'due soon',
    dueDate: new Date('2023-06-30T00:00:00.000Z')
  }
];

// Recommendations data
export const recommendationsData: Recommendation[] = [
  {
    id: 1,
    userId: 1,
    title: 'TikTok Usage Alert',
    description: "You've opened TikTok 12 times today. Consider setting an app timer.",
    type: 'alert',
    status: 'new',
    createdAt: new Date('2023-06-01T10:00:00.000Z')
  },
  {
    id: 2,
    userId: 1,
    title: 'Privacy Risk',
    description: 'Facebook has accessed your microphone 8 times in background today.',
    type: 'privacy',
    status: 'new',
    createdAt: new Date('2023-06-01T11:30:00.000Z')
  },
  {
    id: 3,
    userId: 1,
    title: 'Goal Progress',
    description: "You're 15 minutes away from exceeding your social media time limit.",
    type: 'goal',
    status: 'new',
    createdAt: new Date('2023-06-01T15:45:00.000Z')
  },
  {
    id: 4,
    userId: 1,
    title: 'Productivity Win',
    description: 'Social media usage decreased by 20% this week. Great progress!',
    type: 'productivity',
    status: 'new',
    createdAt: new Date('2023-06-01T17:20:00.000Z')
  }
];

// Ad predictions
// Website usage data
export const websiteUsageData: WebsiteUsage[] = [
  {
    id: 1,
    domain: 'youtube.com',
    title: 'YouTube',
    category: 'Entertainment',
    visitCount: 45,
    timeSpent: 120,
    lastVisited: new Date('2023-06-01T18:45:00.000Z'),
    icon: 'YouTube'
  },
  {
    id: 2,
    domain: 'linkedin.com',
    title: 'LinkedIn',
    category: 'Professional',
    visitCount: 23,
    timeSpent: 45,
    lastVisited: new Date('2023-06-01T14:20:00.000Z'),
    icon: 'Linkedin'
  },
  {
    id: 3,
    domain: 'github.com',
    title: 'GitHub',
    category: 'Development',
    visitCount: 18,
    timeSpent: 75,
    lastVisited: new Date('2023-06-01T10:15:00.000Z'),
    icon: 'Github'
  },
  {
    id: 4,
    domain: 'netflix.com',
    title: 'Netflix',
    category: 'Entertainment',
    visitCount: 5,
    timeSpent: 165,
    lastVisited: new Date('2023-05-31T20:30:00.000Z'),
    icon: 'Video'
  },
  {
    id: 5,
    domain: 'amazon.com',
    title: 'Amazon',
    category: 'Shopping',
    visitCount: 12,
    timeSpent: 35,
    lastVisited: new Date('2023-06-01T12:10:00.000Z'),
    icon: 'ShoppingCart'
  },
  {
    id: 6,
    domain: 'nytimes.com',
    title: 'New York Times',
    category: 'News',
    visitCount: 8,
    timeSpent: 28,
    lastVisited: new Date('2023-06-01T07:45:00.000Z'),
    icon: 'Newspaper'
  },
  {
    id: 7,
    domain: 'udemy.com',
    title: 'Udemy',
    category: 'Education',
    visitCount: 3,
    timeSpent: 90,
    lastVisited: new Date('2023-05-31T15:20:00.000Z'),
    icon: 'GraduationCap'
  },
  {
    id: 8,
    domain: 'facebook.com',
    title: 'Facebook',
    category: 'Social',
    visitCount: 35,
    timeSpent: 85,
    lastVisited: new Date('2023-06-01T19:30:00.000Z'),
    icon: 'Facebook'
  }
];

// Category breakdown data
export const categoryBreakdownData: CategoryBreakdown[] = [
  {
    id: 1,
    name: 'Social',
    percentage: 42,
    timeSpent: 210,
    trend: 'up',
    trendPercentage: 8,
    color: '#3b82f6' // blue-500
  },
  {
    id: 2,
    name: 'Entertainment',
    percentage: 25,
    timeSpent: 125,
    trend: 'up',
    trendPercentage: 12,
    color: '#ec4899' // pink-500
  },
  {
    id: 3,
    name: 'Productivity',
    percentage: 15,
    timeSpent: 75,
    trend: 'down',
    trendPercentage: 5,
    color: '#10b981' // emerald-500
  },
  {
    id: 4,
    name: 'News',
    percentage: 8,
    timeSpent: 40,
    trend: 'stable',
    trendPercentage: 0,
    color: '#f59e0b' // amber-500
  },
  {
    id: 5,
    name: 'Shopping',
    percentage: 6,
    timeSpent: 30,
    trend: 'down',
    trendPercentage: 10,
    color: '#6366f1' // indigo-500
  },
  {
    id: 6,
    name: 'Education',
    percentage: 4,
    timeSpent: 20,
    trend: 'up',
    trendPercentage: 15,
    color: '#8b5cf6' // violet-500
  }
];

export const adPredictions: AdPrediction[] = [
  {
    id: '1',
    category: 'Travel',
    title: 'Summer Vacation Packages',
    description: 'Based on your searches for flight tickets and hotel reviews',
    likelihood: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: '2',
    category: 'Electronics',
    title: 'Wireless Headphones',
    description: 'Based on your YouTube music viewing and tech review visits',
    likelihood: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: '3',
    category: 'Subscription',
    title: 'Meal Kit Delivery Service',
    description: 'Based on your recipe searches and food delivery app usage',
    likelihood: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: '4',
    category: 'Fitness',
    title: 'Premium Fitness App',
    description: 'Based on your health app usage and fitness content views',
    likelihood: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: '5',
    category: 'Fashion',
    title: 'Summer Collection',
    description: 'Based on your recent clothing store visits and Instagram follows',
    likelihood: 'Low',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  }
];

// User data
export const userData = {
  id: 1,
  username: 'emma.johnson',
  displayName: 'Emma Johnson',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&h=128&q=80',
  lastSyncDate: new Date('2023-06-01T09:41:00.000Z')
};
