import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTutorial } from '@/hooks/use-tutorial';

type ElementPosition = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export function ElementHighlighter() {
  const { isActive, currentStep } = useTutorial();
  const [position, setPosition] = useState<ElementPosition | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isActive || !currentStep) {
      setIsVisible(false);
      return;
    }

    const calculatePosition = () => {
      const targetEl = document.querySelector(currentStep.targetElement);
      if (!targetEl) {
        setIsVisible(false);
        return;
      }

      const rect = targetEl.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
      setIsVisible(true);
    };

    // Small delay to ensure DOM has updated
    const timer = setTimeout(calculatePosition, 100);

    // Recalculate on window resize
    window.addEventListener('resize', calculatePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isActive, currentStep]);

  if (!isActive || !currentStep || !isVisible || !position) {
    return null;
  }

  return (
    <>
      {/* Overlay that dims the entire screen except the target element */}
      <div
        className="fixed inset-0 bg-black/40 z-50 pointer-events-none"
        style={{
          clipPath: `path('M 0,0 L 0,${window.innerHeight} L ${window.innerWidth},${window.innerHeight} L ${window.innerWidth},0 L 0,0 Z M ${position.left},${position.top} L ${position.left + position.width},${position.top} L ${position.left + position.width},${position.top + position.height} L ${position.left},${position.top + position.height} Z')`
        }}
      />

      {/* Highlight border around the target element */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            top: position.top - 4,
            left: position.left - 4,
            width: position.width + 8,
            height: position.height + 8,
            zIndex: 51,
            pointerEvents: 'none',
            borderRadius: '6px'
          }}
          className="border-2 border-primary shadow-[0_0_0_4px_rgba(var(--primary)/_0.2)] shadow-primary/20"
        >
          {/* Pulsing effect around the highlight */}
          <motion.div
            className="absolute inset-0 border-2 border-primary rounded-md"
            animate={{
              boxShadow: ['0 0 0 0px rgba(var(--primary) / 0.3)', '0 0 0 10px rgba(var(--primary) / 0)'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}