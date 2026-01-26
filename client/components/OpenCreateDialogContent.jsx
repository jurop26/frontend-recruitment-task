import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ProjectContext } from "./App";

const ACTION = {
  projets: "project",
  clips: "clip",
};

export default function OpenCreateDialogContent({
  collection,
  closeDialog,
  setState,
}) {
  const [docName, setDocName] = useState("");
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const existing = _.find(docs, { data: { name: docName } });

  const { setProject } = useContext(ProjectContext);
  const URL = `http://localhost:3000/api/${collection}`;
  const text = ACTION[collection];

  const handleCreate = async (docName) => {
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: docName,
          ...(ACTION[collection] === "clip"
            ? { duration: 60, tracks: [] }
            : {}),
        }),
      });
      if (!res.ok) {
        throw new Error(`Failed to create ${text}.`);
      }
      const data = await res.json();
      await handleOpen(data.id);
      closeDialog();
    } catch (err) {
      console.err(err.message);
    }
  };

  const handleOpen = async (id) => {
    try {
      const res = await fetch(`${URL}/${id}`);
      if (!res.ok) {
        throw new Error(`Failed to open ${text}.`);
      }
      const { data } = await res.json();
      console.log(data);
      ACTION[collection] === "clip"
        ? setState((prev) => [...prev, data])
        : setProject(data);
      closeDialog();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      fetch(URL)
        .then((res) => res.json())
        .then((data) => setDocs(data));
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
          docs.map(({ id, data: { name } }) => (
            <Button
              key={id}
              variant={name === docName ? "link" : "ghost"}
              onClick={() => setDocName(name)}
            >
              {name}
            </Button>
          ))
        )}
      </div>
      <div>
        <Input
          autoComplete="off"
          placeholder={`New ${text} name`}
          name="name"
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
        />
      </div>
      <Button
        disabled={!docName}
        variant={docName ? "default" : "destructive"}
        onClick={async () => {
          existing
            ? await handleOpen(existing.id)
            : await handleCreate(docName);
        }}
      >
        {docName && existing ? "Open" : "Create"}
      </Button>
    </>
  );
}
