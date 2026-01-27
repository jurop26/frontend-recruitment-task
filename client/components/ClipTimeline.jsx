import { useEffect, useRef, useState } from "react";
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
    const newTime = clampedX / widthPerSecond;
    setIndicatorX(clampedX);
    setTimer(newTime);
  };

  useEffect(() => {
    if (!timelineRef.current) {
      return;
    }
    const rect = timelineRef.current.getBoundingClientRect();
    setTimelineWidth(rect.width);
  }, [clipDuration]);

  useEffect(() => {
    if (!isPlaying) return;

    let frame;
    let startTime = performance.now();
    let startOffsetSeconds = timer;

    const animate = (now) => {
      const elapsed = (now - startTime) / 1000;
      const currentTime = startOffsetSeconds + elapsed;

      if (currentTime >= clipDuration) {
        if (isRepeat) {
          startTime = performance.now();
          startOffsetSeconds = 0;
          setTimer(0);
          setIndicatorX(0);
        } else {
          setTimer(clipDuration);
          setIndicatorX(widthPerSecond * clipDuration);
          setIsPlaying(false);
          return;
        }
      } else {
        setTimer(currentTime);
        setIndicatorX(currentTime * widthPerSecond);
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isPlaying, widthPerSecond, timelineWidth, clipDuration, isRepeat]);

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
