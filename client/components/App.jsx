import { useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import MainContent from "./MainContent";

export function App() {
  useEffect(() => {
    fetch("http://localhost:3000/health").then((res) => res.json());
  }, []);

  return (
    <div className="w-full mx-auto">
      <Header />
      <div className="flex">
        <SideBar />
        <MainContent />
      </div>
    </div>
  );
}
