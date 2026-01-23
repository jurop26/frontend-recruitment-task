import { Plus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Indicator from "./Indicator";
import RemoteBar from "./RemoteBar";
import TimelineRange from "./TimelineRange";
import { Track } from "./Track";
import { Button } from "./ui/button";

export default function MainContent(props) {
  const { data } = props;
  const [isMouseButtonDown, setMouseButtonDown] = useState(false);
  const [maxTimelineRange, setMaxTimelineRange] = useState(20);
  const [indicatorX, setIndicatorX] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timelineWidth, setTimelineWidth] = useState(0);
  const timelineRef = useRef(null);
  const timelineScaleParts = Math.min(maxTimelineRange / 5 + 1, 13); // plus 1 as default 0;
  const widthPerSecond = timelineWidth / maxTimelineRange;

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
  }, [maxTimelineRange]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const interval = setInterval(() => {
      setIndicatorX((prev) => {
        const next = prev + widthPerSecond / 100;
        return next > timelineWidth && isRepeat
          ? 0
          : Math.min(next, timelineWidth);
      });
    }, 10);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    if (timer === maxTimelineRange && !isRepeat) {
      setIsPlaying(false);
      return;
    }
    const interval = setInterval(
      () => setTimer((prev) => (timer === maxTimelineRange ? 0 : prev + 1)),
      1000,
    );
    return () => clearInterval(interval);
  }, [timer, isPlaying]);

  return (
    <div className="w-full">
      <div className="py-4 border-b-2">blank area</div>
      <div className="flex justify-center py-4 border-b-2">
        <div className="flex justify-center items-center text-3xl w-2xl h-128 border-2">
          PREVIEW AREA
        </div>
      </div>

      <RemoteBar
        isPlaying={isPlaying}
        isRepeat={isRepeat}
        timer={timer}
        handleIsPlaying={() => setIsPlaying((prev) => !prev)}
        handleIsRepeat={() => setIsRepeat((prev) => !prev)}
        decreseTimelineRange={() => setMaxTimelineRange((prev) => prev - 5)}
        increseTimelineRange={() => setMaxTimelineRange((prev) => prev + 5)}
      />

      <div
        className="relative min-h-50 border-b-2 select-none"
        ref={timelineRef}
        onMouseUp={() => setMouseButtonDown(false)}
        onMouseMove={handleMouseMove}
      >
        <TimelineRange timelineRange={timelineRange} />

        {data.map(({ id, tracks }) => (
          <div key={id} className="absolute  w-full overflow-hidden">
            {tracks.map((track) => (
              <Track
                key={track.id}
                timelineNode={timelineRef.current}
                track={track}
                widthPerSecond={widthPerSecond}
              />
            ))}
          </div>
        ))}

        <Indicator
          indicatorX={indicatorX}
          isMouseButtonDown={isMouseButtonDown}
          handleMouseDown={() => setMouseButtonDown(true)}
        />
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
