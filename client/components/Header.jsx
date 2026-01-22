import { Button } from "./ui/button";
import { Undo, ChevronDown, Save, Redo } from "lucide-react";

export default function Header() {
  return (
    <div className="container  py-2 mx-auto border-b-2 ">
      <div className="flex items-center justify-between">
        <div className="flex">
          <Button variant="outline" rounded="left">
            <Undo />
            Undo
          </Button>
          <Button variant="outline" rounded="right">
            <Redo />
          </Button>
        </div>
        <div>Design</div>
        <div className="flex">
          <Button variant="outline" rounded="left">
            <Save /> Save
          </Button>
          <Button variant="outline" rounded="right">
            <ChevronDown />
          </Button>
        </div>
      </div>
    </div>
  );
}
