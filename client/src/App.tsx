import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { TutorialProvider } from "@/hooks/use-tutorial";
import { TutorialWrapper } from "@/components/tutorial";
import { ProtectedRoute } from "@/lib/protected-route";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import DigitalFootprint from "@/pages/DigitalFootprint";
import AdPredictions from "@/pages/AdPredictions";
import Privacy from "@/pages/Privacy";
import Goals from "@/pages/Goals";
import Integrations from "@/pages/Integrations";
import Settings from "@/pages/Settings";
import AuthPage from "@/pages/auth-page";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/digital-footprint" component={DigitalFootprint} />
      <ProtectedRoute path="/ad-predictions" component={AdPredictions} />
      <ProtectedRoute path="/privacy" component={Privacy} />
      <ProtectedRoute path="/goals" component={Goals} />
      <ProtectedRoute path="/integrations" component={Integrations} />
      <ProtectedRoute path="/settings" component={Settings} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TutorialProvider>
          <Router />
          <TutorialWrapper />
          <Toaster />
        </TutorialProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
