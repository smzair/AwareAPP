import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useLocation } from 'wouter';

export type TutorialStep = {
  id: string;
  title: string;
  description: string;
  targetElement: string; // CSS selector for the element to highlight
  position: 'top' | 'right' | 'bottom' | 'left';
  route?: string; // Optional route to navigate to for this step
  action?: () => void; // Optional action to perform when completing this step
};

type TutorialContextType = {
  isActive: boolean;
  currentStepIndex: number;
  steps: TutorialStep[];
  startTutorial: () => void;
  endTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipToStep: (index: number) => void;
  currentStep: TutorialStep | null;
};

const defaultSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Aware!',
    description: 'Let\'s take a quick tour to help you get started with your digital wellness journey.',
    targetElement: '.tutorial-welcome',
    position: 'bottom',
    route: '/'
  },
  {
    id: 'dashboard',
    title: 'Your Dashboard',
    description: 'This is your central hub where you can see all your digital behavior stats at a glance.',
    targetElement: '.dashboard-overview',
    position: 'bottom',
    route: '/'
  },
  {
    id: 'app-usage',
    title: 'App Usage',
    description: 'Track which apps you use the most and manage your screen time.',
    targetElement: '.app-usage-section',
    position: 'left',
    route: '/'
  },
  {
    id: 'privacy-score',
    title: 'Privacy Score',
    description: 'Monitor your privacy exposure and identify potential risks.',
    targetElement: '.privacy-meter',
    position: 'right',
    route: '/'
  },
  {
    id: 'goals',
    title: 'Set Digital Goals',
    description: 'Create personalized goals to improve your digital habits.',
    targetElement: '.goals-section',
    position: 'left',
    route: '/'
  },
  {
    id: 'digital-footprint',
    title: 'Digital Footprint',
    description: 'Explore your online presence across different platforms.',
    targetElement: '[href="/digital-footprint"]',
    position: 'right',
    route: '/'
  },
  {
    id: 'ad-predictions',
    title: 'Ad Predictions',
    description: 'See what kind of ads are being targeted to you based on your behavior.',
    targetElement: '[href="/ad-predictions"]',
    position: 'right',
    route: '/'
  },
  {
    id: 'completed',
    title: 'All Set!',
    description: 'You\'re all set to take control of your digital life. Explore the app to discover more!',
    targetElement: '.tutorial-welcome',
    position: 'bottom',
    route: '/'
  }
];

const TutorialContext = createContext<TutorialContextType | null>(null);

export function TutorialProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<TutorialStep[]>(defaultSteps);
  const [, setLocation] = useLocation();

  // Compute the current step
  const currentStep = isActive && currentStepIndex < steps.length ? steps[currentStepIndex] : null;

  // Navigate to the route if specified for the current step
  React.useEffect(() => {
    if (currentStep?.route) {
      setLocation(currentStep.route);
    }
  }, [currentStep, setLocation]);

  // Start the tutorial
  const startTutorial = () => {
    setCurrentStepIndex(0);
    setIsActive(true);
  };

  // End the tutorial
  const endTutorial = () => {
    // Clean up any arrows when ending tutorial
    const highlightArrow = document.querySelector('.highlight-arrow');
    if (highlightArrow) {
      highlightArrow.remove();
    }
    
    setIsActive(false);
    setCurrentStepIndex(0);
  };

  // Navigate to the next step
  const nextStep = () => {
    // Remove arrow when navigating
    const highlightArrow = document.querySelector('.highlight-arrow');
    if (highlightArrow) {
      highlightArrow.remove();
    }
    
    if (currentStepIndex < steps.length - 1) {
      // Execute any action for the current step
      if (currentStep?.action) {
        currentStep.action();
      }
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // End tutorial if we're at the last step
      endTutorial();
    }
  };

  // Navigate to the previous step
  const prevStep = () => {
    // Remove arrow when navigating
    const highlightArrow = document.querySelector('.highlight-arrow');
    if (highlightArrow) {
      highlightArrow.remove();
    }
    
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Skip to a specific step
  const skipToStep = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
    }
  };

  return (
    <TutorialContext.Provider
      value={{
        isActive,
        currentStepIndex,
        steps,
        startTutorial,
        endTutorial,
        nextStep,
        prevStep,
        skipToStep,
        currentStep
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
}