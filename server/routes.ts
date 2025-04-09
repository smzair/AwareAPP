import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints for the Aware dashboard
  
  // Get user data
  app.get('/api/user', async (req, res) => {
    try {
      const user = await storage.getUser(1); // Using hardcoded user ID for prototype
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching user data' });
    }
  });

  // Get dashboard stats
  app.get('/api/dashboard/stats', async (req, res) => {
    try {
      const stats = await storage.getDashboardStats(1);
      return res.json(stats);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching dashboard stats' });
    }
  });

  // Get app usage data
  app.get('/api/usage/apps', async (req, res) => {
    try {
      const appUsage = await storage.getAppUsage(1);
      return res.json(appUsage);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching app usage data' });
    }
  });

  // Get time distribution data
  app.get('/api/usage/time-distribution', async (req, res) => {
    try {
      const timeDistribution = await storage.getTimeDistribution(1);
      return res.json(timeDistribution);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching time distribution data' });
    }
  });

  // Get ad predictions
  app.get('/api/ads/predictions', async (req, res) => {
    try {
      const predictions = await storage.getAdPredictions(1);
      return res.json(predictions);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching ad predictions' });
    }
  });

  // Get privacy data
  app.get('/api/privacy/data', async (req, res) => {
    try {
      const privacyData = await storage.getPrivacyData(1);
      return res.json(privacyData);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching privacy data' });
    }
  });

  // Get privacy score
  app.get('/api/privacy/score', async (req, res) => {
    try {
      const privacyScore = await storage.getPrivacyScore(1);
      return res.json(privacyScore);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching privacy score' });
    }
  });

  // Get goals
  app.get('/api/goals', async (req, res) => {
    try {
      const goals = await storage.getGoals(1);
      return res.json(goals);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching goals' });
    }
  });

  // Create a new goal
  app.post('/api/goals', async (req, res) => {
    try {
      const newGoal = await storage.createGoal({
        ...req.body,
        userId: 1
      });
      return res.status(201).json(newGoal);
    } catch (error) {
      return res.status(500).json({ message: 'Server error creating goal' });
    }
  });

  // Update a goal
  app.patch('/api/goals/:id', async (req, res) => {
    try {
      const updatedGoal = await storage.updateGoal(
        Number(req.params.id),
        req.body
      );
      if (!updatedGoal) {
        return res.status(404).json({ message: 'Goal not found' });
      }
      return res.json(updatedGoal);
    } catch (error) {
      return res.status(500).json({ message: 'Server error updating goal' });
    }
  });

  // Get recommendations
  app.get('/api/recommendations', async (req, res) => {
    try {
      const recommendations = await storage.getRecommendations(1);
      return res.json(recommendations);
    } catch (error) {
      return res.status(500).json({ message: 'Server error fetching recommendations' });
    }
  });

  // Update a recommendation (e.g., mark as dismissed)
  app.patch('/api/recommendations/:id', async (req, res) => {
    try {
      const updatedRecommendation = await storage.updateRecommendation(
        Number(req.params.id),
        req.body
      );
      if (!updatedRecommendation) {
        return res.status(404).json({ message: 'Recommendation not found' });
      }
      return res.json(updatedRecommendation);
    } catch (error) {
      return res.status(500).json({ message: 'Server error updating recommendation' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
