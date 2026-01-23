export default function Track(props) {
  const { id, name, duration, start, end } = props.track;
  return (
    <div className={`w-[300px] ml-5 py-0.1 my-1 border-2 rounded-md`}>
      {name}
    </div>
  );
}
