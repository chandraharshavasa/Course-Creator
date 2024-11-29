import React, { useState, useEffect, useRef } from 'react';
import './RightSidebar.css';

function RightSidebar({ visible, toggleSidebar, slides, setSlides, currentSlide }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const sidebarRef = useRef(null);

  const handleInputChange = (field, value) => {
    const updatedSlides = [...slides];
    updatedSlides[currentSlide][field] = value;
    setSlides(updatedSlides);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedSlides = [...slides];
      updatedSlides[currentSlide].image = URL.createObjectURL(file);
      setSlides(updatedSlides);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedSlides = [...slides];
      updatedSlides[currentSlide].video = URL.createObjectURL(file);
      setSlides(updatedSlides);
    }
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleMouseMove = (event) => {
    if (sidebarRef.current && event.clientX > window.innerWidth - 32) {
      setIsSidebarVisible(true);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`right-sidebar ${isSidebarVisible ? 'show' : 'hide'}`}
      ref={sidebarRef}
    >
      <button className="toggle-sidebar" onClick={handleToggleSidebar}>
        {isSidebarVisible ? '>' : '<'}
      </button>

      {isSidebarVisible && (
        <div className="sidebar-content">
          <h3>Edit Slide</h3>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={slides[currentSlide]?.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subtitle">Subtitle</label>
            <input
              type="text"
              id="subtitle"
              value={slides[currentSlide]?.subtitle || ''}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="buttonText">Button Text</label>
            <input
              type="text"
              id="buttonText"
              value={slides[currentSlide]?.buttonText || ''}
              onChange={(e) => handleInputChange('buttonText', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div className="form-group">
            <label htmlFor="video">Video</label>
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={handleVideoUpload}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RightSidebar;

