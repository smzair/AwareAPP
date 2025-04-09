import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes and middleware
  setupAuth(app);

  // API endpoints for the Aware dashboard
  // This middleware ensures the user is authenticated for all API routes
  const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: 'Not authenticated' });
  };

  // Get dashboard stats
  app.get('/api/dashboard/stats', isAuthenticated, async (req: any, res) => {
    try {
      const stats = await storage.getDashboardStats(req.user.id);
      return res.json(stats);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching dashboard stats' });
    }
  });

  // Get app usage data
  app.get('/api/usage/apps', isAuthenticated, async (req: any, res) => {
    try {
      const appUsage = await storage.getAppUsage(req.user.id);
      return res.json(appUsage);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching app usage data' });
    }
  });

  // Get time distribution data
  app.get('/api/usage/time-distribution', isAuthenticated, async (req: any, res) => {
    try {
      const timeDistribution = await storage.getTimeDistribution(req.user.id);
      return res.json(timeDistribution);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching time distribution data' });
    }
  });

  // Get ad predictions
  app.get('/api/ads/predictions', isAuthenticated, async (req: any, res) => {
    try {
      const predictions = await storage.getAdPredictions(req.user.id);
      return res.json(predictions);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching ad predictions' });
    }
  });

  // Get privacy data
  app.get('/api/privacy/data', isAuthenticated, async (req: any, res) => {
    try {
      const privacyData = await storage.getPrivacyData(req.user.id);
      return res.json(privacyData);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching privacy data' });
    }
  });

  // Get privacy score
  app.get('/api/privacy/score', isAuthenticated, async (req: any, res) => {
    try {
      const privacyScore = await storage.getPrivacyScore(req.user.id);
      return res.json(privacyScore);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching privacy score' });
    }
  });

  // Get goals
  app.get('/api/goals', isAuthenticated, async (req: any, res) => {
    try {
      const goals = await storage.getGoals(req.user.id);
      return res.json(goals);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching goals' });
    }
  });

  // Create a new goal
  app.post('/api/goals', isAuthenticated, async (req: any, res) => {
    try {
      const newGoal = await storage.createGoal({
        ...req.body,
        userId: req.user.id
      });
      return res.status(201).json(newGoal);
    } catch (error) {
      return res.status(500).json({ message: 'Server error creating goal' });
    }
  });

  // Update a goal
  app.patch('/api/goals/:id', isAuthenticated, async (req: any, res) => {
    try {
      // First verify the goal belongs to the user
      const goals = await storage.getGoals(req.user.id);
      const goalToUpdate = goals.find(g => g.id === Number(req.params.id));
      
      if (!goalToUpdate) {
        return res.status(404).json({ message: 'Goal not found or not authorized' });
      }
      
      const updatedGoal = await storage.updateGoal(
        Number(req.params.id),
        req.body
      );
      
      return res.json(updatedGoal);
    } catch (error) {
      return res.status(500).json({ message: 'Server error updating goal' });
    }
  });

  // Get recommendations
  app.get('/api/recommendations', isAuthenticated, async (req: any, res) => {
    try {
      const recommendations = await storage.getRecommendations(req.user.id);
      return res.json(recommendations);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching recommendations' });
    }
  });

  // Update a recommendation (e.g., mark as dismissed)
  app.patch('/api/recommendations/:id', isAuthenticated, async (req: any, res) => {
    try {
      // First verify the recommendation belongs to the user
      const recommendations = await storage.getRecommendations(req.user.id);
      const recToUpdate = recommendations.find(r => r.id === Number(req.params.id));
      
      if (!recToUpdate) {
        return res.status(404).json({ message: 'Recommendation not found or not authorized' });
      }
      
      const updatedRecommendation = await storage.updateRecommendation(
        Number(req.params.id),
        req.body
      );
      
      return res.json(updatedRecommendation);
    } catch (error) {
      return res.status(500).json({ message: 'Server error updating recommendation' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
