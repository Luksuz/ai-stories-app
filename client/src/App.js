import { useState } from 'react';
//import { Button, Modal, Carousel } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import StoryPart from './components/StoryPart';

export default function App() {
  const [show, setShow] = useState(false);
  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  /*const [recentStories, setRecentStories] = useState([]);*/

  /*useEffect(() => {
    const fetchRecentStories = async () => {
      const response = await loadRecentStories();
      setRecentStories(response);
    };

    fetchRecentStories();
  }, []);*/

  return (
    <div className="flex display-flex">
      <h1 className="p-4">Welcome to the interactive AI generated Stories</h1>
      <Alert variant="warning" show={show} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Other users stories coming sooooooon...</Alert.Heading>
      </Alert>
      <StoryPart />
    </div>
  );
}
