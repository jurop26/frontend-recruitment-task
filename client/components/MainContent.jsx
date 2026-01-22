import { Fragment, useState } from "react";
import RemoteBar from "./RemoteBar";
import { Button } from "./ui/button";
import { Triangle } from "lucide-react";

export default function MainContent() {
  const [isMouseButtonDown, setMouseButtonDown] = useState(false);
  const [indicatorX, setIndicatorX] = useState(0);
  const timelineRange = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  const handleMouseDown = () => {
    setMouseButtonDown(true);
  };
  const handleMouseUp = () => {
    setMouseButtonDown(false);
  };
  const handleMouseMove = (e) => {
    if (!isMouseButtonDown) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.x;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    setIndicatorX(clampedX);
  };

  return (
    <div className="w-full">
      <div className="py-4 border-b-2">blank area</div>
      <div className="flex justify-center py-4 border-b-2">
        <div className="flex justify-center items-center text-3xl w-2xl h-128 border-2">
          PREVIEW AREA
        </div>
      </div>
      <RemoteBar />

      <div
        className="relative min-h-50 border-b-2 select-none"
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {/* Indicator */}
        <div
          className={`absolute inset-y-0`}
          style={{ left: `${indicatorX}px` }}
          onMouseDown={handleMouseDown}
        >
          <div className="w-1 flex flex-col items-center h-full">
            <Triangle
              className={`rotate-180 ${isMouseButtonDown ? "fill-red-500" : "fill-black"}`}
              size="10"
            />
            <div
              className={`flex-1 w-0.5 ${isMouseButtonDown ? "bg-red-500" : "bg-black"}`}
            ></div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex justify-between">
          {timelineRange.map((t, i) => (
            <Fragment key={`timeline-segment-${t}`}>
              <div>{t}s</div>
              {i < timelineRange.length - 1 &&
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={`timeline-part-${i}`}>|</div>
                ))}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="mx-auto py-2">
        <Button>Add</Button>
      </div>
    </div>
  );
}
