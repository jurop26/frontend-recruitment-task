import { useContext } from "react";
import { Button } from "./ui/button";
import { Undo, ChevronDown, Save, Redo } from "lucide-react";
import { ProjectContext } from "./App";

export default function Header() {
  const { project } = useContext(ProjectContext);
  return (
    <div className="w-full py-2 mx-auto border-b-2 ">
      <div className="flex items-center justify-between">
        <div className="flex">
          <Button disabled={!project} variant="outline" rounded="left">
            <Undo />
            Undo
          </Button>
          <Button disabled={!project} variant="outline" rounded="right">
            <Redo />
          </Button>
        </div>
        <div>{project?.name}</div>
        <div className="flex">
          <Button disabled={!project} variant="outline" rounded="left">
            <Save />
            Save
          </Button>
          <Button disabled={!project} variant="outline" rounded="right">
            <ChevronDown />
          </Button>
        </div>
      </div>
    </div>
  );
}
