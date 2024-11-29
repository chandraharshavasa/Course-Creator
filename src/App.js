import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import MiddleSection from './components/MiddleSection/MiddleSection';
import RightSidebar from './components/RightSidebar/RightSidebar';
import './App.css';

function App() {
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);
  const [currentView, setCurrentView] = useState('mobile');
  const [slides, setSlides] = useState([
    { id: 1, title: 'A title slide', subtitle: 'An optional subtitle', buttonText: 'Ok, let\'s go!' },
    { id: 2, title: 'Second slide', subtitle: 'Another subtitle', buttonText: 'Next' },
    { id: 3, title: 'Third slide', subtitle: 'Yet another subtitle', buttonText: 'Finish' }
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);  // The index of the current slide
  const [history, setHistory] = useState([]);  // For undo functionality
  const [redoStack, setRedoStack] = useState([]);  // For redo functionality

  // Toggling sidebars
  const toggleLeftSidebar = () => setLeftSidebarVisible(!leftSidebarVisible);
  const toggleRightSidebar = () => setRightSidebarVisible(!rightSidebarVisible);

  // Handle Undo functionality
  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setRedoStack([currentSlide, ...redoStack]);
      setCurrentSlide(lastState);
      setHistory(history.slice(0, -1));
    }
  };

  // Handle Redo functionality
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setHistory([...history, currentSlide]);
      setCurrentSlide(nextState);
      setRedoStack(redoStack.slice(1));
    }
  };

  // Function to go to previous slide
  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      const prevSlide = currentSlide - 1;
      setHistory([...history, currentSlide]);  // Save the current state in history for undo
      setCurrentSlide(prevSlide);
      setRedoStack([]); // Clear redo stack when moving to a new slide
    }
  };

  // Function to go to next slide
  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      const nextSlide = currentSlide + 1;
      setHistory([...history, currentSlide]);  // Save the current state in history for undo
      setCurrentSlide(nextSlide);
      setRedoStack([]); // Clear redo stack when moving to a new slide
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <LeftSidebar 
          visible={leftSidebarVisible} 
          toggleSidebar={toggleLeftSidebar}
          slides={slides}
          setSlides={setSlides}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          setHistory={setHistory}
        />
        <MiddleSection 
          currentView={currentView}
          setCurrentView={setCurrentView}
          slides={slides}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          handlePrevSlide={handlePrevSlide}
          handleNextSlide={handleNextSlide}
        />
        <RightSidebar 
          visible={rightSidebarVisible} 
          toggleSidebar={toggleRightSidebar}
          slides={slides}
          setSlides={setSlides}
          currentSlide={currentSlide}
          setHistory={setHistory}
        />
      </div>
    </div>
  );
}

export default App;
