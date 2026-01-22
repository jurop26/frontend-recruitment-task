import { Button } from "./ui/button";
import { Undo, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <div className="container  py-2 mx-auto border-b-2 ">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline">
            <Undo />
            Undo
          </Button>
        </div>
        <div>Design</div>
        <div>
          <Button variant="outline">
            Save <ChevronDown />
          </Button>
        </div>
      </div>
    </div>
  );
}
