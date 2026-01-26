import { Plus } from "lucide-react";
import ClipTimeline from "./ClipTimeline";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import _ from "lodash";
import { ProjectContext } from "./App";
import DialogWrapper from "./DialogWrapper";
import OpenCreateDialogContent from "./OpenCreateDialogContent";

export default function MainContent() {
  const { project } = useContext(ProjectContext);
  const [displayedClips, setDisplayedClips] = useState([]);
  const [selectedClip, setSelectedClip] = useState(null);

  return (
    <div className="w-full">
      <div className="py-6 border-b-2"></div>
      <div className="flex justify-center py-4 border-b-2">
        <div className="flex justify-center items-center text-3xl w-2xl h-128 border-2">
          {_.find(displayedClips, { id: selectedClip })?.data?.name ??
            "PREVIEW AREA"}
        </div>
      </div>
      {displayedClips.map(({ id, data }) => (
        <ClipTimeline
          key={`clips-${id}`}
          isSelected={id === selectedClip}
          clip={data}
          handleSelectClip={() => setSelectedClip(id)}
        />
      ))}

      <div className="flex w-full justify-center py-2">
        <DialogWrapper
          trigger={
            <Button disabled={!project} variant="outline">
              <Plus />
              Add
            </Button>
          }
          title="Open / Create clip"
          description="Choose existing or enter new clip name"
        >
          {(onClose) => (
            <OpenCreateDialogContent
              collection="clips"
              closeDialog={onClose}
              setState={setDisplayedClips}
            />
          )}
        </DialogWrapper>
      </div>
    </div>
  );
}
