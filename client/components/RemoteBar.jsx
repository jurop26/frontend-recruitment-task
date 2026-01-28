import { Button } from "./ui/button";
import { SplitSquareHorizontal, Repeat, Plus, Minus } from "lucide-react";
import moment from "moment";
import { useContext } from "react";
import { ProjectContext } from "./App";
import _ from "lodash";
import useHandleDb from "../hooks/useHandleDb";
import { splitClip } from "./lib/helper";

export default function RemoteBar(props) {
  const {
    isPlaying,
    isRepeat,
    timer,
    clip,
    clipDuration,
    changeTimelineRange,
    handleIsPlaying,
    handleIsRepeat,
  } = props;
  const { project, setProject } = useContext(ProjectContext);
  const { create, update } = useHandleDb("clips");

  const handleSplitClip = async () => {
    const { originalClip, newClip } = splitClip(clip, timer);
    const [created] = await Promise.all([
      create(newClip.data),
      update(originalClip.id, originalClip.data),
    ]);

    if (created) {
      const indexOfOriginal = _.findIndex(
        project.data.clips,
        (id) => id === originalClip.id,
      );
      const currentClips = [...project.data.clips];
      currentClips.splice(indexOfOriginal + 1, 0, created.id);

      setProject({
        ...project,
        data: {
          ...project.data,
          clips: currentClips,
        },
      });
    }
  };

  return (
    <div className="flex justify-around items-center py-2 border-b-2 [&>div]:flex [&>div]:items-center [&>div]:gap-4">
      <Button
        disabled={timer === 0}
        onClick={() => handleSplitClip()}
        variant="outline"
      >
        <SplitSquareHorizontal />
        Split Clip
      </Button>
      <div>
        <div>
          {`${moment(moment.duration(timer, "seconds").asMilliseconds()).format(
            "mm:ss",
          )}
          /
          ${moment(
            moment.duration(clipDuration, "seconds").asMilliseconds(),
          ).format("mm:ss")}`}
        </div>
        <Button
          onClick={() => handleIsPlaying()}
          variant="outline"
          className={`rounded-full p-5 border-black ${isPlaying ? "bg-green-400 hover:bg-green-500" : "bg-red-400 hover:bg-red-500"}`}
        ></Button>
        <div>
          <Button
            onClick={() => handleIsRepeat()}
            variant="outline"
            className={`${
              isRepeat
                ? "bg-gray-400 hover:bg-gray-500"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <Repeat />
          </Button>
        </div>
      </div>
      <div>
        Timeline Scale
        <div className="flex">
          <Button
            onClick={() => changeTimelineRange(-1)}
            variant="outline"
            rounded="left"
          >
            <Minus />
          </Button>
          <Button
            onClick={() => changeTimelineRange()}
            variant="outline"
            rounded="right"
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
