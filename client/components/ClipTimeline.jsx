import { useEffect, useMemo, useRef, useState } from "react";
import Indicator from "./Indicator";
import RemoteBar from "./RemoteBar";
import TimelineRange from "./TimelineRange";
import { Track } from "./Track";

export default function ClipTimeline(props) {
  const { isSelected, clip, handleSelectClip } = props;
  const { tracks, duration } = clip;
  const [isMouseButtonDown, setMouseButtonDown] = useState(false);
  const [clipDuration, setClipDuration] = useState(duration);
  const [clipDurationIncrementor, setClipDurationIncrementor] = useState(5);
  const [indicatorX, setIndicatorX] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timelineWidth, setTimelineWidth] = useState(0);
  const timelineRef = useRef(null);
  const widthPerSecond = timelineWidth / Math.min(clipDuration, 60);

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
  }, [clipDuration]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const interval = setInterval(() => {
      setIndicatorX((prev) => {
        const next = prev + widthPerSecond / 1000;
        return next > timelineWidth && isRepeat
          ? 0
          : Math.min(next, timelineWidth);
      });
    }, 1);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    if (timer === duration && !isRepeat) {
      setIsPlaying(false);
      return;
    }
    const interval = setInterval(
      () => setTimer((prev) => (timer === clipDuration ? 0 : prev + 1)),
      1000,
    );
    return () => clearInterval(interval);
  }, [timer, isPlaying]);

  if (!tracks) {
    return null;
  }

  return (
    <div
      onClick={() => handleSelectClip()}
      className={`${isSelected ? "bg-orange-300" : ""} `}
    >
      <RemoteBar
        isPlaying={isPlaying}
        isRepeat={isRepeat}
        timer={timer}
        clipDuration={clipDuration}
        handleIsPlaying={() => setIsPlaying((prev) => !prev)}
        handleIsRepeat={() => setIsRepeat((prev) => !prev)}
        decreseTimelineRange={() =>
          setClipDuration((prev) => prev - clipDurationIncrementor)
        }
        increseTimelineRange={() =>
          setClipDuration((prev) => prev + clipDurationIncrementor)
        }
      />
      <div
        className="relative border-b-2 select-none overflow-x-auto overflow-y-hidden whitespace-nowrap"
        ref={timelineRef}
        onMouseUp={() => setMouseButtonDown(false)}
        onMouseMove={handleMouseMove}
      >
        <TimelineRange
          clipDurationIncrementor={clipDurationIncrementor}
          widthPerSecond={widthPerSecond}
          clipDuration={clipDuration}
        />

        <div className="sticky">
          {tracks.map((track) => (
            <Track
              key={track.id}
              timelineNode={timelineRef.current}
              track={track}
              widthPerSecond={widthPerSecond}
            />
          ))}
        </div>

        <Indicator
          indicatorX={indicatorX}
          isMouseButtonDown={isMouseButtonDown}
          handleMouseDown={() => setMouseButtonDown(true)}
        />
      </div>
    </div>
  );
}
