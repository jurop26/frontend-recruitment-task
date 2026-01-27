export const splitClip = (clip, timer) => {
  const roundedTimer = Math.floor(timer);
  return {
    originalClip: {
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
    },
    newClip: {
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
    },
  };
};
