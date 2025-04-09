import { 
  User, 
  type InsertUser,
  AppUsage,
  PrivacyData,
  Goal,
  Recommendation,
  TimeDistributionData,
  PrivacyScore,
  AdPrediction,
  DashboardStats
} from "@shared/schema";

import {
  appUsageData,
  timeDistributionData,
  dashboardStats,
  privacyData,
  privacyScore,
  goalsData,
  recommendationsData,
  adPredictions,
  userData
} from "../client/src/data/mockData";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Dashboard data
  getDashboardStats(userId: number): Promise<DashboardStats>;
  
  // App usage data
  getAppUsage(userId: number): Promise<AppUsage[]>;
  getTimeDistribution(userId: number): Promise<TimeDistributionData[]>;
  
  // Ad predictions
  getAdPredictions(userId: number): Promise<AdPrediction[]>;
  
  // Privacy data
  getPrivacyData(userId: number): Promise<PrivacyData[]>;
  getPrivacyScore(userId: number): Promise<PrivacyScore>;
  
  // Goals
  getGoals(userId: number): Promise<Goal[]>;
  createGoal(goal: Partial<Goal>): Promise<Goal>;
  updateGoal(id: number, updates: Partial<Goal>): Promise<Goal | undefined>;
  
  // Recommendations
  getRecommendations(userId: number): Promise<Recommendation[]>;
  updateRecommendation(id: number, updates: Partial<Recommendation>): Promise<Recommendation | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private appUsages: AppUsage[];
  private timeDistributions: TimeDistributionData[];
  private adPredictionsList: AdPrediction[];
  private privacyDataList: PrivacyData[];
  private privacyScores: Map<number, PrivacyScore>;
  private goalsList: Goal[];
  private recommendationsList: Recommendation[];
  private dashboardStatsList: Map<number, DashboardStats>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.users.set(userData.id, userData as User);
    
    this.appUsages = [...appUsageData];
    this.timeDistributions = [...timeDistributionData];
    this.adPredictionsList = [...adPredictions];
    this.privacyDataList = [...privacyData];
    this.privacyScores = new Map();
    this.privacyScores.set(1, privacyScore);
    this.goalsList = [...goalsData];
    this.recommendationsList = [...recommendationsData];
    this.dashboardStatsList = new Map();
    this.dashboardStatsList.set(1, dashboardStats);
    
    this.currentId = 2;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Dashboard data
  async getDashboardStats(userId: number): Promise<DashboardStats> {
    const stats = this.dashboardStatsList.get(userId);
    if (!stats) {
      throw new Error(`No dashboard stats found for user ${userId}`);
    }
    return stats;
  }
  
  // App usage data
  async getAppUsage(userId: number): Promise<AppUsage[]> {
    return this.appUsages.filter(app => app.userId === userId);
  }
  
  async getTimeDistribution(userId: number): Promise<TimeDistributionData[]> {
    return this.timeDistributions;
  }
  
  // Ad predictions
  async getAdPredictions(userId: number): Promise<AdPrediction[]> {
    return this.adPredictionsList;
  }
  
  // Privacy data
  async getPrivacyData(userId: number): Promise<PrivacyData[]> {
    return this.privacyDataList.filter(data => data.userId === userId);
  }
  
  async getPrivacyScore(userId: number): Promise<PrivacyScore> {
    const score = this.privacyScores.get(userId);
    if (!score) {
      throw new Error(`No privacy score found for user ${userId}`);
    }
    return score;
  }
  
  // Goals
  async getGoals(userId: number): Promise<Goal[]> {
    return this.goalsList.filter(goal => goal.userId === userId);
  }
  
  async createGoal(goalData: Partial<Goal>): Promise<Goal> {
    const id = Math.max(...this.goalsList.map(g => g.id), 0) + 1;
    const newGoal: Goal = {
      id,
      userId: goalData.userId || 1,
      title: goalData.title || 'New Goal',
      description: goalData.description || '',
      targetValue: goalData.targetValue || 0,
      currentValue: goalData.currentValue || 0,
      unit: goalData.unit || 'minutes',
      category: goalData.category || 'time',
      status: goalData.status || 'on track',
      dueDate: goalData.dueDate || new Date()
    };
    
    this.goalsList.push(newGoal);
    return newGoal;
  }
  
  async updateGoal(id: number, updates: Partial<Goal>): Promise<Goal | undefined> {
    const index = this.goalsList.findIndex(goal => goal.id === id);
    if (index === -1) return undefined;
    
    this.goalsList[index] = { ...this.goalsList[index], ...updates };
    return this.goalsList[index];
  }
  
  // Recommendations
  async getRecommendations(userId: number): Promise<Recommendation[]> {
    return this.recommendationsList.filter(rec => rec.userId === userId);
  }
  
  async updateRecommendation(id: number, updates: Partial<Recommendation>): Promise<Recommendation | undefined> {
    const index = this.recommendationsList.findIndex(rec => rec.id === id);
    if (index === -1) return undefined;
    
    this.recommendationsList[index] = { ...this.recommendationsList[index], ...updates };
    return this.recommendationsList[index];
  }
}

export const storage = new MemStorage();
