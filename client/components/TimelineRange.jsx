export default function TimelineRange(props) {
  const { clipDuration, widthPerSecond, clipDurationIncrementor } = props;

  return (
    <div
      className="flex"
      style={{ minWidth: `${clipDuration * widthPerSecond}px` }}
    >
      {Array.from({ length: clipDuration + 1 }).map((_, i) => {
        const isNumber =
          i % clipDurationIncrementor === 0 || i === clipDuration;
        return (
          <span
            className="text-xs"
            style={{
              minWidth: `${widthPerSecond + (isNumber ? 10 : 0)}px`,
              marginLeft: isNumber ? "-10px" : "",
            }}
            key={`timeline-segment-${i}`}
          >
            {isNumber ? `${i}s` : "|"}
          </span>
        );
      })}
    </div>
  );
}
