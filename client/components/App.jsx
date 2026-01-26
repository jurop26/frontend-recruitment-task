import { createContext, useState } from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import SideBar from "./SideBar";

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
