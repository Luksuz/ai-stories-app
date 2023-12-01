import { useState } from 'react';
import "./App.scss"
import { InitialStoryPrompt } from './initialStoryPrompt/InitialStoryPrompt';
import { StoryContext } from './context/StoryContext';
import { Chapter } from './chapters/Chapter';
import { fetchImage, fetchStory } from './utils/ApiService';

/*
--------------------------
Story structure
{
  userPrompt: "",
  title: "",
  synopsis: "",
  chapters: [
    {
      id: "",
      content: "",
      imagePrompt: "",
      image: "",
      randomEvent: ""
    }
  ]
}
*/

export default function App() {
  const [story, setStory] = useState({ userPrompt: "", title: "", synopsis: "", chapters: [] });
  const [activeChapterId, setActiveChapterId] = useState(null);
  const [error, setError] = useState(false);

  const setInitialChapter = async (randomEvent) => {
    setError(() => false)
    try {
      const data = await fetchStory("", "", "", "", randomEvent);
      const nextActiveChapterId = 1;

      setStory(() => {
        return {
          userPrompt: randomEvent,
          title: data.storyData[0],
          synopsis: data.storyData[1],
          chapters: [
            {
              id: nextActiveChapterId,
              content: data.storyData[2],
              imagePrompt: data.imagePrompt,
              image: "",
              randomEvent: "" // on initial story prompt, we are saving prompt/event on userPrompt
            },
          ],
        }
      });

      setActiveChapterId(() => nextActiveChapterId);
      getImage(nextActiveChapterId, data.imagePrompt);
    } catch (error) {
      setError(() => true)
    }
  }

  const setChapter = async (randomEvent) => {
    setError(() => false)
    try {
      const nextActiveChapterId = activeChapterId + 1;
      const activeChapter = story.chapters.find(x => x.id === activeChapterId);

      const data = await fetchStory(
        story.synopsis,
        activeChapter.content,
        ["part " + nextActiveChapterId, "part " + activeChapterId],
        randomEvent,
        ""
      );

      if (story.chapters.some(x => x.id === nextActiveChapterId)) {
        // if we are changing existing chapter, delete chapters after the next active
        setStory((oldValue) => {
          return {
            ...oldValue,
            chapters: oldValue.chapters.filter(x => x.id < nextActiveChapterId),
          }
        });
      }

      // if we are adding new chapter
      setStory((oldValue) => {
        return {
          ...oldValue,
          chapters: [
            ...oldValue.chapters,
            {
              id: nextActiveChapterId,
              content: data.storyData,
              imagePrompt: data.imagePrompt,
              randomEvent: randomEvent
            },
          ],
        }
      });

      setActiveChapterId(() => nextActiveChapterId);
      getImage(nextActiveChapterId, data.imagePrompt);
    } catch (error) {
      setError(() => true)
    }
  }

  const getImage = async (chapterId, imagePrompt) => {
    const image = await fetchImage(imagePrompt);

    setStory((oldValue) => {
      return {
        ...oldValue,
        chapters: oldValue.chapters.map(x => {
          if (x.id === chapterId) {
            return {
              ...x,
              image: image
            }
          }

          return {
            ...x
          }
        }),
      }
    });
  };

  const goToPreviousChapter = () => {
    setActiveChapterId(() => activeChapterId - 1)
  }

  const goToNextChapter = () => {
    setActiveChapterId(() => activeChapterId + 1)
  }

  return (
    <main className='first-screen'>
      <h1 className='first-screen__title'>Welcome to the interactive AI generator Stories</h1>

      <StoryContext.Provider value={{ story, setStory }}>
        {story.chapters.length === 0 &&
          <InitialStoryPrompt
            setInitialChapter={setInitialChapter}
          />}

        {story.chapters.length > 0 && activeChapterId &&
          <Chapter
            key={activeChapterId}
            setChapter={setChapter}
            id={activeChapterId}
            content={story.chapters.find(x => x.id === activeChapterId).content}
            image={story.chapters.find(x => x.id === activeChapterId).image}
            chaptersLength={story.chapters.length}
            goToPreviousChapter={goToPreviousChapter}
            goToNextChapter={goToNextChapter}
          />}
      </StoryContext.Provider>

      {error &&
        <p className='first-screen__error'>Something went wrong. Please try again.</p>}

    </main>
  )
}
