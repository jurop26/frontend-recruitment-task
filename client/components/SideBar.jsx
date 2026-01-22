import { Button } from "./ui/button";
import { PanelsLeftBottom, Shapes } from "lucide-react";

export default function SideBar() {
  return (
    <div className="flex flex-col gap-8 border-r-2 py-8 h-screen ">
      <Button variant="ghost" directions="vertical">
        <PanelsLeftBottom /> Projects
      </Button>
      <Button variant="ghost" directions="vertical">
        <Shapes />
        Notes
      </Button>
    </div>
  );
}
