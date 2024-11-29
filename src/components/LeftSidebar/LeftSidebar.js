import React, { useState } from 'react';
import './LeftSidebar.css';

function LeftSidebar({ slides, setSlides, currentSlide, setCurrentSlide }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed by default

  const handleRename = (index) => {
    const newName = prompt('Enter a new name:', slides[index]?.title);
    if (newName) {
      const updatedSlides = [...slides];
      updatedSlides[index].title = newName;
      setSlides(updatedSlides);
    }
    setEditingIndex(null);
  };

  const deleteSlide = (index) => {
    const updatedSlides = slides.filter((_, i) => i !== index);
    setSlides(updatedSlides);
    if (currentSlide >= updatedSlides.length) {
      setCurrentSlide(updatedSlides.length - 1);
    }
    setEditingIndex(null);
  };

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div
      className={`left-sidebar ${isCollapsed ? 'collapsed' : ''}`}
      onMouseEnter={() => setIsCollapsed(false)} // Open sidebar when hovered
    >
      <button
        className="collapse-toggle"
        onClick={toggleSidebar}
      >
        {isCollapsed ? '>' : '<'}
      </button>

      {!isCollapsed && (
        <>
          <div className="sidebar-header">
            <h2>Test Course</h2>
          </div>

          <div className="sidebar-content">
            <ul className="slides-list">
              {slides.map((slide, index) => (
                <li
                  key={slide.id}
                  className={`slide-item ${index === currentSlide ? 'active' : ''}`}
                  onMouseLeave={() => setEditingIndex(null)}
                >
                  <span onClick={() => setCurrentSlide(index)}>{slide.title}</span>
                  <button
                    className="slide-options-btn"
                    onClick={() => setEditingIndex(index)}
                  >
                    ...
                  </button>

                  {editingIndex === index && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleRename(index)}>Rename</button>
                      <button onClick={() => deleteSlide(index)}>Delete</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <button
              className="add-slide"
              onClick={() =>
                setSlides([...slides, { id: slides.length + 1, title: 'New Slide' }])
              }
            >
              + New Slide
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default LeftSidebar;
