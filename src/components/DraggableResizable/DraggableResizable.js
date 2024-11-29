import React from 'react';
import { Rnd } from 'react-rnd';
import './DraggableResizable.css';

function DraggableResizable({ id, children, initialPosition, initialSize, onUpdate }) {
  const defaultPosition = initialPosition || { x: 50, y: 50 };
  const defaultSize = initialSize || { width: 200, height: 100 };

  const handleUpdate = (e, position, size) => {
    if (onUpdate) {
      onUpdate(id, { position, size });
    }
  };

  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      bounds=".preview-container"
      onDragStop={(e, data) =>
        handleUpdate(e, { x: data.x, y: data.y }, { width: defaultSize.width, height: defaultSize.height })
      }
      onResizeStop={(e, direction, ref, delta, position) =>
        handleUpdate(e, position, { width: ref.offsetWidth, height: ref.offsetHeight })
      }
      className="draggable-resizable"
    >
      {children}
    </Rnd>
  );
}

export default DraggableResizable;

