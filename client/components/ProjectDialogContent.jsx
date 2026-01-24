import _ from "lodash";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ProjectDialogContent() {
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const isExisting = _.find(projects, { name: projectName });

  const handleProjectCreate = async (projectName) => {
    try {
      await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name: projectName }),
      });
    } catch (err) {
      console.err(err.message);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      fetch("http://localhost:3000/api/projects")
        .then((res) => res.json())
        .then((data) => setProjects(data));
    } catch (err) {
      setErrors(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <h5>Loading ...</h5>
        ) : errors ? (
          <h5 className="text-red-400">{errors}</h5>
        ) : (
          projects.map(({ id, data: { name } }) => (
            <Button
              key={id}
              variant={name === projectName ? "link" : "ghost"}
              onClick={() => setProjectName(name)}
            >
              {name}
            </Button>
          ))
        )}
      </div>
      <div>
        <Input
          autoComplete="off"
          placeholder="New project name"
          name="name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <Button
        disabled={!projectName}
        variant={projectName ? "default" : "destructive"}
        onClick={async () => {
          await handleProjectCreate(projectName);
        }}
      >
        {projectName && isExisting ? "Open" : "Create"}
      </Button>
    </>
  );
}
