import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import DigitalFootprint from "@/pages/DigitalFootprint";
import AdPredictions from "@/pages/AdPredictions";
import Privacy from "@/pages/Privacy";
import Goals from "@/pages/Goals";
import Settings from "@/pages/Settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/digital-footprint" component={DigitalFootprint} />
      <Route path="/ad-predictions" component={AdPredictions} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/goals" component={Goals} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
