import RemoteBar from "./RemoteBar";
import { Button } from "./ui/button";

export default function MainContent() {
  return (
    <div className="w-full">
      <div className="py-4 border-b-2">blank area</div>
      <div className="flex justify-center py-4 border-b-2">
        <div className="flex justify-center items-center text-3xl w-2xl h-128 border-2">
          PREVIEW AREA
        </div>
      </div>
      <RemoteBar />
      <div>timeline</div>
      <div>
        <Button>Add</Button>
      </div>
    </div>
  );
}
