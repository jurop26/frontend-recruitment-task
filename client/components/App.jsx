import { useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import MainContent from "./MainContent";

const data = [
  {
    id: "1",
    name: "clip",
    duration: 30,
    tracks: [
      { id: "1", name: "track1", duration: 45, start: 0 },
      { id: "2", name: "track2", duration: 30, start: 5 },
      { id: "3", name: "track3", duration: 35, start: 2 },
    ],
  },
  {
    id: "2",
    name: "clip",
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

export function App() {
  useEffect(() => {
    fetch("http://localhost:3000/health").then((res) => res.json());
  }, []);

  return (
    <div className="w-full mx-auto">
      <Header />
      <div className="flex">
        <SideBar />
        <MainContent data={data} />
      </div>
    </div>
  );
}
