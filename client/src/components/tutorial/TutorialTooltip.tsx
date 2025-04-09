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

      // Check if element is in viewport
      const rect = targetEl.getBoundingClientRect();
      const isInViewport = 
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth;
        
      // If not in viewport, scroll it into view before positioning the tooltip
      if (!isInViewport) {
        targetEl.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        });
        
        // Add a brief delay to allow scrolling to complete before measuring
        setTimeout(calculatePosition, 500);
        return;
      }
      
      // Now get updated position after any scrolling
      const updatedRect = targetEl.getBoundingClientRect();
      const tooltipWidth = 300;
      const tooltipHeight = 300; // Increased for safety - actual height will vary based on content
      const margin = 15;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let newPosition: TooltipPosition = {};

      // First determine the ideal position based on the requested placement
      switch (currentStep.position) {
        case 'top':
          newPosition = {
            left: updatedRect.left + updatedRect.width / 2,
            bottom: viewportHeight - updatedRect.top + margin,
            x: -tooltipWidth / 2
          };
          break;
        case 'right':
          newPosition = {
            left: updatedRect.right + margin,
            top: updatedRect.top + updatedRect.height / 2,
            y: -tooltipHeight / 2
          };
          break;
        case 'bottom':
          newPosition = {
            left: updatedRect.left + updatedRect.width / 2,
            top: updatedRect.bottom + margin,
            x: -tooltipWidth / 2
          };
          break;
        case 'left':
          newPosition = {
            right: viewportWidth - updatedRect.left + margin,
            top: updatedRect.top + updatedRect.height / 2,
            y: -tooltipHeight / 2
          };
          break;
      }

      // Now check if tooltip would go off-screen and adjust if needed
      
      // Check for bottom placement - if it would go off bottom of screen, place it above instead
      if (currentStep.position === 'bottom' && updatedRect.bottom + margin + tooltipHeight > viewportHeight) {
        newPosition = {
          left: updatedRect.left + updatedRect.width / 2,
          bottom: viewportHeight - updatedRect.top + margin,
          x: -tooltipWidth / 2
        };
      }
      
      // Check for top placement - if it would go off top of screen, place it below instead
      else if (currentStep.position === 'top' && updatedRect.top - tooltipHeight - margin < 0) {
        newPosition = {
          left: updatedRect.left + updatedRect.width / 2,
          top: updatedRect.bottom + margin,
          x: -tooltipWidth / 2
        };
      }

      // Ensure left-right positioning doesn't go off screen
      if ('left' in newPosition && newPosition.left !== undefined && newPosition.x !== undefined) {
        try {
          // Check if tooltip would go off left edge
          const leftEdge = newPosition.left + (newPosition.x || 0);
          if (leftEdge < 10) {
            // Adjust x offset to keep tooltip on screen
            newPosition.x = -newPosition.left + 10;
          }
          
          // Check if tooltip would go off right edge
          const rightEdge = newPosition.left + (newPosition.x || 0) + tooltipWidth;
          if (rightEdge > viewportWidth - 10) {
            // Adjust x offset to keep tooltip on screen
            newPosition.x = viewportWidth - 10 - tooltipWidth - newPosition.left;
          }
        } catch (err) {
          // Fallback if any calculations fail
          console.error('Error calculating tooltip position', err);
        }
      }

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