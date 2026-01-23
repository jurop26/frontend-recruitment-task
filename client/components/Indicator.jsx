import { Triangle } from "lucide-react";

export default function Indicator(props) {
  const { indicatorX, isMouseButtonDown, handleMouseDown } = props;

  return (
    <div
      className={`absolute inset-y-0`}
      style={{ left: `${indicatorX}px` }}
      onMouseDown={() => handleMouseDown()}
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
  );
}
