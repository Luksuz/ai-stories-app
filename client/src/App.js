import { useState } from 'react';
import "./App.scss"
import { InitialStoryPrompt } from './initialStoryPrompt/InitialStoryPrompt';
import { StoryContext } from './context/StoryContext';
import { Chapter } from './chapters/Chapter';

export default function App() {
  const [story, setStory] = useState({ userPrompt: "", activeChapterId: 0, chapters: [] });

  return (
    <main className='first-screen'>
      <h1 className='first-screen__title'>Welcome to the interactive AI generator Stories</h1>

      <StoryContext.Provider value={{ story, setStory }}>
        {story.chapters.length === 0 &&
          <InitialStoryPrompt />}

        {story.chapters.length > 0 &&
          <Chapter
            key={story.activeChapterId}
            activeChapter={story.chapters.find(x => x.id === story.activeChapterId)} />}

      </StoryContext.Provider>

    </main>
  )
}
