import { Plus } from "lucide-react";
import ClipTimeline from "./ClipTimeline";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import _ from "lodash";
import { ProjectContext } from "./App";

export default function MainContent() {
  const { project } = useContext(ProjectContext);
  const [displayedClips, setDisplayedClips] = useState(["1", "2"]);
  const [selectedClip, setSelectedClip] = useState(null);

  const clipsToDisplay =
    project?.data?.filter((c) => displayedClips.data.includes(c.id)) ?? [];

  return (
    <div className="w-full">
      <div className="py-6 border-b-2"></div>
      <div className="flex justify-center py-4 border-b-2">
        <div className="flex justify-center items-center text-3xl w-2xl h-128 border-2">
          {_.find(project?.data, { id: selectedClip })?.name ?? "PREVIEW AREA"}
        </div>
      </div>
      {clipsToDisplay.map((clip) => (
        <ClipTimeline
          key={clip.id}
          isSelected={clip.id === selectedClip}
          clip={clip}
          handleSelectClip={() => setSelectedClip(clip.id)}
        />
      ))}

      <div className="flex w-full justify-center py-2">
        <Button disabled={!project} variant="outline">
          <Plus />
          Add
        </Button>
      </div>
    </div>
  );
}
