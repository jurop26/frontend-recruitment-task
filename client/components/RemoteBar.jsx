import { Button } from "./ui/button";
import { SplitSquareHorizontal, Repeat, Plus, Minus } from "lucide-react";
import moment from "moment";
import { useContext } from "react";
import { ProjectContext } from "./App";
import _ from "lodash";
import useHandleDb from "../hooks/useHandleDb";

export default function RemoteBar(props) {
  const {
    isPlaying,
    isRepeat,
    timer,
    clip,
    clipDuration,
    decreseTimelineRange,
    increseTimelineRange,
    handleIsPlaying,
    handleIsRepeat,
  } = props;
  const { project, setProject } = useContext(ProjectContext);
  const { create, update } = useHandleDb("clips");

  const handleSplitClip = async () => {
    const roundedTimer = Math.floor(timer);
    const splitedClip = {
      ...clip,
      data: {
        ...clip.data,
        duration: roundedTimer,
        tracks: clip.data.tracks.reduce((acc, t) => {
          if (timer < t.start) {
            return acc;
          }
          return [
            ...acc,
            {
              ...t,
              duration: roundedTimer - t.start,
            },
          ];
        }, []),
      },
    };
    const newClip = {
      ...clip,
      data: {
        ...clip.data,
        duration: clip.data.duration - roundedTimer,
        tracks: clip.data.tracks.reduce((acc, t) => {
          if (timer > t.start + t.duration) {
            return acc;
          }
          return [
            ...acc,
            {
              ...t,
              duration:
                timer > t.start
                  ? t.duration - roundedTimer + t.start
                  : t.duration,
              start: timer > t.start ? 0 : t.start - roundedTimer,
            },
          ];
        }, []),
      },
    };

    const [created] = await Promise.all([
      create(newClip.data),
      update(splitedClip.id, splitedClip.data),
    ]);

    if (created) {
      setProject({
        ...project,
        data: {
          ...project.data,
          clips: [...project.data.clips, created.id],
        },
      });
    }
  };

  return (
    <div className="flex justify-around items-center py-2 border-b-2 [&>div]:flex [&>div]:items-center [&>div]:gap-4">
      <Button onClick={() => handleSplitClip()} variant="outline">
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
            onClick={() => decreseTimelineRange()}
            variant="outline"
            rounded="left"
          >
            <Minus />
          </Button>
          <Button
            onClick={() => increseTimelineRange()}
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
