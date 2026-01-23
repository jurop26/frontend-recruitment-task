import { Fragment } from "react";

export default function Timeline(prop) {
  const { timelineRange } = prop;

  return (
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
  );
}
