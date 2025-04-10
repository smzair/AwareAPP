import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { TutorialStep, useTutorial } from '@/hooks/use-tutorial';
import { cn } from '@/lib/utils';

type TooltipPosition = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  x?: number;
  y?: number;
};

export function TutorialTooltip() {
  const {
    isActive,
    currentStep,
    steps,
    currentStepIndex,
    nextStep,
    prevStep,
    endTutorial
  } = useTutorial();

  const [position, setPosition] = useState<TooltipPosition>({});
  const [isVisible, setIsVisible] = useState(false);

  // Calculate position based on target element
  useEffect(() => {
    if (!isActive || !currentStep) {
      setIsVisible(false);
      return;
    }

    const calculatePosition = () => {
      const targetEl = document.querySelector(currentStep.targetElement);
      if (!targetEl) {
        // If element not found, center the tooltip
        setPosition({
          top: window.innerHeight / 2,
          left: window.innerWidth / 2,
          x: -150,
          y: -75
        });
        setIsVisible(true);
        return;
      }

      // Much simpler approach - always position relative to viewport
      // First ensure element is in viewport
      targetEl.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      // Get element position after scrolling
      const rect = targetEl.getBoundingClientRect();
      
      // Fixed dimensions
      const tooltipWidth = 300;
      const tooltipHeight = 280; // Actual modal height approximation 
      const margin = 15;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Determine base position in viewport - always centered horizontally
      let newPosition: TooltipPosition = {};
      
      // Simple viewport-based positioning that doesn't rely on complex calculations
      // Always position the tooltip in the center top of the viewport with fixed offset from top
      const TOP_OFFSET = 80; // Fixed distance from top of viewport
      
      newPosition = {
        left: viewportWidth / 2,
        top: TOP_OFFSET, 
        x: -tooltipWidth / 2,
        y: 0
      };
      
      // Add indicator arrow pointing to target element
      const highlightArrow = document.querySelector('.highlight-arrow');
      if (highlightArrow) {
        highlightArrow.remove();
      }
      
      // Create arrow element
      const arrow = document.createElement('div');
      arrow.classList.add('highlight-arrow', 'fixed', 'z-[9999]', 'border-l-8', 'border-r-8', 'border-t-8', 'border-transparent', 'border-t-primary', 'w-0', 'h-0');
      
      // Position arrow
      const arrowTop = rect.top - 8;
      const arrowLeft = rect.left + rect.width / 2 - 8;
      
      arrow.style.top = `${arrowTop}px`;
      arrow.style.left = `${arrowLeft}px`;
      
      // Add to body
      document.body.appendChild(arrow);

      setPosition(newPosition);
      setIsVisible(true);
    };

    // Small delay to ensure DOM has updated
    const timer = setTimeout(calculatePosition, 100);

    // Recalculate on window resize or scroll
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);
    
    // Also recalculate if the orientation changes (mobile devices)
    window.addEventListener('orientationchange', calculatePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('orientationchange', calculatePosition);
      
      // Remove the arrow when component unmounts
      const highlightArrow = document.querySelector('.highlight-arrow');
      if (highlightArrow) {
        highlightArrow.remove();
      }
    };
  }, [isActive, currentStep]);

  if (!isActive || !currentStep || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key={currentStep.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed',
          ...position,
          zIndex: 10000,
          width: 300,
          transform: `translate(${position.x || 0}px, ${position.y || 0}px)`
        }}
        className="rounded-lg shadow-lg bg-white border border-gray-200 overflow-hidden"
      >
        {/* Top colored bar */}
        <div className="h-1.5 w-full bg-primary"></div>

        {/* Content section */}
        <div className="p-4">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 rounded-full"
              onClick={endTutorial}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close tutorial</span>
            </Button>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {currentStep.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4">
            {currentStep.description}
          </p>

          {/* Step Progress Indicator */}
          <div className="flex space-x-1 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1 rounded-full flex-1 transition-colors",
                  index <= currentStepIndex ? "bg-primary" : "bg-gray-200"
                )}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="text-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button
              size="sm"
              onClick={nextStep}
              className="bg-primary hover:bg-primary/90"
            >
              {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
              {currentStepIndex < steps.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}