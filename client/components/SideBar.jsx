import { PanelsLeftBottom, Shapes } from "lucide-react";
import { Button } from "./ui/button";
import DialogWrapper from "./DialogWrapper";
import ProjectDialogContent from "./ProjectDialogContent";
import NotesDialogContent from "./NotesDialogContent";
import { useContext } from "react";
import { ProjectContext } from "./App";

export default function SideBar() {
  const { project } = useContext(ProjectContext);
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
        <ProjectDialogContent />
      </DialogWrapper>
      <DialogWrapper
        trigger={
          <Button disabled={!project} variant="ghost" directions="vertical">
            <Shapes />
            Notes
          </Button>
        }
        title="Add note to project"
      >
        <NotesDialogContent id={project?.data?.id} />
      </DialogWrapper>
    </div>
  );
}
