export default function Track(props) {
  const { track, widthPerSecond } = props;
  const { id, name, duration, start, end } = track;

  const truckLength = duration * widthPerSecond;

  return (
    <div
      className={`ml-0 py-0.1 my-1 border-2 rounded-md`}
      style={{ width: truckLength }}
    >
      {name}
    </div>
  );
}
