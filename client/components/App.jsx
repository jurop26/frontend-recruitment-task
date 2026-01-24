import { createContext, useState } from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import SideBar from "./SideBar";

const data = [
  {
    id: "1",
    name: "clip 1",
    duration: 30,
    tracks: [
      { id: "1", name: "track1", duration: 45, start: 0 },
      { id: "2", name: "track2", duration: 30, start: 5 },
      { id: "3", name: "track3", duration: 35, start: 2 },
    ],
  },
  {
    id: "2",
    name: "clip 2",
    duration: 60,
    tracks: [
      { id: "1", name: "track1", duration: 58, start: 0 },
      { id: "2", name: "track2", duration: 30, start: 5 },
      { id: "3", name: "track3", duration: 35, start: 25 },
      { id: "4", name: "track4", duration: 35, start: 2 },
      { id: "5", name: "track5", duration: 35, start: 25 },
    ],
  },
];
export const ProjectContext = createContext({
  project: null,
  setProject: (value) => setProject(value),
});
export function App() {
  const [project, setProject] = useState(null);

  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      <div className="w-full mx-auto">
        <Header />
        <div className="flex">
          <SideBar />
          <MainContent />
        </div>
      </div>
    </ProjectContext.Provider>
  );
}
