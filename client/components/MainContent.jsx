import { Fragment, useEffect, useRef, useState, useMemo } from "react";
import RemoteBar from "./RemoteBar";
import { Button } from "./ui/button";
import { Triangle, Plus } from "lucide-react";
import { Track } from "./Track";

export default function MainContent(props) {
  const { data } = props;
  const [isMouseButtonDown, setMouseButtonDown] = useState(false);
  const [maxTimelineRange, setMaxTimelineRange] = useState(60);
  const [indicatorX, setIndicatorX] = useState(0);
  const [timelineWidth, setTimelineWidth] = useState(0);
  const timelineRef = useRef(null);
  const timelineScaleParts = 13;

  const timelineRange = useMemo(
    () =>
      Array.from({
        length: timelineScaleParts,
      }).reduce((acc, _, i) => {
        acc.push(i * Math.ceil(maxTimelineRange / (timelineScaleParts - 1)));

        return acc;
      }, []),
    [maxTimelineRange],
  );

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

  useEffect(() => {
    if (!timelineRef.current) {
      return;
    }
    const rect = timelineRef.current.getBoundingClientRect();
    setTimelineWidth(rect.width);
  }, []);

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
        ref={timelineRef}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
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

        {/* Tracks */}
        {data.map(({ id, tracks }) => (
          <div key={id} className="absolute  w-full overflow-hidden">
            {tracks.map((track) => (
              <Track
                key={track.id}
                timelineNode={timelineRef.current}
                track={track}
                widthPerSecond={timelineWidth / maxTimelineRange}
              />
            ))}
          </div>
        ))}

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
      </div>
      <div className="flex w-full justify-center py-2">
        <Button variant="outline">
          <Plus />
          Add
        </Button>
      </div>
    </div>
  );
}
