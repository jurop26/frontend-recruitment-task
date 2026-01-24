import { PanelsLeftBottom, Shapes } from "lucide-react";
import { Button } from "./ui/button";
import DialogWrapper from "./DialogWrapper";

export default function SideBar() {
  return (
    <div className="flex flex-col gap-8 border-r-2 py-8 h-screen ">
      <DialogWrapper
        trigger={
          <Button variant="ghost" directions="vertical">
            <PanelsLeftBottom /> Projects
          </Button>
        }
        title="Open / Create new project "
      ></DialogWrapper>
      <DialogWrapper
        trigger={
          <Button variant="ghost" directions="vertical">
            <Shapes />
            Notes
          </Button>
        }
        title="Add note to project"
      ></DialogWrapper>
    </div>
  );
}
