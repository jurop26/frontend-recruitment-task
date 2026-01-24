import { PanelsLeftBottom, Shapes } from "lucide-react";
import { Button } from "./ui/button";
import DialogWrapper from "./DialogWrapper";
import ProjectDialogContent from "./ProjectDialogContent";

export default function SideBar({ data }) {
  return (
    <div className="flex flex-col gap-8 border-r-2 py-8 h-screen ">
      <DialogWrapper
        trigger={
          <Button variant="ghost" directions="vertical">
            <PanelsLeftBottom />
            Projects
          </Button>
        }
        title="Open / Create project"
        description="Choose existing or enter new project name"
      >
        <ProjectDialogContent data={data} />
      </DialogWrapper>
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
