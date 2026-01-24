import { PanelsLeftBottom, Shapes } from "lucide-react";
import { useContext } from "react";
import { ProjectContext } from "./App";
import DialogWrapper from "./DialogWrapper";
import NotesDialogContent from "./NotesDialogContent";
import ProjectDialogContent from "./ProjectDialogContent";
import { Button } from "./ui/button";

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
        {(onClose) => <ProjectDialogContent closeDialog={onClose} />}
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
        {(onClose) => (
          <NotesDialogContent id={project?.data?.id} closeDialog={onClose} />
        )}
      </DialogWrapper>
    </div>
  );
}
