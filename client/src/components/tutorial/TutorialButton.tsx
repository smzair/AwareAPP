import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { useTutorial } from '@/hooks/use-tutorial';

export function TutorialButton() {
  const { startTutorial } = useTutorial();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={startTutorial}
      className="flex items-center gap-2 bg-white/90 border-gray-200 hover:bg-gray-50 tutorial-welcome"
    >
      <HelpCircle className="h-4 w-4 text-primary" />
      <span>Start Tutorial</span>
    </Button>
  );
}