import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  avatar: text("avatar"),
  lastSyncDate: timestamp("last_sync_date"),
});

export const appUsage = pgTable("app_usage", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  date: timestamp("date").notNull(),
  appName: text("app_name").notNull(),
  category: text("category").notNull(),
  timeSpent: integer("time_spent").notNull(), // in minutes
  openCount: integer("open_count").notNull(),
  metadata: json("metadata"),
});

export const privacyData = pgTable("privacy_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  appName: text("app_name").notNull(),
  riskLevel: text("risk_level").notNull(), // 'low', 'medium', 'high'
  permissions: json("permissions").notNull(), // array of permissions
});

export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  targetValue: integer("target_value").notNull(),
  currentValue: integer("current_value"),
  unit: text("unit").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull(), // 'on track', 'off track', 'due soon', 'completed'
  dueDate: timestamp("due_date"),
});

export const recommendations = pgTable("recommendations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'alert', 'privacy', 'goal', 'productivity'
  status: text("status").notNull(), // 'new', 'read', 'dismissed', 'acted_upon'
  createdAt: timestamp("created_at").notNull(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  appUsage: many(appUsage),
  privacyData: many(privacyData),
  goals: many(goals),
  recommendations: many(recommendations),
}));

export const appUsageRelations = relations(appUsage, ({ one }) => ({
  user: one(users, {
    fields: [appUsage.userId],
    references: [users.id],
  }),
}));

export const privacyDataRelations = relations(privacyData, ({ one }) => ({
  user: one(users, {
    fields: [privacyData.userId],
    references: [users.id],
  }),
}));

export const goalsRelations = relations(goals, ({ one }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id],
  }),
}));

export const recommendationsRelations = relations(recommendations, ({ one }) => ({
  user: one(users, {
    fields: [recommendations.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  avatar: true,
});

export const insertAppUsageSchema = createInsertSchema(appUsage).omit({
  id: true,
});

export const insertPrivacyDataSchema = createInsertSchema(privacyData).omit({
  id: true,
});

export const insertGoalSchema = createInsertSchema(goals).omit({
  id: true,
});

export const insertRecommendationSchema = createInsertSchema(recommendations).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type AppUsage = typeof appUsage.$inferSelect;
export type InsertAppUsage = z.infer<typeof insertAppUsageSchema>;

export type PrivacyData = typeof privacyData.$inferSelect;
export type InsertPrivacyData = z.infer<typeof insertPrivacyDataSchema>;

export type Goal = typeof goals.$inferSelect;
export type InsertGoal = z.infer<typeof insertGoalSchema>;

export type Recommendation = typeof recommendations.$inferSelect;
export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;

// Additional types for frontend use
export type TimeDistributionData = {
  day: string;
  social: number;
  productivity: number;
  entertainment: number;
  other: number;
};

export type AdPrediction = {
  id: string;
  category: string;
  title: string;
  description: string;
  likelihood: string;
  imageUrl: string;
};

export type PrivacyScore = {
  score: number;
  riskLevel: string;
  appsWithHighAccess: number;
};

export type AppPermission = {
  name: string;
  icon: string;
};

export type DashboardStats = {
  screenTime: {
    value: string;
    change: number;
  };
  appsUsed: {
    value: number;
    change: number;
  };
  privacyRisk: {
    value: string;
    score: number;
    level: string;
  };
  goalsProgress: {
    completed: number;
    total: number;
    change: number;
  };
};
