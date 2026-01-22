import { useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

export function App() {
  useEffect(() => {
    fetch("http://localhost:3000/health").then((res) => res.json());
  }, []);

  return (
    <div>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="container">main</div>
      </div>
    </div>
  );
}
