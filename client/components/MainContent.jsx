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

  return (
    <div className="w-full">
      <div className="py-4 border-b-2">blank area</div>
      <div className="flex justify-center py-4 border-b-2">
        <div className="flex justify-center items-center text-3xl w-2xl h-128 border-2">
          PREVIEW AREA
        </div>
      </div>

      <RemoteBar
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
                widthPerSecond={timelineWidth / maxTimelineRange}
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
