import React from 'react';
import { TutorialTooltip } from './TutorialTooltip';
import { ElementHighlighter } from './ElementHighlighter';
import { useTutorial } from '@/hooks/use-tutorial';

export function TutorialWrapper() {
  const { isActive } = useTutorial();

  if (!isActive) {
    return null;
  }

  return (
    <>
      <ElementHighlighter />
      <TutorialTooltip />
    </>
  );
}