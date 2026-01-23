import { Button } from "./ui/button";
import { SplitSquareHorizontal, Repeat, Plus, Minus } from "lucide-react";

export default function RemoteBar(props) {
  const { decreseTimelineRange, increseTimelineRange } = props;

  return (
    <div className="flex justify-around items-center py-2 border-b-2 [&>div]:flex [&>div]:items-center [&>div]:gap-4">
      <Button variant="outline">
        <SplitSquareHorizontal />
        Split Clip
      </Button>
      <div>
        <div>0.00 / 0.20</div>
        <Button
          variant="outline"
          className="rounded-full p-5 border-black"
        ></Button>
        <div>
          <Button variant="ghost">
            <Repeat />
          </Button>
        </div>
      </div>
      <div>
        Timeline Scale
        <div className="flex">
          <Button
            onClick={() => decreseTimelineRange()}
            variant="outline"
            rounded="left"
          >
            <Minus />
          </Button>
          <Button
            onClick={() => increseTimelineRange()}
            variant="outline"
            rounded="right"
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
