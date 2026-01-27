import { Plus } from "lucide-react";
import ClipTimeline from "./ClipTimeline";
import { Button } from "./ui/button";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { ProjectContext } from "./App";
import DialogWrapper from "./DialogWrapper";
import OpenCreateDialogContent from "./OpenCreateDialogContent";
import useHandleDb from "../hooks/useHandleDb";

export default function MainContent() {
  const { project } = useContext(ProjectContext);
  const [displayedClips, setDisplayedClips] = useState([]);
  const [selectedClip, setSelectedClip] = useState(null);
  const viewContent = _.find(displayedClips, { id: selectedClip })?.data?.name;
  const { open } = useHandleDb("clips");

  useEffect(
    () => setSelectedClip(_.last(displayedClips)?.id),
    [displayedClips],
  );

  useEffect(() => {
    const getProjectClips = async () => {
      const clips = await Promise.all(
        (project?.data.clips ?? []).map((id) => open(id)),
      );
      setDisplayedClips(clips);
    };
    getProjectClips();
  }, [project?.data?.clips]);

  return (
    <div className="flex-1 overflow-hidden">
      <div className="py-6 border-b-2"></div>
      <div className="flex justify-center py-4 border-b-2">
        <div className="flex justify-center items-center text-3xl w-2xl h-128 border-2">
          {viewContent ?? "PREVIEW AREA"}
        </div>
      </div>
      {displayedClips.filter(Boolean).map((clip, i) => (
        <ClipTimeline
          key={`clips-${clip.id}-${i}`}
          isSelected={clip.id === selectedClip}
          clip={clip}
          handleSelectClip={() => setSelectedClip(clip.id)}
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
            <OpenCreateDialogContent collection="clips" closeDialog={onClose} />
          )}
        </DialogWrapper>
      </div>
    </div>
  );
}
