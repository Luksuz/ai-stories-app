import { createContext } from 'react';

export const StoryContext = createContext({
  userPrompt: "",
  activeChapterId: 0,
  chapters: []
});