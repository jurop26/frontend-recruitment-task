import { Fragment } from "react";
import RemoteBar from "./RemoteBar";
import { Button } from "./ui/button";
import { Triangle } from "lucide-react";

export default function MainContent() {
  const timelineRange = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  return (
    <div className="w-full">
      <div className="py-4 border-b-2">blank area</div>
      <div className="flex justify-center py-4 border-b-2">
        <div className="flex justify-center items-center text-3xl w-2xl h-128 border-2">
          PREVIEW AREA
        </div>
      </div>
      <RemoteBar />
      <div className="relative min-h-50 border-b-2">
        <div className="absolute inset-0">
          <div className="w-1 flex flex-col items-center h-full">
            <Triangle className="rotate-180 fill-black" size="10" />
            <div className="flex-1 w-0.5 h- bg-black"></div>
          </div>
        </div>

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
      </div>
      <div className="mx-auto py-2">
        <Button>Add</Button>
      </div>
    </div>
  );
}
