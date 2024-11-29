import React, { useState } from 'react';
import DraggableResizable from '../DraggableResizable/DraggableResizable';
import { FaArrowLeft, FaArrowRight, FaMobile, FaTabletAlt, FaDesktop, FaUndo, FaRedo } from 'react-icons/fa';
import './MiddleSection.css';

function MiddleSection({
  currentView,
  setCurrentView,
  slides,
  currentSlide,
  handlePrevSlide,
  handleNextSlide,
  handleUndo,
  handleRedo,
}) {
  const [elements, setElements] = useState({});

  const handleUpdate = (id, position, size) => {
    setElements((prev) => ({
      ...prev,
      [id]: { position, size },
    }));
  };

  const getElementProperties = (id) =>
    elements[id] || { position: { x: 50, y: 50 }, size: { width: 200, height: 100 } };

  const slide = slides[currentSlide];

  return (
    <div className="middle-section">
      <div className={`preview-container ${currentView}`}>
        <div className="slide-content">
          <DraggableResizable
            id="title"
            initialPosition={getElementProperties('title').position}
            initialSize={getElementProperties('title').size}
            onUpdate={handleUpdate}
          >
            <h2>{slide.title || 'Title'}</h2>
          </DraggableResizable>
          <DraggableResizable
            id="subtitle"
            initialPosition={getElementProperties('subtitle').position}
            initialSize={getElementProperties('subtitle').size}
            onUpdate={handleUpdate}
          >
            <h3>{slide.subtitle || 'Subtitle'}</h3>
          </DraggableResizable>
          <DraggableResizable
            id="button"
            initialPosition={getElementProperties('button').position}
            initialSize={getElementProperties('button').size}
            onUpdate={handleUpdate}
          >
            <button>{slide.buttonText || 'Click Me'}</button>
          </DraggableResizable>
          {slide.image && (
            <DraggableResizable
              id="image"
              initialPosition={getElementProperties('image').position}
              initialSize={getElementProperties('image').size}
              onUpdate={handleUpdate}
            >
              <img src={slide.image} alt="Slide Visual" className="preview-media" />
            </DraggableResizable>
          )}
          {slide.video && (
            <DraggableResizable
              id="video"
              initialPosition={getElementProperties('video').position}
              initialSize={getElementProperties('video').size}
              onUpdate={handleUpdate}
            >
              <video controls className="preview-media">
                <source src={slide.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </DraggableResizable>
          )}
        </div>
        <div className="slide-number">
          {currentSlide + 1}/{slides.length}
        </div>
      </div>
      <div className="controls">
        <button onClick={handlePrevSlide}>
          <FaArrowLeft />
        </button>
        <button onClick={() => setCurrentView('mobile')}>
          <FaMobile />
        </button>
        <button onClick={() => setCurrentView('tablet')}>
          <FaTabletAlt />
        </button>
        <button onClick={() => setCurrentView('desktop')}>
          <FaDesktop />
        </button>
        <button onClick={handleUndo}>
          <FaUndo />
        </button>
        <button onClick={handleRedo}>
          <FaRedo />
        </button>
        <button onClick={handleNextSlide}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default MiddleSection;

