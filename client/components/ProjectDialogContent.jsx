import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ProjectContext } from "./App";

export default function ProjectDialogContent() {
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const existing = _.find(projects, { data: { name: projectName } });

  const { setProject } = useContext(ProjectContext);

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

  const handleProjectOpen = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/projects/${id}`);
      const { data } = await res.json();

      setProject(data);
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
          existing
            ? await handleProjectOpen(existing.id)
            : await handleProjectCreate(projectName);
        }}
      >
        {projectName && existing ? "Open" : "Create"}
      </Button>
    </>
  );
}
