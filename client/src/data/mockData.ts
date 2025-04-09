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
