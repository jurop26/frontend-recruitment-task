import { useState } from "react";

export const Track = (props) => {
  const { track, widthPerSecond, timelineNode } = props;
  const { id, name, duration, start, end } = track;

  const [isSelected, setIsSelected] = useState(false);
  const [startPos, setStartPos] = useState(start * widthPerSecond);
  const [dragPos, setDragPos] = useState(0);
  const [isMouseButtonDown, setMouseButtonDown] = useState(false);

  const handleMouseDown = (e) => {
    setMouseButtonDown(true);
    setIsSelected(true);
    const trackRect = e.currentTarget.getBoundingClientRect();
    setDragPos(e.clientX - trackRect.left);
  };

  const handleMouseUp = () => {
    setMouseButtonDown(false);
    setIsSelected(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseButtonDown) {
      return;
    }
    const timeLineRect = timelineNode.getBoundingClientRect();
    const x = e.clientX - timeLineRect.left - dragPos;
    const clampedX = Math.max(0, Math.min(x, timeLineRect.width));

    setStartPos(clampedX);
  };

  const truckLength = duration * widthPerSecond;

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      className={`py-0.1 my-1 border-2 rounded-md`}
      style={{
        width: truckLength,
        marginLeft: startPos,
        ...(isSelected ? { backgroundColor: "gray" } : {}),
      }}
    >
      {name}
    </div>
  );
};
