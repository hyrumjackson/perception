import { promptPool } from '../data/prompts';

export const generatePromptIds = (roundCount: number, previousPromptIds: string[] = []): string[] => {
  const remainingPrompts = promptPool.filter(p => !previousPromptIds.includes(p.id));
  const shuffled = [...remainingPrompts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, roundCount).map(p => p.id);
};